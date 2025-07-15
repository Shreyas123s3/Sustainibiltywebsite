import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PackagingScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);

  const recyclableItems: Record<string, string> = {
    bottle: "Recyclable",
    book: "Paper (Recyclable)",
    cup: "Recyclable",
    "cell phone": "E-waste",
    laptop: "E-waste",
    box: "Cardboard (Recyclable)",
    toothbrush: "Plastic - Check Local Guidelines",
  };

  const setupCamera = async () => {
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    videoRef.current.srcObject = stream;
    await new Promise((resolve) => (videoRef.current!.onloadedmetadata = () => resolve(null)));
    videoRef.current!.play();
  };

  const runDetection = async () => {
    const model = await cocoSsd.load();
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detectFrame = async () => {
      if (!scanning) return;
      const predictions = await model.detect(video);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      predictions.forEach((prediction: any) => {
        const [x, y, width, height] = prediction.bbox;
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#22c55e";
        ctx.fillText(prediction.class, x, y);
        const category = recyclableItems[prediction.class.toLowerCase()] || "Check Local Guidelines";
        setResult(`${prediction.class}: ${category}`);
      });
      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  useEffect(() => {
    if (scanning) {
      setupCamera().then(runDetection);
    }
    // Cleanup: stop camera when unmounting or scanning stops
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [scanning]);

  return (
    <div 
      className="pt-24 pb-16 px-4 min-h-screen relative flex items-center justify-center"
      style={{ 
        background: `
          radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(184, 255, 78, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #0A0A0A 0%, #1a2e1a 25%, #0f1f0f 50%, #1a2e1a 75%, #0A0A0A 100%)
        `
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-neon-green/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center justify-center" style={{ marginTop: '10vh' }}>
        <section className="w-full p-6 bg-black/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 text-white">
          <h2 className="text-2xl font-bold mb-2 text-white/80 text-center">♻️ Packaging Footprint Identifier</h2>
          <p className="mb-4 text-sm text-white/60 text-center">Scan your packaging in real-time and get recyclability recommendations.</p>

          <div className="flex justify-center gap-4 mb-4">
            {!scanning && (
              <Button onClick={() => setScanning(true)} className="bg-neon-green hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg">
                Start Scanning
              </Button>
              )}
            {scanning && (
              <Button onClick={() => { setScanning(false); setResult(""); }} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg">
                Stop Scanning
              </Button>
            )}
                  </div>

          <div className="relative mt-6 rounded-xl overflow-hidden bg-gray-900/60 border border-white/10 shadow-xl flex justify-center">
            <video ref={videoRef} className="rounded-xl shadow-xl w-full max-h-[360px] bg-black/60" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 rounded-xl pointer-events-none" />
                    </div>

          {result && (
            <div className="mt-4 p-4 bg-green-800/40 border border-green-400/20 rounded-xl shadow text-center">
              <span className="text-lg font-medium text-neon-green">Result:</span> <br />
              <span className="text-white/90">{result}</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
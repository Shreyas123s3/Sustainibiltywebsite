"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    // Create more visible and dynamic paths
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="#5fe3c0"
                        strokeWidth={path.width}
                        strokeOpacity={0.4 + path.id * 0.02}
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.8, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    return (
        <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ 
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            {/* Main floating paths with enhanced visibility */}
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Additional flowing lines for better visibility */}
            <div className="absolute inset-0">
                {/* Horizontal flowing lines */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`h-line-${i}`}
                        className="absolute w-full h-px"
                        style={{
                            background: `linear-gradient(90deg, transparent, #5fe3c0, transparent)`,
                            top: `${10 + i * 12}%`,
                            opacity: 0.3,
                        }}
                        animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            delay: i * 1.8,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Vertical flowing lines */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`v-line-${i}`}
                        className="absolute w-px h-full"
                        style={{
                            background: `linear-gradient(180deg, transparent, #5fe3c0, transparent)`,
                            left: `${15 + i * 15}%`,
                            opacity: 0.25,
                        }}
                        animate={{
                            y: ['-100%', '100%'],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 20 + i * 3,
                            repeat: Infinity,
                            delay: i * 2.5,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Diagonal flowing lines */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`d-line-${i}`}
                        className="absolute w-full h-px"
                        style={{
                            background: `linear-gradient(45deg, transparent, #5fe3c0, transparent)`,
                            top: `${20 + i * 20}%`,
                            transform: 'rotate(45deg)',
                            transformOrigin: 'center',
                            opacity: 0.2,
                        }}
                        animate={{
                            x: ['-150%', '150%'],
                            opacity: [0, 0.4, 0],
                        }}
                        transition={{
                            duration: 25 + i * 4,
                            repeat: Infinity,
                            delay: i * 3,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Pulsing dots */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={`dot-${i}`}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            background: `radial-gradient(circle, #5fe3c0, transparent)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 2, 0],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Curved paths */}
                <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1000 1000"
                    style={{ opacity: 0.3 }}
                >
                    {[...Array(12)].map((_, i) => (
                        <motion.path
                            key={`curve-${i}`}
                            d={`M${i * 80} 0 Q${i * 80 + 100} ${300 + i * 50} ${i * 80 + 200} ${600 + i * 30} T${i * 80 + 400} 1000`}
                            stroke="#5fe3c0"
                            strokeWidth={1 + i * 0.1}
                            strokeOpacity={0.4}
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1, 0.5, 1],
                                opacity: [0, 0.6, 0.2, 0.6],
                            }}
                            transition={{
                                duration: 18 + i * 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: i * 1.5,
                            }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}
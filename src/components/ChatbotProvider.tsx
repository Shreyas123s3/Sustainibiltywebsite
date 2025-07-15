import { useEffect } from 'react';

const ChatbotProvider = () => {
  useEffect(() => {
    // Always append the chatbot container to the end of <body>
    let chatContainer = document.getElementById('chatInlineRoot-b07564');
    if (!chatContainer) {
      chatContainer = document.createElement('div');
      chatContainer.id = 'chatInlineRoot-b07564';
    }
    // Set styles to guarantee visibility
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '24px';
    chatContainer.style.right = '24px';
    chatContainer.style.zIndex = '2147483647'; // Max z-index
    chatContainer.style.width = 'auto';
    chatContainer.style.height = 'auto';
    chatContainer.style.minWidth = '60px';
    chatContainer.style.minHeight = '60px';
    chatContainer.style.display = 'block';
    chatContainer.style.visibility = 'visible';
    chatContainer.style.opacity = '1';
    chatContainer.style.pointerEvents = 'auto';
    chatContainer.style.background = 'none';
    // Optional: Add a border for debugging
    // chatContainer.style.border = '2px solid red';
    document.body.appendChild(chatContainer);

    // Load chatbot script if not already loaded
    if (!document.querySelector('script[src*="agentx-chat.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://storage.googleapis.com/agentx-cdn-01/agentx-chat.js?agx=68714ead2d16855385b07564Mnk%2FktSfu4k7w92ZrD9rhQ%3D%3D%7CwO2dZZr6Mf%2FPDEWttfXVvPTSDNQB9jqc6oe2RYm%2BpKE%3D';
      script.async = true;
      script.onload = () => {
        console.log('AgentX chatbot loaded successfully via React provider');
      };
      script.onerror = () => {
        console.error('Failed to load AgentX chatbot via React provider');
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default ChatbotProvider; 
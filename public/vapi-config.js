
// Vapi Voice Assistant Configuration
var vapiInstance = null;
const assistant = "fb6889ad-fa78-4ddb-abe9-4693d0586173"; // Substitute with your assistant ID
const apiKey = "c820f00f-a0db-42fd-b7d4-b7314ab7ad5c"; // Substitute with your Public key from Vapi Dashboard.
const buttonConfig = {
  position: "bottom-right",
  offset: "40px",
  width: "120px",
  height: "50px",
  idle: {
    color: {
      50: "#f0fdf4",
      100: "#dcfce7", 
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16"
    },
    type: "pill",
    title: "Ask Rob CNZA Journalist",
    subtitle: "",
    icon: ""
  },
  loading: {
    color: {
      50: "#f0fdf4",
      100: "#dcfce7", 
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16"
    },
    type: "pill",
    title: "Connecting to Rob...",
    subtitle: "Please wait",
    icon: ""
  },
  active: {
    color: {
      50: "#f0fdf4",
      100: "#dcfce7", 
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16"
    },
    type: "pill",
    title: "Rob is listening...",
    subtitle: "Speak now",
    icon: ""
  }
};

(function (d, t) {
  var g = document.createElement(t),
    s = d.getElementsByTagName(t)[0];
  g.src =
    "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);

  g.onload = function () {
    vapiInstance = window.vapiSDK.run({
      apiKey: apiKey, // mandatory
      assistant: assistant, // mandatory
      config: buttonConfig, // optional
    });
    
    // Enhanced styling and animation for Vapi button
    setTimeout(() => {
      const vapiButton = document.querySelector('[data-vapi-button]') || document.querySelector('.vapi-btn') || document.querySelector('[class*="vapi"]');
      if (vapiButton) {
        vapiButton.style.zIndex = '99999';
        vapiButton.style.position = 'fixed';
        vapiButton.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)';
        vapiButton.style.transition = 'all 0.3s ease';
        vapiButton.style.cursor = 'pointer';
        
        // Add hover effect
        vapiButton.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1)';
          this.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)';
        });
        
        vapiButton.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
          this.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)';
        });
        
        // Add phone ringing animation when clicked
        vapiButton.addEventListener('click', function() {
          this.style.animation = 'phoneRing 0.6s ease-in-out';
          setTimeout(() => {
            this.style.animation = '';
          }, 600);
        });
        
        // Add floating animation
        vapiButton.style.animation = 'vapiFloat 3s ease-in-out infinite';
      }
    }, 1000);
  };
})(document, "script");

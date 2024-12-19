document.addEventListener('DOMContentLoaded', () => {
  const messageTextarea = document.getElementById('message');
  const placeholderText = "Please leave a message.......";
  let isTyping = false;
  let charIndex = 0;

  // Intersection Observer to detect when contact section is in view
  const contactSection = document.getElementById('contact');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting && !isTyping) {
              startPlaceholderTyping();
          }
      });
  }, { threshold: 0.1 }); 

  observer.observe(contactSection);

  function startPlaceholderTyping() {
      isTyping = true;
      messageTextarea.value = '';
      typeCharacter();
  }

  function typeCharacter() {
      if (charIndex < placeholderText.length) {
          messageTextarea.value += placeholderText.charAt(charIndex);
          charIndex++;
          setTimeout(typeCharacter, 50); // Typing speed (50ms between characters)
      } else {
          // Start blinking cursor effect
          messageTextarea.classList.add('blinking-cursor');
      }
  }

  // Remove placeholder when user starts typing
  messageTextarea.addEventListener('input', (e) => {
      // If the first character typed is different from the placeholder
      if (messageTextarea.value !== placeholderText) {
          messageTextarea.classList.remove('blinking-cursor');
      }
  });

  // Clear placeholder on focus if it matches the default text
  messageTextarea.addEventListener('focus', () => {
      if (messageTextarea.value === placeholderText) {
          messageTextarea.value = '';
          messageTextarea.classList.remove('blinking-cursor');
      }
  });
});
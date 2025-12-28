function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

  const words = ["Full Stack Developer", "Image Security Learner","Creator","Freelancer"];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;
  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  function type() {
    if (i < words.length) {
      if (!isDeleting && j <= words[i].length) {
        currentWord = words[i].substring(0, j++);
        typedText.textContent = currentWord;
      }

      if (isDeleting && j >= 0) {
        currentWord = words[i].substring(0, j--);
        typedText.textContent = currentWord;
      }

      if (j === words[i].length) isDeleting = true;
      if (j === 0 && isDeleting) {
        isDeleting = false;
        i++;
        if (i === words.length) i = 0;
      }

      setTimeout(type, isDeleting ? 90 : 180);
    }
  }

  window.onload = () => {
    type();
  };




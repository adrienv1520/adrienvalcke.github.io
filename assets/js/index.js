(() => {
  const photo = document.getElementById('photo'),
        resume = document.getElementById('resume');

  photo.addEventListener('click', () => {
    resume.classList.toggle('show');
    resume.classList.toggle('hide');
  });
})();

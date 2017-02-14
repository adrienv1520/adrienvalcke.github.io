(() => {
  const photo = document.getElementById('photo');
  const resume = document.getElementById('resume');

  photo.addEventListener('click', () => {
    resume.classList.toggle('show');
    resume.classList.toggle('hide');
  });
})();

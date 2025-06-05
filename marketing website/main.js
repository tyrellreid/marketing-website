function scrollToSection() {
  document.getElementById('more').scrollIntoView({ behavior: 'smooth' });
}

function toggleDescription(el) {
  const desc = el.querySelector('.desc');
  desc.classList.toggle('show');
}

function toggleAccordion(btn) {
  const panel = btn.nextElementSibling;
  panel.classList.toggle('open');
}

let currentSlide = 0;
function nextSlide() {
  const cases = document.querySelectorAll('.case');
  cases[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % cases.length;
  cases[currentSlide].classList.add('active');
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }
  alert("Message sent!");
  return true;
}
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    accordion.addEventListener('click', () => toggleAccordion(accordion));
  });

  const slides = document.querySelectorAll('.case');
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }
});
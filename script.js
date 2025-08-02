// Quiz Logic
let userAnswers = {
  lastQuestion: {}
};

function selectOption(element, value) {
  const parent = element.closest('.options');
  const questionNumber = parent.getAttribute('data-question');

  // Deselect all options
  parent.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

  // Mark selected
  element.classList.add('selected');

  // Store answer
  if (!userAnswers.lastQuestion) userAnswers.lastQuestion = {};
  userAnswers.lastQuestion[questionNumber] = value;
}



function calculateResult() {
  let scores = { mountains: 0, culture: 0, wildlife: 0 };

  const q1 = userAnswers.lastQuestion?.["1"];
  const q2 = userAnswers.lastQuestion?.["2"];
  const q3 = userAnswers.lastQuestion?.["3"];

  if (!q1 || !q2 || !q3) {
    alert("Please answer all questions!");
    return;
  }

  // Assign scores
  if (q1 === 'mountains' || q1 === 'all' || q3 === 'mountains') scores.mountains += 2;
  if (q1 === 'culture' || q1 === 'all' || q3 === 'culture') scores.culture += 2;
  if (q1 === 'wildlife' || q1 === 'all' || q3 === 'wildlife') scores.wildlife += 2;

  if (q2 === 'high') scores.mountains += 1;
  if (q2 === 'medium' || q2 === 'low') scores.culture += 1;

  // Pick best result
  let result = 'culture';
  let maxScore = 0;
  for (const [key, value] of Object.entries(scores)) {
    if (value > maxScore) {
      maxScore = value;
      result = key;
    }
  }

  // Show result
  const resultDiv = document.getElementById('result');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');

  if (result === 'mountains') {
    resultTitle.textContent = "Your Himalayan Adventure Awaits!";
    resultDesc.textContent = "You'd love the Everest region and Annapurna treks!";
  } else if (result === 'culture') {
    resultTitle.textContent = "Immerse Yourself in Ancient Culture!";
    resultDesc.textContent = "Explore Kathmandu Valley and its historic cities!";
  } else {
    resultTitle.textContent = "Jungle Safari Adventure!";
    resultDesc.textContent = "Visit Chitwan National Park for wildlife and safaris!";
  }

  resultDiv.style.display = 'block';
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', function () {
  const animateElements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

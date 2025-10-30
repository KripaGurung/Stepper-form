let nextButtons = document.querySelectorAll(".next");
let prevButtons = document.querySelectorAll(".prev");
let steps = document.querySelectorAll(".form-step");
let progress = document.querySelectorAll(".step");


let currentStep = 0;

for (let i = 0; i < nextButtons.length; i++) {
  nextButtons[i].addEventListener("click", function() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep();
      updateProgress();
    }
  });
}

for (let i = 0; i < prevButtons.length; i++) {
  prevButtons[i].addEventListener("click", function() {
    if (currentStep > 0) {
      currentStep--;
      showStep();
      updateProgress();
    }
  });
}

function showStep() {
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove("active"); 
  }
  steps[currentStep].classList.add("active"); 
}

function updateProgress() {
  for (let i = 0; i < progress.length; i++) {
    if (i <= currentStep) {
      progress[i].classList.add("active"); 
    } else {
      progress[i].classList.remove("active"); 
    }
  }
}

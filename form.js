const registerForm = document.getElementById("register-form");

window.addEventListener("load", () => {
    const savedData = JSON.parse(localStorage.getItem("tempFormData"));
    if (savedData) {
        for (const key in savedData) {
            const field = document.getElementById(key);
            if (field) {
                if (field.type === "checkbox" || field.type === "radio") {
                    field.checked = savedData[key];
                } else if (field.tagName === "SELECT") {
                    field.value = savedData[key];
                } else {
                    field.value = savedData[key];
                }
            }
        }

        if (savedData.interests && Array.isArray(savedData.interests)) {
            savedData.interests.forEach(value => {
                const checkbox = document.querySelector(`input[name="interests"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }

        const terms = document.getElementById("terms");
        if (terms && savedData.terms) {
            terms.checked = true;
        }
    }
});

registerForm.addEventListener("input", () => {
    const formData = getCurrentFormData();
    localStorage.setItem("tempFormData", JSON.stringify(formData));
});

function getCurrentFormData() {
    const data = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        username: document.getElementById("username").value,
        phone: document.getElementById("phone").value,
        country: document.getElementById("country").value,
        skill: document.getElementById("skill").value,
        terms: document.getElementById("terms").checked
    };

    data.interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    return data;
}

// Form submit
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const {
        fullName,
        email,
        password,
        confirmPassword,
        username,
        phone,
        country,
        skill,
        interests
    } = getCurrentFormData();

    const termsChecked = document.getElementById("terms").checked;

    //check if password is match or not
    if (password !== confirmPassword) {
        alert("Password not match!");
        return;
    }

    if (!termsChecked) {
        alert("Please agree with terms and conditions before you register!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("User with this email already exists!");
        return;
    }

    users.push({
        fullName,
        email,
        password,
        username,
        phone,
        country,
        skill,
        interests
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("tempFormData"); 

    alert("Account created successfully!");
    window.location.href = "login.html";
});

let nextButtons = document.querySelectorAll(".next");
let prevButtons = document.querySelectorAll(".prev");
let steps = document.querySelectorAll(".form-step");
let progress = document.querySelectorAll(".step");
let currentStep = 0;

for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener("click", function () {
        if (!validateStep(currentStep)) return; // stop moving if invalid
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep();
            updateProgress();
        }
    });
}

for (let i = 0; i < prevButtons.length; i++) {
    prevButtons[i].addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep();
            updateProgress();
        }
    });
}

function showStep() {
    steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));
}

function updateProgress() {
    progress.forEach((p, i) => p.classList.toggle("active", i <= currentStep));
}

//Validation per step
function validateStep(stepIndex) {
    if (stepIndex === 0) {
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill out all fields before continuing.");
            return false;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }
    }

    if (stepIndex === 1) {
        const username = document.getElementById("username").value.trim();
        const country = document.getElementById("country").value.trim();
        if (!username || !country) {
            alert("Please fill all required fields in Personal Details.");
            return false;
        }
    }

    if (stepIndex === 2) {
        const interests = document.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
            alert("Please select at least three interest.");
            return false;
        }
    }

    return true;
}

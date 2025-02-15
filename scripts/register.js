

document.addEventListener("DOMContentLoaded", function () {
    const mobileInput = document.getElementById("mobile");

    mobileInput.addEventListener("input", function (e) {
        let value = this.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (value.length > 10) {
            value = value.slice(0, 10); // Ensure max 10 digits
        }

        // Format input as "000 000 0000"
        let formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

        this.value = formattedValue;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll(".password-toggle");

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        // Get the associated input field
        const input = this.previousElementSibling;
        if (input && input.type === "password") {
          input.type = "text"; // Show password
          this.setAttribute("fill", "#555"); // Darker color to indicate it's visible
          this.setAttribute("stroke", "#555");
        } else {
          input.type = "password"; // Hide password
          this.setAttribute("fill", "#bbb"); // Reset color
          this.setAttribute("stroke", "#bbb");
        }
      });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const firstNameInput = document.querySelector('input[name="first_name"]');
    const lastNameInput = document.querySelector('input[name="last_name"]');
    const mobileInput = document.querySelector('input[name="mobile"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');
    const registerButton = document.getElementById("register-btn");
    const passwordRequirements = document.getElementById("password-requirements");
    const emailRequirements = document.getElementById("email-requirements");
    const errorDiv = document.getElementById("error-message"); 
    const registerForm = document.getElementById("register-form");
    const otpSection = document.getElementById("otp-section");
    const otpMessage = document.getElementById("otp-message");
    const backButton = document.getElementById("back-button"); // Added back button reference

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    let emailIsValid = false;
    let debounceTimeout;

    emailInput.addEventListener("input", function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async function () {
            const email = emailInput.value.trim();
            if (email === "") {
                emailRequirements.innerHTML = "";
                emailInput.style.borderBottom = "1px solid #ccc";
                emailIsValid = false;
                return;
            }

            if (!validateEmail(email)) {
                emailRequirements.innerHTML = "Invalid email format (example: user@example.com)";
                emailRequirements.style.color = "red";
                emailInput.style.borderBottom = "1px solid red";
                emailIsValid = false;
                return;
            }

            try {
                const response = await fetch(`../api/check_email.php?email=${encodeURIComponent(email)}`);
                const result = await response.json();

                if (result.exists) {
                    emailRequirements.innerHTML = "Email is already in use.";
                    emailRequirements.style.color = "red";
                    emailInput.style.borderBottom = "1px solid red";
                    emailIsValid = false;
                } else {
                    emailRequirements.innerHTML = "Email is valid.";
                    emailRequirements.style.color = "green";
                    emailInput.style.borderBottom = "1px solid green";
                    emailIsValid = true;
                }
            } catch (error) {
                console.error("Error checking email:", error);
                emailIsValid = false;
            }
        }, 300);
    });

    function validatePassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        let messages = [];
        let isValid = true;

        if (password.length < 8) {
            messages.push("Password must be at least 8 characters long.");
            isValid = false;
        }
        if (!/[A-Z]/.test(password)) {
            messages.push("Password must contain at least one uppercase letter.");
            isValid = false;
        }
        if (!/[a-z]/.test(password)) {
            messages.push("Password must contain at least one lowercase letter.");
            isValid = false;
        }
        if (!/\d/.test(password)) {
            messages.push("Password must contain at least one number.");
            isValid = false;
        }
        if (!/[\W_]/.test(password)) {
            messages.push("Password must contain at least one special character.");
            isValid = false;
        }
        if (password !== confirmPassword && confirmPassword.length > 0) {
            messages.push("Passwords do not match.");
            isValid = false;
        }

        if (!isValid) {
            passwordRequirements.innerHTML = messages.join("<br>");
            passwordRequirements.style.color = "red";
            passwordInput.style.border = "1px solid red";
            confirmPasswordInput.style.border = "1px solid red";
        } else {
            passwordRequirements.innerHTML = "Password meets all requirements!";
            passwordRequirements.style.color = "green";
            passwordInput.style.border = "1px solid green";
            confirmPasswordInput.style.border = "1px solid green";
        }

        return isValid;
    }

function validateForm() {
    let isValid = true;
    let emptyFields = false;
    const agreeCheckbox = document.getElementById("agree");

    // Checkbox validation
    if (!agreeCheckbox.checked) {
        errorDiv.innerHTML = `<span class="font-medium">Error:</span> You must agree to the terms and conditions.`;
        errorDiv.style.display = "block";
        agreeCheckbox.classList.add("border-red-500");
        isValid = false;
    } else {
        errorDiv.style.display = "none";
        agreeCheckbox.classList.remove("border-red-500");
    }

    // Field validation
    [firstNameInput, lastNameInput, mobileInput].forEach(input => {
        if (input.value.trim() === "") {
            emptyFields = true;
            input.style.border = "1px solid red";
        } else {
            input.style.border = "";
        }
    });

    if (emptyFields) {
        errorDiv.innerHTML = `<span class="font-medium">Error:</span> Please fill in the required fields.`;
        errorDiv.style.display = "block";
        isValid = false;
    } else {
        errorDiv.style.display = "none";
    }

    if (!validatePassword()) {
        isValid = false;
    }

    // Check both format and availability
    if (!validateEmail(emailInput.value.trim()) || !emailIsValid) {
        emailRequirements.innerHTML = "Invalid or already used email.";
        emailRequirements.style.color = "red";
        emailInput.style.borderBottom = "1px solid red";
        isValid = false;
    }

    // Validate mobile number format (start with 9 and follow pattern 969 321 3556)
    const mobilePattern = /^9\d{2}\s\d{3}\s\d{4}$/;
    if (!mobilePattern.test(mobileInput.value.trim())) {
        errorDiv.innerHTML = `<span class="font-medium">Error:</span> Mobile number must start with 9 and follow the format 969 321 3556.`;
        errorDiv.style.display = "block";
        mobileInput.style.border = "1px solid red";
        isValid = false;
    } else {
        mobileInput.style.border = "";
    }

    return isValid;
}


// Handle Register Button Click
registerButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const userEmail = emailInput.value.trim();
    otpMessage.innerHTML = `An OTP was sent to <strong>${userEmail}</strong>.`;

    // Animate out the register form
    registerForm.classList.add('fade-out');
    setTimeout(() => {
        registerForm.style.display = "none";
        registerForm.classList.remove('fade-out');
        otpSection.style.display = "block";
        otpSection.classList.add('fade-in');
    }, 500);
});

// Handle Back Button Click
backButton.addEventListener("click", function () {
    // Animate out the OTP section
    otpSection.classList.add('fade-out');
    setTimeout(() => {
        otpSection.style.display = "none";
        otpSection.classList.remove('fade-out');
        registerForm.style.display = "block";
        registerForm.classList.add('fade-in');
    }, 500);
});


    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validatePassword);

    [firstNameInput, lastNameInput, mobileInput].forEach(input => {
        input.addEventListener("input", function () {
            this.style.border = "";
            errorDiv.style.display = "none";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const otpInputs = document.querySelectorAll(".otp-input");
    const verifyButton = document.getElementById("verify-otp");
    const errorMessage = document.getElementById("otp-error");
    const resendBtn = document.getElementById("resend-otp");
    const registerBtn = document.getElementById("register-btn");
    const otpSection = document.getElementById("otp-section");
    const validSection = document.getElementById("valid-section");
    const countdownElement = document.getElementById('countdown');

    let countdown = 60;
    let timer;

    function startValidCountdown() {
  const validSection = document.getElementById('valid-section');
  const countdownElement = document.getElementById('countdown');

  if (validSection.style.display === 'block') {                                                                                             
    let seconds = 5;
    countdownElement.textContent = seconds;

    const countdownInterval = setInterval(() => {
      seconds--;
      countdownElement.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = 'login.php';
      }
    }, 1000);
  }
}

// Redirect button event
document.getElementById('redirect-login').addEventListener('click', () => {
  window.location.href = 'login.php';
});



    function startCountdown() {
        clearInterval(timer);
        countdown = 60;
        resendBtn.textContent = `Resend OTP (${countdown}s)`;
        resendBtn.classList.add("pointer-events-none", "text-gray-400");

        timer = setInterval(() => {
            countdown--;
            resendBtn.textContent = `Resend OTP (${countdown}s)`;

            if (countdown <= 0) {
                clearInterval(timer);
                resendBtn.textContent = "Resend OTP";
                resendBtn.classList.remove("pointer-events-none", "text-gray-400");
            }
        }, 1000);
    }

    registerBtn?.addEventListener("click", () => {
        const emailInput = document.getElementById("email");
        if (!emailInput) {
            console.error("Missing email input field");
            return;
        }

        const email = emailInput.value;

        fetch("../api/generate_otp.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("OTP generated successfully");
            } else {
                console.error("Failed to generate OTP:", data.message);
            }
        })
        .catch(error => console.error("Error generating OTP:", error));

        startCountdown();
    });

    resendBtn?.addEventListener("click", (event) => {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        if (!emailInput) {
            console.error("Missing email input field");
            return;
        }

        const email = emailInput.value;

        fetch("../api/generate_otp.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("OTP generated successfully");
            } else {
                console.error("Failed to generate OTP:", data.message);
            }
        })
        .catch(error => console.error("Error generating OTP:", error));

        startCountdown();
    });

    otpInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        // Remove non-digit characters
        this.value = this.value.replace(/\D/g, '');

        // Clear error message when typing
        errorMessage.classList.add("hidden");

        // Auto-focus on the next input if a digit is entered
        if (this.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", function (event) {
        // Move focus to the previous input on backspace
        if (event.key === "Backspace" && this.value === '') {
            if (index > 0) otpInputs[index - 1].focus();
        }
    });

    input.addEventListener("paste", function (event) {
        // Handle pasting OTP digits
        event.preventDefault();
        const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        pasted.split('').forEach((char, i) => {
            if (otpInputs[i]) otpInputs[i].value = char;
        });
        const nextEmpty = [...otpInputs].find(input => input.value === '');
        if (nextEmpty) nextEmpty.focus();

        // Clear error when pasting
        errorMessage.classList.add("hidden");
    });
});


verifyButton?.addEventListener("click", () => {
    const otpInput = Array.from(otpInputs).map(input => input.value).join('');
    if (!otpInput || otpInput.length !== 6) {
        errorMessage.textContent = "OTP input is missing or incomplete.";
        errorMessage.classList.remove("hidden");
        console.warn("⚠️ OTP input is incomplete or missing.");
        return;
    }

    fetch("../api/verify_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `otp=${encodeURIComponent(otpInput)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("✅ OTP is valid. Proceeding with registration...");
            errorMessage.classList.add("hidden");

            const formData = new URLSearchParams();
            const fields = ["first_name", "last_name", "mobile", "email", "password", "confirm_password", "agree"];

            fields.forEach(field => {
                const element = document.getElementById(field);
                if (element) {
                    formData.append(field, field === "agree" ? (element.checked ? "on" : "") : element.value);
                } else {
                    console.warn(`⚠️ Missing field: ${field}`);
                }
            });

            fetch("../api/add_user.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            })
            .then(res => res.json())
            .then(regData => {
                if (regData.status === "success") {
                    console.log("🎉 User registered successfully!");

                    otpSection.classList.add('fade-out');
                        setTimeout(() => {
                            otpSection.style.display = "none";
                            otpSection.classList.remove('fade-out');
                            validSection.style.display = "block";
                            validSection.classList.add('fade-in');
                            startValidCountdown();
                        }, 500);
                } else {
                    errorMessage.textContent = regData.message;
                    errorMessage.classList.remove("hidden");
                    console.error("❌ Registration failed:", regData.message);
                }
            })
            .catch(err => {
                errorMessage.textContent = "Error submitting registration. Please try again.";
                errorMessage.classList.remove("hidden");
                console.error("❌ Error submitting registration:", err);
            });
        } else {
            errorMessage.textContent = "Invalid OTP. Please try again.";
            errorMessage.classList.remove("hidden");
            console.warn("⚠️ Invalid OTP:", data.message);
        }
    })
    .catch(error => {
        errorMessage.textContent = "Error verifying OTP. Please try again.";
        errorMessage.classList.remove("hidden");
        console.error("❌ Error verifying OTP:", error);
    });
});


});


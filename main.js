const body = document.querySelector("body");
const modeToggle = body.querySelector(".slider");

/* Dark mode settings */
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

/* Main functionality */
const selectOption = document.querySelector("#length");
const generateButton = document.querySelector("#generate");
const copyButton = document.querySelector("#copy-btn");
const copySpantext = document.querySelector(".copy-text");
const copyIcon = document.querySelector(".copy-icon");
const passwords = document.querySelector("#passwords");
const passStrength = document.querySelector("#password-strength");

const includeLowercase = document.querySelector("#lowercase");
const includeUppercase = document.querySelector("#uppercase");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");

// characters to be used in new passwords
let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "!@#$%ˆ&*()-_=+[]{}|;:,.<>?/";

// input checker
function checkboxChecker() {
  let counter = 0;
  let additions = "";
  if (includeLowercase.checked) {
    additions += lowerCaseLetters;
    counter += 1;
  }
  if (includeUppercase.checked) {
    additions += upperCaseLetters;
    counter += 1;
  }
  if (includeNumbers.checked) {
    additions += numbers;
    counter += 1;
  }
  if (includeSymbols.checked) {
    additions += symbols;
    counter += 1;
  }

  if (counter == 0) {
    return "none";
  } else {
    return additions;
  }
}

// click to generate a new password
generateButton.addEventListener("click", () => {
  if (checkboxChecker() == "none") {
    passwords.style.borderColor = "#ff0000";
    passStrength.innerHTML = "Please, select an option!";
    passStrength.style.color = "#ff0000";
    setTimeout(() => {
      passwords.style.borderColor = "#afa8ba";
      passStrength.innerHTML = "";
      passwords.value = "";
    }, 2000);
  } else {
    let collection = selectOption.selectedOptions;
    let newGeneration = "";
    let inputsAdded = checkboxChecker();
    let value = "";

    for (i = 0; i < collection.length; i++) {
      value += collection[i].label;
    }

    for (j = 0; j < value; j++) {
      newGeneration += inputsAdded.charAt(
        Math.floor(Math.random() * inputsAdded.length)
      );
    }

     /* random charapter transition effect  */
     (function randomAnimation() {
      const elements = newGeneration;
      const startTime = Date.now();
      const duration = 1500;
      const letters = elements.split("");
      const steps = letters.length;

      function map(n, x1, y1, x2, y2) {
        return Math.min(
          Math.max(((n - x1) * (y2 - x2)) / (y1 - x1) + x2, x2),
          y2
        );
      }

      const random = (set) => set[Math.floor(Math.random() * set.length)];

      let frame;

      (function randomTransEffect() {
        frame = requestAnimationFrame(randomTransEffect);

        const step = Math.round(
          map(Date.now() - startTime, 0, duration, 0, steps)
        );

        passwords.value = letters
          .map((s, i) => (step - 1 >= i ? letters[i] : random(inputsAdded)))
          .join("");

        if (step >= steps) {
          cancelAnimationFrame(frame);
        }
      })();
    })();

    if (value >= 10) {
      passStrength.innerHTML = "This is a <u>STRONG</u> password!";
      passStrength.style.color = "#4EA72E";
      passwords.style.borderColor = "#4EA72E";
    } else if (value >= 6) {
      passStrength.innerHTML = "This is an <u>Acceptable</u> password!";
      passStrength.style.color = "#FFC000";
      passwords.style.borderColor = "#FFC000";
    } else {
      passStrength.innerHTML = "This is a <u>Weak</u> password!";
      passStrength.style.color = "#FF0000";
      passwords.style.borderColor = "#FF0000";
    }

    passwords.value = newGeneration;
  }
});

// click to copy the new password
copyButton.addEventListener("click", () => {
  if (passwords.value == "") {
    // check if a password was generated
    passwords.style.borderColor = "#ff0000";
    passStrength.innerHTML = "Must generate first! :)";
    passStrength.style.color = "#ff0000";
    setTimeout(() => {
      passwords.style.borderColor = "#afa8ba";
      passStrength.innerHTML = "";
    }, 2000);
  } else {
    navigator.clipboard.writeText(passwords.value);
    copySpantext.innerHTML = "Copied!";
    copyButton.style.backgroundColor = "#4EA72E";
    copyIcon.setAttribute("name", "checkbox");
    setTimeout(() => {
      copySpantext.innerHTML = "Copy";
      copyButton.style.backgroundColor = "#482ad8";
      copyIcon.setAttribute("name", "copy");
    }, 2000);
  }
});

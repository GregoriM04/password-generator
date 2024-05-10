const body = document.querySelector("body");
const modeToggle = body.querySelector(".slider");

// Dark mode settings
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

// Main functionality
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

let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "!@#$%ˆ&*()-_=+[]{}|;:,.<>?/";

generateButton.addEventListener("click", () => {
  let collection = selectOption.selectedOptions;
  let newGeneration = "";
  let additions = "";
  let value = "";

  for (i = 0; i < collection.length; i++) {
    value += collection[i].label;
  }

  if (includeLowercase.checked) {
    additions += lowerCaseLetters;
  }
  if (includeUppercase.checked) {
    additions += upperCaseLetters;
  }
  if (includeNumbers.checked) {
    additions += numbers;
  }
  if (includeSymbols.checked) {
    additions += symbols;
  }

  for (j = 0; j < value; j++) {
    newGeneration += additions.charAt(
      Math.floor(Math.random() * additions.length)
    );
  }

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
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwords.value);
  copySpantext.innerHTML = "Copied!";
  copyButton.style.backgroundColor = "#4EA72E";
  copyIcon.setAttribute("name", "checkbox");
  setTimeout(() => {
    copySpantext.innerHTML = "Copy";
    copyButton.style.backgroundColor = "#482ad8";
    copyIcon.setAttribute("name", "copy");
  }, 2000);
});

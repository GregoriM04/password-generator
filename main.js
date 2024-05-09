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
const passwords = document.querySelector("#passwords");

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

  passwords.value = newGeneration;
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwords.value);
  copySpantext.innerHTML = "Copied!";
  copyButton.style.backgroundColor = "#4EA72E";
  setTimeout(() => {
    copySpantext.innerHTML = "Copy";
    copyButton.style.backgroundColor = "#482ad8";
  }, 2000);
});

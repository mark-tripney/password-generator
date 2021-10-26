const passwordContainer = document.querySelector('.password-container');
const passwordOutput = document.getElementById('password-output');
const lengthRange = document.getElementById('length-range');
const lengthOutput = document.getElementById('length-output');
const mainForm = document.getElementById('main-form');
const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
const numbersCheckbox = document.getElementById('numbers-checkbox');
const symbolsCheckbox = document.getElementById('symbols-checkbox');

// Generate arrays of ASCII codes for each character category
const generateArray = (lower, upper) => {
  // After length calc, map function returns index of element '_' + lower
  return Array.from(Array(upper - lower + 1), (_, i) => i + lower);
};

// ASCII code ranges from https://theasciicode.com.ar/
const lowerCaseCodes = generateArray(97, 122);
const upperCaseCodes = generateArray(65, 90);
const numberCodes = generateArray(48, 57);
const symbolCodes = generateArray(33, 47)
  .concat(generateArray(58, 64))
  .concat(generateArray(91, 96))
  .concat(generateArray(123, 126));

// Synchronise length input with length display
const synchroniseLength = (e) => {
  const length = e.target.value;
  lengthRange.value = length;
  // Pad lengths 1-9 with leading zero
  lengthOutput.innerText = ('0' + length).slice(-2);
};

lengthRange.addEventListener('input', synchroniseLength);

const generatePassword = (length, uppercase, numbers, symbols) => {
  // Lower-case password is default; lower-case chars always included...
  let asciiCodes = lowerCaseCodes;
  if (uppercase) asciiCodes = asciiCodes.concat(upperCaseCodes);
  if (numbers) asciiCodes = asciiCodes.concat(numberCodes);
  if (symbols) asciiCodes = asciiCodes.concat(symbolCodes);
  const passwordChars = [];
  for (let i = 0; i < length; i++) {
    passwordChars.push(
      String.fromCharCode(
        asciiCodes[Math.floor(Math.random() * asciiCodes.length)]
      )
    );
  }
  console.log(passwordChars.join(''));
  return passwordChars.join('');
};

// Event bubbling manages event listening on the various inputs
mainForm.addEventListener('input', (e) => {
  const length = lengthRange.value;
  const uppercase = uppercaseCheckbox.checked;
  const numbers = numbersCheckbox.checked;
  const symbols = symbolsCheckbox.checked;
  const password = generatePassword(length, uppercase, numbers, symbols);
  passwordOutput.innerText = password;
});

passwordContainer.addEventListener('click', () => {
  const currentPassword = passwordOutput.innerText;
  navigator.clipboard
    .writeText(currentPassword)
    .then(() => {
      passwordOutput.classList.toggle('copy-action');
      passwordOutput.innerText = 'Copied to clipboard';
      setTimeout(() => {
        passwordOutput.innerText = currentPassword;
        passwordOutput.classList.toggle('copy-action');
      }, 2000);
    })
    .catch((err) => {
      passwordOutput.classList.toggle('copy-action');
      passwordOutput.innerText = "Can't access clipboard, not copied";
      setTimeout(() => {
        passwordOutput.innerText = currentPassword;
        passwordOutput.classList.toggle('copy-action');
      }, 2000);
    });
});

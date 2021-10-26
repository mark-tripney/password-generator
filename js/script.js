const passwordOutput = document.getElementById('password-output');
const lengthRange = document.getElementById('length-range');
const lengthNumber = document.getElementById('length-number');
const mainForm = document.getElementById('main-form');
const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
const numbersCheckbox = document.getElementById('numbers-checkbox');
const symbolsCheckbox = document.getElementById('symbols-checkbox');

// Generate arrays of ASCII codes for each character category
const generateArray = (lower, upper) => {
  // After length calc, map function returns index of element '_' + lower
  return Array.from(Array(upper - lower + 1), (_, i) => i + lower);
};

const lowerCaseCodes = generateArray(97, 122);
const upperCaseCodes = generateArray(65, 90);
const numberCodes = generateArray(48, 57);
const symbolCodes = generateArray(33, 47)
  .concat(generateArray(58, 64))
  .concat(generateArray(91, 96))
  .concat(generateArray(123, 126));

// Synchronise both 'length' inputs (range and number)
const synchroniseLength = (e) => {
  const length = e.target.value;
  lengthNumber.value = length;
  lengthRange.value = length;
};

lengthRange.addEventListener('input', synchroniseLength);
lengthNumber.addEventListener('input', synchroniseLength);

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

mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const length = lengthRange.value;
  const uppercase = uppercaseCheckbox.checked;
  const numbers = numbersCheckbox.checked;
  const symbols = symbolsCheckbox.checked;
  const password = generatePassword(length, uppercase, numbers, symbols);
  passwordOutput.innerText = password;
});

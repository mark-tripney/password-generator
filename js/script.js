const passwordOutput = document.getElementById('password-output');
const lengthRange = document.getElementById('length-range');
const lengthNumber = document.getElementById('length-number');
const mainForm = document.getElementById('main-form');
const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
const numbersCheckbox = document.getElementById('numbers-checkbox');
const symbolsCheckbox = document.getElementById('symbols-checkbox');
// Generate arrays of ASCII codes for each character category
const upperCaseCodes = Array.from(new Array(26), (x, i) => i + 65);
const lowerCaseCodes = Array.from(new Array(26), (x, i) => i + 97);
const numberCodes = Array.from(new Array(10), (x, i) => i + 48);
const symbolCodes = Array.from(new Array(15), (x, i) => i + 33)
  .concat(Array.from(new Array(7), (x, i) => i + 58))
  .concat(Array.from(new Array(6), (x, i) => i + 91))
  .concat(Array.from(new Array(4), (x, i) => i + 123));

console.log(lowerCaseCodes);
console.log(upperCaseCodes);
console.log(numberCodes);
console.log(symbolCodes);

const synchroniseLength = (e) => {
  const length = e.target.value;
  lengthNumber.value = length;
  lengthRange.value = length;
};

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

lengthRange.addEventListener('input', synchroniseLength);
lengthNumber.addEventListener('input', synchroniseLength);

mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const length = lengthRange.value;
  const uppercase = uppercaseCheckbox.checked;
  const numbers = numbersCheckbox.checked;
  const symbols = symbolsCheckbox.checked;
  const password = generatePassword(length, uppercase, numbers, symbols);
  passwordOutput.innerText = password;
});

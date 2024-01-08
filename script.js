// Arrays of characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt('Enter the length you would like your password to be (between 8 and 128 characters):'));

  // Validate password length
  if (isNaN(length) || length < 8 || length > 128) {
    alert('Please enter a number between 8 and 128 characters.');
    return null;
  }

  var includeSpecial = confirm('Include special characters? OK - yes Cancel - No');
  var includeNumeric = confirm('Include numeric characters? OK - yes Cancel - No');
  var includeLowercase = confirm('Include lowercase characters? OK - yes Cancel - No');
  var includeUppercase = confirm('Include uppercase characters? OK - yes Cancel - No');

  // Validate that at least one character type is selected
  if (!includeSpecial && !includeNumeric && !includeLowercase && !includeUppercase) {
    alert('Please select at least one character type.');
    return null;
  }

  return {
    length: length,
    includeSpecial: includeSpecial,
    includeNumeric: includeNumeric,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase
  };
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  if (!options) return ''; // User canceled or provided invalid input

  var possibleCharacters = [];

  if (options.includeSpecial) possibleCharacters = possibleCharacters.concat(specialCharacters);
  if (options.includeNumeric) possibleCharacters = possibleCharacters.concat(numericCharacters);
  if (options.includeLowercase) possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  if (options.includeUppercase) possibleCharacters = possibleCharacters.concat(upperCasedCharacters);

  var generatedPassword = '';

  for (var i = 0; i < options.length; i++) {
    var randomCharacter = getRandom(possibleCharacters);
    generatedPassword += randomCharacter;
  }

  return generatedPassword;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector('#password');

  // Clear any existing password
  passwordText.value = '';

  // Generate a new password
  var password = generatePassword();

  // Display the generated password
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

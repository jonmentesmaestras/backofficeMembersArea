var access = {}

access.generatePassword = function () {
    const specialCharacters = ["!", "%", "&", "(", ")"];
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    const numbers = "0123456789";
  
    const getRandomChar = (charSet) => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
    };
  
    // Ensure we have at least one special character
    const specialChar = getRandomChar(specialCharacters);
  
    // Ensure we have at least two uppercase letters
    let password = "";
    for (let i = 0; i < 2; i++) {
      password += getRandomChar(upperCaseLetters);
    }
  
    // Add three consonants
    for (let i = 0; i < 3; i++) {
      password += getRandomChar(consonants);
    }
  
    // Add a random number
    password += getRandomChar(numbers);
  
    // Fill the remaining characters with any valid characters
    const remainingChars = 8 - password.length;
    for (let i = 0; i < remainingChars; i++) {
      const allChars = upperCaseLetters + consonants + numbers;
      password += getRandomChar(allChars);
    }
  
    // Shuffle the password to randomize the order of characters
    password = password.split("");
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }
    return password.join("") + specialChar;
  }

  module.exports = access
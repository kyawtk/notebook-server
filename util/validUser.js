const User = require("../models/user");

async function isValid(userName) {
  let regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  let goodRegex = regex.test(userName);

  try {
    let user = await User.exists({ userName });
    return !user && goodRegex;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false; // Return false to indicate an error occurred during the database operation
  }
}

module.exports = isValid;

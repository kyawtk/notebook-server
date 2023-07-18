const User = require('../models/user');

// Function to check if the user is authenticated
async function isAuthenticated(userName, passWord) {
  try {
    const user = await User.findOne({ userName });
    if (user && user.passWord === passWord) {
      console.log(user);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

module.exports = isAuthenticated;

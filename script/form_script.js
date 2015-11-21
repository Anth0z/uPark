//signup & login form validation
function checkUsername(input) {
  
  if(input.validity.patternMismatch) {
    console.log(input);
      input.setCustomValidity("Please enter a name within 4 to 50 characters");
      return false;

  } else if(input.validity.valueMissing) {
      input.setCustomValidity("You must enter a username!");
      return false;

  } else {
      input.setCustomValidity("");
      return true;
  }
}

function checkPassword(input) {
  //console.log(input);
  if(input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a password within 4 to 50 characters");
      return false;

  } else if(input.validity.valueMissing) {
      input.setCustomValidity("You must enter a password!");
      return false;

  } else {
      input.setCustomValidity("");
      return true;
  }
}

function checkFirstName(input) {
  //console.log(input);
  if(input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a name within 2 to 20 characters");
      return false;

  } else if(input.validity.valueMissing) {
      input.setCustomValidity("You must enter a name!");
      return false;

  } else {
      input.setCustomValidity("");
      return true;
  }
}


function checkLastName(input) {
  if(input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a name within 3 to 20 characters");

  } else if(input.validity.valueMissing) {
      input.setCustomValidity("You must enter a name!");

  } else {
      input.setCustomValidity("");

  }
}

function checkEmail(input) {
  if(input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a valid email address");

  } else if(input.validity.valueMissing) {
      input.setCustomValidity("You must enter an email!");

  } else {
      input.setCustomValidity("");

  }
}

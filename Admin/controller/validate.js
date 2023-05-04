var showMessage = function (id, message) {
  document.getElementById(id).innerHTML = `<strong>${message}</strong>`;
};
var checkEmpty = function (idErr, value) {
  if (value.length == 0 || value == 0) {
    showMessage(idErr, "Please fill in the information");
    return false;
  } else {
    showMessage(idErr, "");
    return true;
  }
};


function validateProductType(type) {
  if (type.includes("Samsung") || type.includes("Iphone")) {
    showMessage("spanType", "");
    return true;
  } else {
    showMessage("spanType", "Please enter Samsung or Iphone!!!");
    return false;
  }
}


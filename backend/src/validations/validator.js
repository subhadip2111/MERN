const mongoose = require("mongoose");

function validPhone(phone) {
return /^[7869]\d{9}$/.test(phone)

    
}


const validEmail = (name) => {
  return /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(
    name
  );
};


function validPasswod(password) {
 
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)


 
  }


module.exports = { validPhone, validPasswod ,validEmail};
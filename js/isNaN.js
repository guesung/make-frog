const checkIsNaN = (value) => console.log(value, isNaN(value));
const checkNumberIsNaN = (value) => console.log(value, Number.isNaN(value));

const getIsNumber = (value) => !isNaN(parseFloat(value));

const checkCustomCheck = (value) => console.log(value, getIsNumber(value));

function isNumeric(num) {
  if (typeof num != "number") return false;
  return !isNaN(num) && !isNaN(parseFloat(str));
}

const checkIsNumeric = (value) => console.log(value, isNumeric(value));

checkIsNaN(1); // false

checkIsNaN("a"); // true
checkIsNaN({}); // true
checkIsNaN([]); // false
checkIsNaN(true); // false

checkNumberIsNaN(1); // false
checkNumberIsNaN("a"); // false
checkNumberIsNaN({}); // false
checkNumberIsNaN([]); // false
checkNumberIsNaN(true); // false
checkNumberIsNaN(NaN); // true

checkCustomCheck(1); // true
checkCustomCheck("a"); // false
checkCustomCheck({}); // false
checkCustomCheck([]); // false
checkCustomCheck(true); // false
checkCustomCheck(NaN); // false

checkIsNumeric(1); // true
checkIsNumeric("a"); // false
checkIsNumeric({}); // false
checkIsNumeric(); // false
checkIsNumeric(null); // false
checkIsNumeric([]); // false
checkIsNumeric(true); // false
checkIsNumeric(NaN); // false

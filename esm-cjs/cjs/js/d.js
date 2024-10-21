const name = "박규성";
const fileName = "a";

const { age } = require(`./${fileName}`);

if (true) module.exports = name;

console.log(age);

const fn = {
  add: (num1, num2) => num1 + num2,
  getName: function (callback) {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 3000);
  },
};

module.exports = fn;

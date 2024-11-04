const fn = {
  add: (num1, num2) => num1 + num2,
  getName: function (callback) {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 3000);
  },
  getAge: function () {
    const age = 25;
    return new Promise((resolve) => {
      return setTimeout(() => {
        resolve(age);
      }, 1000);
    });
  },
  createUser: function () {
    console.log("유저 생성");

    return {
      name: "박규성",
    };
  },
};

module.exports = fn;

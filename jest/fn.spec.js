const fn = require("./fn.js");

describe("add", () => {
  test("두 숫자의 합을 더하여 반환한다.", () => {
    expect(fn.add(1, 2)).toBe(3);
  });

  test("Mike의 이름을 반환한다", (done) => {
    const callback = (name) => {
      expect(name).toBe("Mikes");
      done();
    };

    fn.getName(callback);
  });
});

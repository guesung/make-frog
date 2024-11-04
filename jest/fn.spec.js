const fn = require("./fn.js");

describe("add", () => {
  test("두 숫자의 합을 더하여 반환한다.", () => {
    expect(fn.add(1, 2)).toBe(3);
  });

  test("Mike의 이름을 3초 후에 반환한다.", (done) => {
    const callback = (name) => {
      expect(name).toBe("Mike");
      done();
    };
    fn.getName(callback);
  });

  test("Mike의 나이를 3초 후에 반환한다.", async () => {
    const age = await fn.getAge();
    expect(age).toBe(25);
  });
});

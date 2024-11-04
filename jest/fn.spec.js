const fn = require("./fn.js");

let value = 0;

beforeEach(() => {
  value = 10;
});

describe("add", () => {
  test("beforEach를 테스트한다.", () => {
    expect(fn.add(value, 5)).toBe(15);
  });
});

const mockFn = jest.fn();

mockFn
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

const result = [1, 2, 3, 4, 5].filter((num) => mockFn(num));

test("홀수만 반환한다.", () => {
  expect(result).toStrictEqual([1, 3, 5]);
});

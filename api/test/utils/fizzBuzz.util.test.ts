import { FizzBuzz } from "../../src/utils/fizzBuzz.utils";
describe("fizzBuzz test", () => {
  const fizzBuzz = new FizzBuzz();
  it("should return Fizz for numbers divisible by 3", () => {
    expect(fizzBuzz.fizBuzz(3)).toBe("Fizz");
    expect(fizzBuzz.fizBuzz(6)).toBe("Fizz");
  });
  it("should return Buzz for numbers divisible by 5", () => {
    expect(fizzBuzz.fizBuzz(5)).toBe("Buzz");
    expect(fizzBuzz.fizBuzz(10)).toBe("Buzz");
  });
  it("should return FizzBuzz for numbers divisible by 3 & 5", () => {
    expect(fizzBuzz.fizBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz.fizBuzz(30)).toBe("FizzBuzz");
  });
  //   it("using mocks", () => {
  //     let mockFn = jest.fn(fizzBuzz.divisibleByThree);
  //     expect(fizzBuzz.fizBuzz(4)).toBe("Fizz");
  //     expect(mockFn).toHaveBeenCalledTimes(2);
  //   });
});

export class FizzBuzz {
  public fizBuzz = (num: number) => {
    if (this.divisibleByThree(num) && num % 5 === 0) return "FizzBuzz";
    if (this.divisibleByThree(num)) return "Fizz";
    if (num % 5 === 0) return "Buzz";
    return num;
  };
  divisibleByThree = (num) => num % 3 === 0;
}

const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 100; i++) {
  console.log(fizzBuzz.fizBuzz(i));
}

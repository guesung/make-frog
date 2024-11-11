// 1. unknown 타입의 값에는 어떠한 타입의 값도 할당될 수 있다.

let a: unknown = "a";

a = 1;
a = false;

let b = a; // b: unknown

// 2. unknown타입의 값을 어떠한 타입의 값에도 할당할 수 없다.

let c: number = a; // Error : Type 'unknown' is not assignable to type 'number'.

// 3. 이를 해결하기 위해서는 타입 단언이 필요하다.

let d: number = a as number; // Error : Type 'unknown' is not assignable to type 'number'.

// 4. 혹은 타입 가드도 가능하다.

const isNumber = (n: unknown): n is number => {
  if (!isNaN(a as number)) return true;
  return false;
};

if (isNumber(a)) {
  let e: number = a; // a: number
}

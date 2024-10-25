function tag(strings: any, ...values: any[]): void {
  console.log(strings, values);
}

export function main() {
  const a: 'a' = 'a';
  const b: 'b' = 'b';
  const c: 'c' = 'c';

  tag`1 ${a} 2 ${b} 3 ${c}`;
}

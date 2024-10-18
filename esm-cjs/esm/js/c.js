import("./a.js").then((module) => console.log(module));

const delayOneSecond = () => new Promise((res) => setTimeout(res, 1000));

await delayOneSecond();

console.log(2);

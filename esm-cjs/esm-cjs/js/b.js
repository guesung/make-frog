(async () => {
  const { name, age } = await import("./a.mjs");

  console.log({ name, age });
})();

// CJS에서 ESM을 불러오기 위해서는 Dynamic Import를 수행해야한다.
ㄴ;

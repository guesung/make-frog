(async () => {
  const { name, age } = await import("./a.mjs");

  console.log({ name, age });
})();

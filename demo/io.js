const a = async () => {
  const data = await new Promise((resolve, reject) => {
    reject(123);
  });
  console.log(12, data);
  console.log(12, data);
  console.log(12, data);
  console.log(12, data);
  console.log(12, data);
  f();
};
a();
function f() {
  console.log(18);
}

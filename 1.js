function f() {
  console.log(Array.prototype.join.call(arguments, ","));
}
f(1, 3, 4);

// //
// //
// // Function.prototype.before = function(beforefn) {
// //     let _self = this;
// //     return function one() {
// //         beforefn.apply(this, arguments);
// //         _self.apply(this, arguments)
// //     }
// // }
// // Function.prototype.after = function(afterfn) {
// //     let _self = this;
// //     return function () {
// //         _self.apply(this, arguments)
// //         afterfn.apply(this, arguments)
// //     }
// // }
// // var func = function() {
// //     console.log(2)
// // }
// // const f = func.before(function beforefn () {
// //     console.log(1)
// // })
// // func = f.after(function afterfn() {
// //     console.log(3)
// // })
// // func.before(function a() {
// //     console.log(27)
// // }).after(function end () {
// //     console.log('end')
// // })()
// //
// // // const a = func();
// // // console.log(31, a)
//
// var Plane = function () {};
// Plane.prototype.fire = function () {
//   console.log("发射普通子弹");
// };
// var MissileDecorator = function (plane) {
//   this.plane = plane;
// };
// MissileDecorator.prototype.fire = function () {
//   this.plane.fire();
//   console.log("发射导弹");
// };
// var AtomDecorator = function (plane) {
//   this.plane = plane;
// };
// AtomDecorator.prototype.fire = function () {
//   this.plane.fire();
//   console.log("发射原子弹");
// };
//
// const instance = new Plane();
//
// const m = new MissileDecorator(instance);
// m.fire();

var a = null;
if (a) {
  console.log(123);
} else {
  console.log(1);
}

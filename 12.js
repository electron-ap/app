// // f(1)(2)()
//
// const a = f(1)
//
//
//
// function carry(a) {
//     console.log(a)
// }
// carry(a);
//
//
// var currying = function (fn) {
//     var args = [];
//     return function () {
//         if (arguments.length === 0) {
//             return fn.apply(this, args);
//         } else {
//             [].push.apply(args, arguments);
//             return arguments.callee;
//         }
//     }
// };

// const f= add(1)
// f(12)

// function add() {
//     let args = [].slice.apply(arguments)
//     function f() {
//         args = args.concat([].slice.apply(arguments))
//         return f
//     }
//     f.toString = function () {
//         return args.reduce((total, item) => total+=item, 0)
//     }
//     return f;
// }
// var add = (function () {
//     var money = 0;
//     return function () {
//        return [].slice.apply(arguments).reduce((total, item) => total +=item, 0)
//     }
// })();

// const currying = (fn) => {
//     let args = [];
//
//     return function () {
//         if (arguments.length > 0) {
//             const arr = Array.prototype.push.apply(args, arguments);
//             return arguments.callee
//         } else {
//             return args.reduce((total, item) => total += item, 0)
//         }
//     }
// }
//
// var cost = currying(cost);
//
// console.log(cost(12)(1)())

const arr = [
  {
    grossMargin: 12,
    productId: 21,
    productName: "乙二醇",
    profit: 12,
    remake: null,
    tradeAmountTotal: 12,
    updateGrossMargin: false,
    updateProfit: false,
    updateRemake: false,
    updateTradeAmountTotal: false,
  },
];

const inObj = arr.reduce((total, item, indx) => {
  console.log(total, item, indx);
  total[indx] = item;
  return total;
}, {});
console.log(inObj);

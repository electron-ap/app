// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点

const Chain = function (fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function (successor) {
  this.successor = successor
}

Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return this.next.apply(this, arguments)
  }
  return ret
}

Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}

const fn1 = new Chain(function (a, b, c) {
  console.log(1, a)
  return 'nextSuccessor'
})
const fn2 = new Chain(function (a, b, c) {
  console.log(2, a, b, c)
  let self = this
  setTimeout(function () {
    self.next()
  }, 1000)
})
const fn3 = new Chain(function () {
  console.log(3)
})

fn1.setNextSuccessor(fn2)
fn1.passRequest(10, 20, 30)

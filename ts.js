var rxjs = require('rxjs')
var newObservable = rxjs.Observable.create(function (observe) {
  observe.next(12)
})
newObservable.subscribe(function (e) {
  console.log(e)
})

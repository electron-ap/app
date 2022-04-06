const rxjs = require('rxjs')

const newObservable = rxjs.Observable.create((observe) => {
  observe.next(12)
})

newObservable.subscribe((e) => {
  console.log(e)
})

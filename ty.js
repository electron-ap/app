//
//
function wrapperDev(func) {
  function handleWindowError(error) {
    console.log(5, error)
    // 收集错误交给Error Boundary处理
  }

  window.addEventListener('error', handleWindowError)
  func()
  window.removeEventListener('error', handleWindowError)
}

wrapperDev(() => {
  throw Error('123')
})
console.log('finish')

function wrapperDev(func) {
  function handleWindowError(error) {
    console.log(19, error)
    // 收集错误交给Error Boundary处理
  }

  function callCallback() {
    fakeNode.removeEventListener(evtType, callCallback, false)
    func()
  }

  const event = document.createEvent('Event')
  const fakeNode = document.createElement('fake')
  const evtType = 'fake-event'

  window.addEventListener('error', handleWindowError)
  fakeNode.addEventListener(evtType, callCallback, false)

  event.initEvent(evtType, false, false)

  fakeNode.dispatchEvent(event)

  window.removeEventListener('error', handleWindowError)
}

wrapperDev(() => {
  throw new Error('123')
})
console.log('finish')
// function wrapperPrd(func) {
//     try {
//         func();
//     } catch(e) {
//         console.log(e)
//         // ...处理错误
//     }
// }
// wrapperPrd(() => {throw Error(123)})
// console.log('finish');

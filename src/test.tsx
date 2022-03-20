// const { Observable } = require('rxjs');
// const ob$ = Observable.create(observer => { // 生产者
//     observer.next(1); // 触发权柄控制在数据生产者这里
//     setTimeout(() => {
//         observer.next(2);
//         observer.complete();
//     }, 1000);
// });
//
// const observer = {  // 消费者
//     next: result => console.log('result: ', new Date().valueOf(), result),
//     error: err => console.error('something wrong occurred: ' + err),
//     complete: () => console.log('done'),
// };
//
// ob$.subscribe(observer); // 生产者调用消费者
import { range, fromEvent, Observable, of } from 'rxjs'
import { mergeMap, takeUntil, map } from 'rxjs/operators'

// import { fromEvent, interval } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

import { useRef, useEffect } from 'react'
// const { Observable } = require('rxjs');
//
// range(1, 4)
//     .pipe(
//         filter(x => x % 2 === 1),
//         map(x => x + x)
//     )
//     .subscribe(x => console.log(x));
const TestA: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>()
  useEffect(() => {
    // const source = interval(1000);
    // const clicks = fromEvent(document, 'click');
    // const result = source.pipe(takeUntil(clicks));
    // result.subscribe(x => console.log(x));

    // const clicksInDocument = fromEvent(document.body, 'click', false); // note optional configuration parameter
    // which will be passed to addEventListener
    // console.log(ref.current!)
    // const clicksInDiv = fromEvent(ref.current!, 'click');

    const mouseDown = fromEvent(ref.current!, 'mousedown')
    const mouseUp = fromEvent(document.body, 'mouseup')
    const mouseMove = fromEvent(document.body, 'mousemove')

    // mouseDown.pipe(
    //     mergeMap((event: any) => mouseMove.takeUntil(mouseUp)))
    //     .map((event: { clientX: any; clientY: any; }) => ({ x: event.clientX, y: event.clientY }))
    //     .subscribe((pos: { x: string; y: string; }) => {
    //         ref.current!.style.left = pos.x + 'px';
    //         ref.current!.style.top = pos.y + 'px';
    //     })
    //
    // clicksInDocument.subscribe(() => console.log('document'));
    // clicksInDiv.subscribe(() => console.log('div'));
  }, [])
  return <div ref={(element) => (ref.current = element)}>123123123</div>
}
// @ts-ignore
export default TestA

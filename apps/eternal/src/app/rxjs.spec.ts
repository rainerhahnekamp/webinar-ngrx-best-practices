import { marbles } from 'rxjs-marbles/jest';
import { delay, map, tap } from 'rxjs/operators';

describe('Marble Tests', () => {
  it(
    'should test marbles',
    marbles((m) => {
      const source$ = m.cold('1s a 1s b', { a: 1, b: 2 });

      function longRunningFunction() {}

      const destination$ = source$.pipe(
        map((n) => n * 10),
        delay(500)
      );

      m.expect(destination$).toBeObservable('1500ms x 1s y', { x: 10, y: 20 });
    })
  );
});

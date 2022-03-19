import { fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { asyncScheduler, Observable, of, scheduled } from 'rxjs';

class Incrementer {
  number = 0;

  increment() {
    window.setTimeout(() => this.number++, 1);
    window.setTimeout(() => this.number++, 10);
    window.setTimeout(() => this.number++, 100);
  }
}

describe('Asynchronous Tasks', () => {
  it('should not work', () => {
    let a = 1;
    window.setTimeout(() => {
      a = a + 1;
      expect(a).toBe(2);
    });
  });

  it('should use a Promise', () => {
    let a = 1;
    Promise.resolve().then(() => {
      a = a + 1;
      expect(a).toBe(2);
    });
  });

  it('should test with done', (done) => {
    let a = 1;
    Promise.resolve()
      .then(() => {
        a++;
        expect(a).toBe(2);
      })
      .then(done, done);
  });

  it(
    'should use waitForAsync',
    waitForAsync(() => {
      let a = 1;
      Promise.resolve().then(() => {
        a = a + 1;
        expect(a).toBe(2);
      });
    })
  );

  it('should use Incrementer with fakeAsync', fakeAsync(() => {
    const incrementer = new Incrementer();
    incrementer.increment();
    tick(1);
    expect(incrementer.number).toBe(1);

    tick(9);
    expect(incrementer.number).toBe(2);

    tick(90);
    expect(incrementer.number).toBe(3);
  }));

  it('should use Incrementer with fakeAsync with flush', fakeAsync(() => {
    const incrementer = new Incrementer();
    incrementer.increment();

    flush();
    expect(incrementer.number).toBe(3);
  }));

  it('should use an Observable', fakeAsync(() => {
    let a = 1;
    const n$ = of(1);
    n$.subscribe((n) => {
      a = a + n;
    });
    tick();
    expect(a).toBe(2);
  }));

  it('should use an Observable', (done) => {
    let a = 1;
    const n$ = of(1);
    n$.subscribe((n) => {
      a = a + n;
      expect(a).toBe(1);
    });
    done();
  });
});

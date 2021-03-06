import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.start();

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.loadingService.stop();
        }
      }),
      catchError((err) => {
        this.loadingService.stop();
        return throwError(() => err);
      })
    );
  }
}

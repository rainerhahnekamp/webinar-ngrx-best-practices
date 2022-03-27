import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@eternal/customer/model';
import { Configuration } from '@eternal/shared/config';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { customers as originalCustomers } from './data';

@Injectable()
export class CustomerInterceptor implements HttpInterceptor {
  private customers: Customer[] = originalCustomers.sort(this.#customerSortFn);
  private pageSize = 10;

  constructor(private configuration: Configuration) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(`${this.configuration.baseUrl}/customer`)) {
      switch (req.method) {
        case 'GET':
          return this.#toHttpResponse(
            this.#get(req.url, { params: req.params })
          );
        case 'POST':
          return this.#post(req.url, req.body as Customer);
        case 'DELETE':
          return this.#toHttpResponse(this.#delete(req.url));
        case 'PUT':
          return this.#put(req.url, req.body as Customer);
      }
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }

  #toHttpResponse(data$: Observable<unknown>) {
    return data$.pipe(map((data) => new HttpResponse({ body: data })));
  }

  #get(
    url: string,
    options: { params: HttpParams }
  ): Observable<HttpResponse<Customer[]>> {
    if (!options.params.has('page')) {
      return of({ content: this.customers }).pipe(this.#logRequest('GET', url));
    } else {
      return this.#sortCustomers(Number(options.params.get('page'))).pipe(
        this.#logRequest('GET', url)
      );
    }
  }

  #post(url: string, customer: Customer): Observable<HttpResponse<unknown>> {
    const nextId = this.#getNextId();
    this.customers.push({ ...customer, id: nextId });
    return this.#toHttpResponse(
      this.#sortCustomers(1).pipe(
        map((customers) => ({ customers, id: nextId })),
        this.#logRequest('POST', url, customer)
      )
    );
  }

  #put(url: string, customer: Customer): Observable<HttpResponse<unknown>> {
    return this.#toHttpResponse(
      of(true).pipe(
        map(() => {
          if (customer.name === 'asdf') {
            throw new HttpErrorResponse({
              status: 400,
              error: 'no dummy names please',
            });
          } else {
            this.customers = this.customers.map((c) =>
              c.id === customer.id ? customer : c
            );
            return customer;
          }
        })
      )
    );
  }

  #delete(url: string): Observable<Customer[]> {
    const matches = url.match(/(\d+)$/);
    if (!matches) {
      throw new Error('invalid url for deletion');
    }

    const id = Number(matches[0]);
    this.customers = this.customers.filter((customer) => customer.id !== id);
    return this.#sortCustomers(1).pipe(this.#logRequest('DELETE', url));
  }

  #getNextId() {
    return Math.max(...this.customers.map((customer) => customer.id)) + 1;
  }

  #sortCustomers(
    page: number
  ): Observable<{ content: Customer[]; totalPages: number }> {
    const end = (page + 1) * this.pageSize;
    const start = end - this.pageSize;
    return of({
      content: this.customers.slice(start, end),
      totalPages: Math.ceil(this.customers.length / this.pageSize),
    });
  }

  #logRequest(httpMethod: string, url: string, body?: any) {
    return (observable: Observable<any>) =>
      observable.pipe(
        delay(Math.random() * 1000),
        tap((response) => {
          console.group('Mocked Http Client');
          console.log(`${httpMethod}: ${url}`);
          if (body) {
            console.log(`Body: ${JSON.stringify(body)}`);
          }
          console.log(response);
          console.groupEnd();
        })
      );
  }

  #customerSortFn(customer1: Customer, customer2: Customer): number {
    return customer1.name > customer2.name ? 1 : -1;
  }
}

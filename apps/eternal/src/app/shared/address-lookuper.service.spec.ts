import { HttpClient, HttpParams } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { createSpyFromClass } from 'jest-auto-spies';
import { asyncScheduler, firstValueFrom, of, scheduled } from 'rxjs';
import { AddressLookuper } from './address-lookuper.service';
import { assertType } from './assert-type';

describe('Address Lookuper', () => {
  it.each([
    { response: [true, 1, ''], expected: true },
    { response: [true], expected: true },
    { response: [], expected: false }
  ])(`should return $expected for $response`, async ({ response, expected }) => {
    const httpClientStub = assertType<HttpClient>({
      get: () => scheduled([response], asyncScheduler)
    });

    const lookuper = new AddressLookuper(httpClientStub);

    expect(await firstValueFrom(lookuper.lookup('Domgasse 5'))).toBe(expected);
  });

  it('should use the http Client with the right parameters', fakeAsync(() => {
    // const httpClientMock = assertType<HttpClient>({
    //   get: jest.fn(() => of([]))
    // });

    const httpClientMock = createSpyFromClass(HttpClient);
    httpClientMock.get.mockReturnValue(of([]));
    const lookuper = new AddressLookuper(httpClientMock);

    lookuper.lookup('Domgasse 5');

    expect(httpClientMock.get).toHaveBeenCalledWith(
      'https://nominatim.openstreetmap.org/search.php',
      { params: new HttpParams().set('format', 'jsonv2').set('q', 'Domgasse 5') }
    );
  }));

  it('should throw an error if no street number is given', () => {
    const lookuper = new AddressLookuper(assertType<HttpClient>());

    expect(() => lookuper.lookup('Domgasse')).toThrowError(
      'Could not parse address. Invalid format.'
    );
  });
});

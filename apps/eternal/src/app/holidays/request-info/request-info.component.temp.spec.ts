import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { asapScheduler, asyncScheduler, Observable, scheduled } from 'rxjs';
import { AddressLookuper } from '../../shared/address-lookuper.service';
import { RequestInfoComponent } from './request-info.component';
import { RequestInfoComponentModule } from './request-info.component.module';

describe.skip('RequestInfo Component Temporary', () => {
  let lookupMock = jest.fn<Observable<boolean>, [string]>();
  let fixture: ComponentFixture<RequestInfoComponent>;
  let component: RequestInfoComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RequestInfoComponentModule],
      providers: [{ provide: AddressLookuper, useValue: { lookup: lookupMock } }]
    }).createComponent(RequestInfoComponent);
    lookupMock.mockReset();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check the title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    expect(title.textContent).toBe('Request More Information');

    fixture.componentInstance.title = 'Test Title';
    fixture.detectChanges();

    expect(title.textContent).toBe('Test Title');
  });

  it('should check input fields have right values', () => {
    component.formGroup.patchValue({
      address: 'Hauptstraße 5'
    });
    const address = fixture.debugElement.query(By.css('[data-testid=address]'))
      .nativeElement as HTMLInputElement;

    expect(address.value).toBe('Hauptstraße 5');
  });

  it('should fail on no input', fakeAsync(() => {
    expect.hasAssertions();
    lookupMock.mockReturnValue(scheduled([false], asyncScheduler));

    fixture.componentInstance.search();
    tick();
    fixture.detectChanges();
    const lookupResult = fixture.debugElement.query(By.css('[data-testid=lookup-result]'))
      .nativeElement as HTMLElement;

    expect(lookupResult.textContent).toBe('Address not found');
  }));

  it('should trigger lookup on click', fakeAsync(() => {
    lookupMock.mockReturnValue(scheduled([false], asapScheduler));
    const button = fixture.debugElement.query(By.css('[data-testid=btn-search]'))
      .nativeElement as HTMLElement;
    button.click();
    tick();

    expect(lookupMock).toHaveBeenCalled();
  }));

  it('should check the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});

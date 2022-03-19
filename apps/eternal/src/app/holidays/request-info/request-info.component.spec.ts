import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { fakeAsync, TestBed, TestModuleMetadata, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { AddressLookuper } from '../../shared/address-lookuper.service';
import { assertType } from '../../shared/assert-type';
import { RequestInfoComponent } from './request-info.component';
import { RequestInfoComponentHarness } from './request-info.component.harness';
import { RequestInfoComponentModule } from './request-info.component.module';

describe('Request Info Component', () => {
  const setup = (config: TestModuleMetadata = {}) => {
    const lookupMock = jest.fn<Observable<boolean>, [string]>();
    const defaultConfig: TestModuleMetadata = {
      imports: [NoopAnimationsModule, RequestInfoComponentModule],
      providers: [
        {
          provide: AddressLookuper,
          useValue: { lookup: lookupMock }
        }
      ]
    };
    const fixture = TestBed.configureTestingModule({ ...defaultConfig, ...config }).createComponent(
      RequestInfoComponent
    );
    lookupMock.mockReset();

    return { fixture, lookupMock };
  };

  it('should find an address with the harness', async () => {
    const { fixture, lookupMock } = setup();
    lookupMock.mockImplementation((query) => scheduled([query === 'Domgasse 5'], asyncScheduler));

    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      RequestInfoComponentHarness
    );

    await harness.writeAddress('Domgasse 15');
    await harness.search();
    expect(await harness.getResult()).toBe('Address not found');

    await harness.writeAddress('Domgasse 5');
    await harness.search();
    expect(await harness.getResult()).toBe('Brochure sent');
  });

  it.skip('should find an address', fakeAsync(() => {
    const lookuper = {
      lookup: (query: string) => scheduled([query === 'Domgasse 5'], asyncScheduler)
    };
    const fixture = TestBed.configureTestingModule({
      imports: [RequestInfoComponentModule],
      providers: [{ provide: AddressLookuper, useValue: lookuper }]
    }).createComponent(RequestInfoComponent);
    const input = fixture.debugElement.query(By.css('[data-testid=address]'))
      .nativeElement as HTMLInputElement;
    const button = fixture.debugElement.query(By.css('[data-testid=btn-search]'))
      .nativeElement as HTMLButtonElement;

    fixture.detectChanges();
    input.value = 'Domgasse 15';
    input.dispatchEvent(new Event('input'));
    button.click();
    tick();
    fixture.detectChanges();
    const lookupResult = fixture.debugElement.query(By.css('[data-testid=lookup-result]'))
      .nativeElement as HTMLElement;

    expect(lookupResult.textContent).toContain('Address not found');

    input.value = 'Domgasse 5';
    input.dispatchEvent(new Event('input'));
    button.click();
    tick();
    fixture.detectChanges();

    expect(lookupResult.textContent).toContain('Brochure sent');
  }));
});

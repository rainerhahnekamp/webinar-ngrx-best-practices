import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createSpyFromClass } from 'jest-auto-spies';
import { asyncScheduler, scheduled } from 'rxjs';

import { NewsletterComponent } from './newsletter.component';
import { NewsletterService } from './newsletter.service';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;

  describe('without DOM Interaction', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NewsletterComponent],
        imports: [ReactiveFormsModule],
        providers: [{ provide: NewsletterService, useValue: createSpyFromClass(NewsletterService) }]
      });
      fixture = TestBed.createComponent(NewsletterComponent);
      component = fixture.componentInstance;
    });

    it('should subscribe without DOM interaction', () => {
      component.formGroup.setValue({ email: 'user@host.com' });
      component.handleSubmit();
      expect(component.message).toBe('Thank you for your subscription');
    });

    it('should not subscribe without DOM interaction', () => {
      component.handleSubmit();
      expect(component.message).toBe('Please provide an email');
    });

    it('should subscribe in mixed mode', () => {
      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      input.value = 'user@host.com';
      input.dispatchEvent(new CustomEvent('input'));

      component.handleSubmit();
      fixture.detectChanges();
      const messageBox = fixture.debugElement.query(By.css('p'))
        .nativeElement as HTMLParagraphElement;
      expect(messageBox.textContent).toBe('Thank you for your subscription');
    });
  });

  describe('with DOM interaction', function () {
    const setup = (automaticCD: boolean = true, detectChanges: boolean = true) => {
      const newsletterServiceMock = createSpyFromClass(NewsletterService);
      TestBed.configureTestingModule({
        declarations: [NewsletterComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: automaticCD },
          { provide: NewsletterService, useValue: newsletterServiceMock }
        ]
      });
      fixture = TestBed.createComponent(NewsletterComponent);
      component = fixture.componentInstance;
      if (detectChanges) {
        fixture.detectChanges();
      }

      return { fixture, newsletterServiceMock };
    };

    it('should create', () => {
      setup();
      expect(component).toBeTruthy();
    });

    it('should not subscribe with DOM interaction', () => {
      setup();
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      const messageBox = fixture.debugElement.query(By.css('p'))
        .nativeElement as HTMLParagraphElement;
      expect(messageBox.textContent).toBe('Please provide an email');
    });

    it('should subscribe with DOM interaction', fakeAsync(() => {
      const { newsletterServiceMock } = setup();

      newsletterServiceMock.register.mockReturnValue(scheduled([true], asyncScheduler));
      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      input.value = 'user@host.com';
      input.dispatchEvent(new CustomEvent('input'));

      fixture.debugElement.query(By.css('button')).nativeElement.click();
      tick();
      const messageBox = fixture.debugElement.query(By.css('p'))
        .nativeElement as HTMLParagraphElement;
      expect(messageBox.textContent).toBe('Thank you for your subscription');
    }));
  });
});

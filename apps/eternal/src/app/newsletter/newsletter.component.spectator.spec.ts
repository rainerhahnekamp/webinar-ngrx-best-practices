import { fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { asyncScheduler, scheduled } from 'rxjs';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterService } from './newsletter.service';

describe('Newsletter with Spectator', () => {
  const selectMsg = byTestId('message');
  const selectSubmit = byTestId('btn-submit');
  const selectInput = byTestId('inp-email');

  const createComponent = createComponentFactory({
    component: NewsletterComponent,
    imports: [ReactiveFormsModule],
    mocks: [NewsletterService]
  });

  const setup = () => {
    const spectator = createComponent();
    return { spectator, newsletterService: spectator.inject(NewsletterService) };
  };

  it('should instantiate', () => {
    const { spectator } = setup();
    expect(spectator.component).toBeInstanceOf(NewsletterComponent);
  });

  it('should do a failed subscription', () => {
    const { spectator, newsletterService } = setup();

    spectator.click(selectSubmit);

    expect(spectator.query(selectMsg)).toHaveText('Please provide an email');
  });

  it('should do a successful subscription', fakeAsync(() => {
    const { spectator, newsletterService } = setup();
    newsletterService.register.mockReturnValue(scheduled([true], asyncScheduler));

    spectator.typeInElement('user@host.com', selectInput);
    spectator.click(selectSubmit);
    spectator.tick();
    expect(spectator.query(byTestId('message'))).toHaveText('Thank you for your subscription');
  }));
});

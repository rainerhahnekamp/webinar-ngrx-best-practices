import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createSpyFromClass } from 'jest-auto-spies';
import { asyncScheduler, scheduled } from 'rxjs';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterService } from './newsletter.service';

describe('Newsletter Component with Testing Library', () => {
  const setup = async () => {
    const renderResult = await render(NewsletterComponent, {
      imports: [ReactiveFormsModule],
      providers: [{ provide: NewsletterService, useValue: createSpyFromClass(NewsletterService) }]
    });

    return { ...renderResult };
  };

  it('should instantiate', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should provide a visualisation of the component for better analysis', async () => {
    const { debug } = await setup();
    debug();
  });

  it('should do a failed subscription', async () => {
    await setup();
    userEvent.click(screen.getByTestId('btn-submit'));
    await screen.findByText('Please provide an email');
  });

  it('should do a successful subscription', async () => {
    await setup();
    const newsletterService = TestBed.inject(NewsletterService);
    jest.spyOn(newsletterService, 'register').mockReturnValue(scheduled([true], asyncScheduler));

    userEvent.type(screen.getByTestId('inp-email'), 'user@host.com');
    userEvent.click(screen.getByTestId('btn-submit'));

    await screen.findByText('Thank you for your subscription');
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SecurityEffects } from './security.effects';
import { securityFeature } from './security.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(securityFeature),
    EffectsModule.forFeature([SecurityEffects]),
    CommonModule,
  ],
})
export class SecurityModule {}

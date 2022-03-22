import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { masterFeature } from './+state/master.reducer';

@NgModule({
  imports: [StoreModule.forFeature(masterFeature)],
})
export class SharedMasterDataModule {}

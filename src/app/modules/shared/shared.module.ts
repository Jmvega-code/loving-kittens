import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerDetailsCardComponent } from 'src/app/components/owner-details-card/owner-details-card.component';
import { OwnerListItemComponent } from 'src/app/components/owner-list-item/owner-list-item.component';


@NgModule({
  declarations: [
    OwnerListItemComponent,
    OwnerDetailsCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OwnerListItemComponent,
    OwnerDetailsCardComponent
  ],
})
export class SharedModule { }

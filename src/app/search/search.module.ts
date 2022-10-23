import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { OwnerListItemComponent } from '../components/owner-list-item/owner-list-item.component';
import { OwnerDetailsCardComponent } from '../components/owner-details-card/owner-details-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  declarations: [
    SearchPage,
    OwnerListItemComponent,
    OwnerDetailsCardComponent
  ]
})
export class SearchPageModule {}

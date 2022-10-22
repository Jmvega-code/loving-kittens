import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPageRoutingModule } from './owners-routing.module';

import { OwnersPage } from './owners.page';
import { OwnerListItemComponent } from '../components/owner-list-item/owner-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPageRoutingModule
  ],
  declarations: [
    OwnersPage,
    OwnerListItemComponent
  ]
})
export class OwnersPageModule {}

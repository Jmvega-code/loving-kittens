import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPageRoutingModule } from './owners-routing.module';

import { OwnersPage } from './owners.page';

import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPageRoutingModule,
    SharedModule
  ],
  declarations: [
    OwnersPage,
  ]
})
export class OwnersPageModule {}

import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Owner } from './owner.model';

// const getEmptyFavoriteOwner = (): Owner => {
//   return {
//     id: null,
//     name: null,
//     email: null,
//     gender: null,
//     status: null
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  private _owners = new BehaviorSubject<Owner[]>([]);
  private _favoriteOwners = new BehaviorSubject<Owner[]>([]);
  favoriteOwner =  new BehaviorSubject<Owner>(null)
  favoriteOwners: Owner[] = []

  constructor(private apiService: ApiService, private alertController: AlertController) {}

  fetchOwners() {
    return this.apiService.get('users').pipe(
      map((resData) => {
        const owners = [];
        for (let item in resData) {
          owners.push(
            new Owner(
              resData[item].id,
              resData[item].name,
              resData[item].email,
              resData[item].gender,
              resData[item].status,
              false
            )
          );
        }
        return owners;
      }),
      tap((owners) => {
        this._owners.next(owners);
      })
    );
  }

  get owners() {
    return this._owners.asObservable();
  }

  setClickedOwnerForDetails(id: number) {
    // Todo hacer una llamada nueva a la API de update del usuario
    return this.owners.pipe(
      map((owners) => {
        return this.favoriteOwner.next({ ...owners.find((o) => o.id === id) })

      })
    );
  }

  addFavoriteOwner(owner) {
    console.log('this.favoriteOwners',this.favoriteOwners)
    if(this.favoriteOwners.find((o) => o.id === owner.id)) {
      this.presentAlert()
    } else {
      this.favoriteOwners.push(
        new Owner(owner.id, owner.name, owner.email, owner.gender, owner.status, true)
      );
      console.log('fav arrary', this.favoriteOwners)
      this._favoriteOwners.next(this.favoriteOwners)
    }
  }

  get selectedFavoriteOwner() {
    return this.favoriteOwner.asObservable()
  }

  get favoriteOwnersList() {
    return this._favoriteOwners.asObservable()
  }


  async presentAlert() {
    const alert = await this.alertController.create({
    message: 'This owner is already in your list. Please, select a different owner.',
    subHeader: 'Oops!',
    buttons: ['Dismiss']
   });
   await alert.present();
}

}

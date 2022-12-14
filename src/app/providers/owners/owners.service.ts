import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Owner } from './owner.model';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  private _owners = new BehaviorSubject<Owner[]>([]);
  private _favoriteOwners = new BehaviorSubject<Owner[]>([]);
  favoriteOwner = new BehaviorSubject<Owner>(null);
  killedCatsCount = new BehaviorSubject<number>(0);
  favoriteOwners: Owner[] = [];
  fetchedowners: Owner[] = [];
  searchResults: Owner[] = [];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  fetchOwners(mod?: string, page?: number, numItems?: number, reset?: boolean) {
    if (reset) {
      this.fetchedowners = []
    }
    return this.apiService.get(mod, page, numItems).pipe(
      map((resData) => {
        let counterVal = this.killedCatsCount.value;
        this.killedCatsCount.next(counterVal + 1);
        for (let item in resData) {
          this.fetchedowners.push(
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
        return this.fetchedowners;
      }),
      tap((owners) => {
        this._owners.next(owners);
      })
    );
  }


  get owners() {
    return this._owners.asObservable();
  }

  setClickedOwnerForDetails(owner?: Owner, id?: number) {
    if(id) {
      return this.apiService.get(`users/${id}`).pipe(
        map((resData: Owner) => {
          let counterVal = this.killedCatsCount.value;
          this.killedCatsCount.next(counterVal + 1);
          this.favoriteOwner.next(
            new Owner(
              resData.id,
              resData.name,
              resData.email,
              resData.gender,
              resData.status,
              false
            )
          );
          if (this.favoriteOwners.find((o) => o.id === resData.id)) {
            this.favoriteOwner.next(
              new Owner(
                resData.id,
                resData.name,
                resData.email,
                resData.gender,
                resData.status,
                true
              )
            );
          }
        })
      );
    } else {
      this.favoriteOwner.next(owner)
      if (this.favoriteOwners.find((o) => o.id === owner.id)) {
        this.favoriteOwner.next(
          new Owner(
            owner.id,
            owner.name,
            owner.email,
            owner.gender,
            owner.status,
            true
          )
        );
      }
    }

  }

  addFavoriteOwner(owner) {
    if (this.favoriteOwners.find((o) => o.id === owner.id)) {
      this.presentAlert();
    } else {
      this.favoriteOwners.push(
        new Owner(
          owner.id,
          owner.name,
          owner.email,
          owner.gender,
          owner.status,
          true
        )
      );
      this._favoriteOwners.next(this.favoriteOwners);
    }
  }

  get selectedFavoriteOwner() {
    return this.favoriteOwner.asObservable();
  }

  get favoriteOwnersList() {
    return this._favoriteOwners.asObservable();
  }

  get deadCats() {
    return this.killedCatsCount.asObservable();
  }

  deleteFavoriteOwner(ownerId) {
    return this._favoriteOwners.pipe(
      tap((owners) => {
        this._favoriteOwners.next(owners.filter((i) => i.id !== ownerId));
      })
    );
  }

  searchOwner(results: Owner[]) {
    this.searchResults = []
    for (let item in results) {
      this.searchResults.push(
        new Owner(
          results[item].id,
          results[item].name,
          results[item].email,
          results[item].gender,
          results[item].status,
          false
        )
      );
    }
    return this._owners.next(this.searchResults);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message:
        'This owner is already in your list. Please, select a different owner.',
      subHeader: 'Oops!',
      buttons: ['Dismiss'],
    });
    await alert.present();
  }
}

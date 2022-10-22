import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Owner } from 'src/app/interfaces/owner'

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  private _owners = new BehaviorSubject<Owner[]>([]);

  constructor(private apiService: ApiService) { }

  fetchOwners() {
    return this.apiService.get('users')
    .pipe(
      tap((owners: Owner) => {
        console.log('fetchOwners', owners)
      })
    )
  }

}

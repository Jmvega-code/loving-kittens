import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/providers/owners/owner.model';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  loadedOwners: Owner[] = [];
  numPage: number = 1;
  public results = [...this.loadedOwners]
  ownersSub: Subscription

  constructor(
    private ownersService: OwnersService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadingController
      .create({
        message: 'Loading owners...',
        spinner: 'crescent',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.ownersSub = this.ownersService.fetchOwners('users').subscribe((data) => {
          loadingEl.dismiss();
          this.loadedOwners = data;
        }, error => {
          console.log(error);
        });
      });
  }

  loadData(event) {
    this.numPage++;
    this.ownersService.fetchOwners('users', this.numPage, 10).subscribe(
      (data) => {
        console.log(data);
        if (data.length === 0) {
          event.target.disabled = true;
        }
        event.target.complete();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearchChange(event) {
    const query: string = event.detail.value.toLowerCase();
    if (query.length > 1) {
      this.loadingController
        .create({
          message: 'Searching...',
          spinner: 'crescent',
        })
        .then((loadingEl) => {
          loadingEl.present();
          this.results = this.loadedOwners.filter(d => d.name.toLowerCase().indexOf(query) > -1)
          console.log(this.results)
          this.ownersService.searchOwner(this.results)
          loadingEl.dismiss();
        });
    } else {
      this.ownersService.fetchOwners('users',1,20, true).subscribe((data) => {
        this.loadedOwners = data;
      }, error => {
        console.log(error);
      });
    }
  }
}

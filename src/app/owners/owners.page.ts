import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/providers/owners/owner.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {
  loadedOwners: Owner[] = [];
  numPage: number = 1;

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
        this.ownersService.fetchOwners('users').subscribe((data) => {
          loadingEl.dismiss();
          this.loadedOwners = data;
        });
      });
  }

  loadData(event) {
    this.numPage++;
    this.ownersService.fetchOwners('users', this.numPage, 10).subscribe(
      (data) => {
        console.log(data);
        if (data.length === 0) {
          // Si ya no existen registros, cancelamos el scroll infinito.
          event.target.disabled = true;
        }
        // Completamos el evento.
        event.target.complete();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

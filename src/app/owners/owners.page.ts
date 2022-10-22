import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/interfaces/owner'

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {
  loadedOwners: Owner[] = []

  constructor(
    private ownersService: OwnersService
  ) { }

  ngOnInit() {
    this.ownersService.fetchOwners().subscribe((data) => {
      console.log(data)
    })
  }

}

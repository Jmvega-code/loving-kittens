import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}

  onClickOwners() {
    console.log('owners')
    this.router.navigateByUrl('/owners')
  }

  onClickSearch() {
    console.log('search')
    this.router.navigateByUrl('/search')
  }

}

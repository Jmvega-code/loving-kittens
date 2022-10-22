import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'https://gorest.co.in/public/v2/';
  accessToken: string = '6db8be399fc4384d42d9e56b3efebab72ef308f6c7d94c7b0f397d4682069676'


  constructor(
    public http: HttpClient
  ) { }


  get(module: string) {
    return this.http.get(`${this.url}${module}?access-token=${this.accessToken}`);
  }

}

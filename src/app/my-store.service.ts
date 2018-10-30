import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyStoreService {
  constructor() { }

  get data(): Array<string> {
    return ['Kaka', 'Banan', 'Bulle'];
  }
}

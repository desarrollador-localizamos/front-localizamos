import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurgerMenuService {

  private menuStateSubject = new BehaviorSubject<boolean>(false);
  menuState$ = this.menuStateSubject.asObservable();

  constructor() { }


  toggleMenu(state: boolean) {
    this.menuStateSubject.next(state);
  }
}

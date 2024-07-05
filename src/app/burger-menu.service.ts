import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurgerMenuService {

  private menuStateSubject = new BehaviorSubject<boolean>(false);
  menuState$ = this.menuStateSubject.asObservable();

  private selectedLinkSource = new BehaviorSubject<string>(''); 
  selectedLink$ = this.selectedLinkSource.asObservable();


  constructor() { }


  toggleMenu(state: boolean) {
    this.menuStateSubject.next(state);
  }

  setSelectedLink(link: string) {
    this.selectedLinkSource.next(link);
  }
}

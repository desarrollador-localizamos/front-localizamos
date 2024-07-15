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

  // Nuevo BehaviorSubject para el evento del filtro
  private filterClickSubject = new BehaviorSubject<boolean>(false);
  filterClick$ = this.filterClickSubject.asObservable();

  constructor() { }

  toggleMenu(state: boolean) {
    this.menuStateSubject.next(state);
  }

  setSelectedLink(link: string) {
    this.selectedLinkSource.next(link);
  }

  // Método para emitir el evento del filtro con un booleano
  emitFilterClick(state: boolean) {
    this.filterClickSubject.next(state);
  }
}

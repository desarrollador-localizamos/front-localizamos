import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CustomersComponent } from "../../../../customers/customers.component";
import { BurgerMenuService } from '../../../../burger-menu.service';

@Component({
    selector: 'app-sidebar-component',
    standalone: true,
    templateUrl: './sidebar-component.component.html',
    styleUrl: './sidebar-component.component.scss',
    imports: [CustomersComponent]
})
export class SidebarComponentComponent {


  constructor(
    private burgerMenuService: BurgerMenuService, private renderer: Renderer2, private elementRef: ElementRef) { }

    arrowTransform: string = 'rotate(0deg)'; // Inicialmente, la flecha no está rotada

    toggleRotation() {
      this.arrowTransform = this.arrowTransform === 'rotate(-180deg)' ? 'rotate(0deg)' : 'rotate(-180deg)';
    }

    toggleMenu() {
      const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
      if(window.innerWidth <= 950){
        if (sidebar) {
          const iconOnly = sidebar.classList.contains('icon-only');
          this.burgerMenuService.toggleMenu(iconOnly);
        }
      }else{
        if (sidebar) {
          const iconOnly = sidebar.classList.contains('icon-only');
          this.burgerMenuService.toggleMenu(!iconOnly);
        }
      }
  }

  toggleSubMenu(event: Event) {
    const iconLink = event.currentTarget as HTMLElement;
    const subMenu = iconLink.nextElementSibling;
    const arrowIcon = iconLink.querySelector('i.arrow');
  
    // Cierra todos los submenús abiertos y elimina la clase 'active'
    const allSubMenus = Array.from(document.querySelectorAll('.sidebar .nav-links li .sub-menu')) as HTMLElement[];
    allSubMenus.forEach((menu: HTMLElement) => {
      if (menu !== subMenu) {
        this.renderer.removeClass(menu, 'active');
        const parentIconLink = menu.previousElementSibling as HTMLElement;
        this.renderer.removeClass(parentIconLink, 'active');
        const parentArrowIcon = parentIconLink.querySelector('i.arrow');
        if (parentArrowIcon) {
          this.renderer.removeClass(parentArrowIcon, 'active');
        }
      }
    });
  
    // Toggle del submenú actual
    if (subMenu) {
      const isActive = subMenu.classList.contains('active');
      if (isActive) {
        this.renderer.removeClass(subMenu, 'active');
        this.renderer.removeClass(iconLink, 'active');
        if (arrowIcon) {
          this.renderer.removeClass(arrowIcon, 'active');
        }
      } else {
        this.renderer.addClass(subMenu, 'active');
        this.renderer.addClass(iconLink, 'active');
        if (arrowIcon) {
          this.renderer.addClass(arrowIcon, 'active');
        }
      }
    }
  }
  

  
}

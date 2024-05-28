import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponentComponent } from "../header/header-component/header-component.component";
import { SidebarComponentComponent } from "../sidebar/sidebar-component/sidebar-component.component";
import { RouterOutlet } from '@angular/router';
import { BurgerMenuService } from '../../../burger-menu.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [RouterOutlet,HeaderComponentComponent, SidebarComponentComponent]
})
export class LayoutComponent {

  
    constructor(
        private burgerMenuService: BurgerMenuService,  private renderer: Renderer2, private elementRef: ElementRef) { }
    
        ngOnInit() {
          this.burgerMenuService.menuState$.subscribe(menuState => {
            const sidebar = this.elementRef.nativeElement.querySelector('.home-section');
            const home = this.elementRef.nativeElement.querySelector('.sidebar');
      
            if (menuState) {
              this.renderer.addClass(sidebar, 'icon-only');
              this.renderer.addClass(home, 'icon-only');

            }else{
              this.renderer.removeClass(sidebar, 'icon-only');
              this.renderer.removeClass(home, 'icon-only');
            }
        
            if (window.innerWidth <= 950) {
              if (!menuState) {
                this.renderer.addClass(sidebar, 'icon-only');
                this.renderer.addClass(home, 'icon-only');

              }else{
                this.renderer.removeClass(sidebar, 'icon-only');
                this.renderer.removeClass(home, 'icon-only');
              }
            }
          
          
          });
        }
        
        
       
}

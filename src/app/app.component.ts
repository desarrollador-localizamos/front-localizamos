import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponentComponent } from "./shared/components/sidebar/sidebar-component/sidebar-component.component";
import { HeaderComponentComponent } from "./shared/components/header/header-component/header-component.component";
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SidebarComponentComponent, HeaderComponentComponent]
})
export class AppComponent {
  title = 'frontLocalizamos';


 
}

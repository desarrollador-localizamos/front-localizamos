import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-registros',
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  templateUrl: './sidebar-registros.component.html',
  styleUrls: ['./sidebar-registros.component.scss']
})
export class SidebarRegistrosComponent {
  @Input() visible: boolean = false;
  @Input() position: string = "left";
  @Output() visibleChange = new EventEmitter<boolean>();

  toggleSidebar() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}

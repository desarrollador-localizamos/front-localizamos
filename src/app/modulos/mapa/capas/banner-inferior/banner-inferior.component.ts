import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-banner-inferior',
  standalone: true,
  imports: [DividerModule, CommonModule,TagModule],
  templateUrl: './banner-inferior.component.html',
  styleUrls: ['./banner-inferior.component.scss'],
})
export class BannerInferiorComponent implements OnInit {
  isPanelVisible: boolean = true;
  responseData: any;
  responseDataEventos: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getResponse().subscribe((data) => {
      if (data && data.body && data.body.length > 0) {
          this.responseData = data.body[0][0];
      }
    });


    this.dataService.getResponseUltimosEventos().subscribe((data) => {
      if (data && data.body && data.body.length > 0) {
          this.responseDataEventos = data.body;
          console.log("datos",this.responseDataEventos);
          
      }
    });
  }

  togglePanel() {
    this.isPanelVisible = !this.isPanelVisible;

    const panel = this.el.nativeElement.querySelector('.side-panel');
    const button = this.el.nativeElement.querySelector('.toggle-panel-btn');

    if (this.isPanelVisible) {
      this.renderer.removeClass(panel, 'cierre');
      this.renderer.removeClass(button, 'cierre');
    } else {
      this.renderer.addClass(panel, 'cierre');
      this.renderer.addClass(button, 'cierre');
    }
    console.log('Toggle panel state:', this.isPanelVisible);
  }




}

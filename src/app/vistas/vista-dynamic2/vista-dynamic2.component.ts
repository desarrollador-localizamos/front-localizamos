import { Component, OnInit } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EstructuraData } from '../../core/interfaces/estructura-data';
import { TableSubTableComponent } from "../../shared/components/tables/table-sub-table/table-sub-table.component";

@Component({
    selector: 'app-vista-dynamic2',
    standalone: true,
    templateUrl: './vista-dynamic2.component.html',
    styleUrl: './vista-dynamic2.component.scss',
    imports: [TableSubTableComponent]
})
export class VistaDynamic2Component implements OnInit{

  private readonly baseUrl: string = environments.baseUrl;
  
  selectedLink: string = '';
  data: { header: any[], body: EstructuraData[] } = { header: [], body: [] };
  displayedColumns: string[] = [];
  routeSubscription!: Subscription;

 
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.selectedLink = params.get('page') ?? '';
      console.log('Selected Link:', this.selectedLink);
 
    });
  }

}

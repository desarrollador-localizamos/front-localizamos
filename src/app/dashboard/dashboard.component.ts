import { Component } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    public service: ApirestService) { }



    //Funcion para comprobar el metodo post

    obtenerLlaves()
    {
        
        let url = 'obtener-llaves';
        let driver_id = "3";
      
        let body = new FormData();
        body.append('Driver_id', driver_id);
          this.service.queryPost(url, body).subscribe(
            response=>
            {
                let result = response;
             
                console.log(result)
            },
            err => 
            {
                console.log(err);
            }
        );
    }
}

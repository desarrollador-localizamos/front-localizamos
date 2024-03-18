import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public user = {email: '', password: ''};
  public url = '';
  public errorMessage = "";
  public email = '';
   		
  public recoverData = new FormData();




  constructor(private router: Router,
    public service: ApirestService) { }


  ngOnInit(): void {
    if('null' != sessionStorage.getItem('sid') && null != sessionStorage.getItem('sid') && undefined != sessionStorage.getItem('sid'))
    {
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    
    let body = new FormData;

    body.append('email', this.user.email);
  	body.append('password', this.user.password);
    body.append('customer_id', '');
    
      console.log(this.user.email);
      console.log(this.user.password);
      

      this.service.queryPostRegular('login', body).subscribe(
        
        response=>{
          let result = response;   

          console.log(result);

                   
          if(result.success) 
          {
              let token = result.token ; 
              let characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
              let text = "";
              for (let i=0; i<4; i++) text +=characters.charAt(Math.floor(Math.random()*characters.length)); 
              token = 'ey'+text+token;
              sessionStorage.setItem('sid', token);
              localStorage.setItem('userid', result.user.id);
              //this.session.setUserSession(JSON.stringify(result.user));
              this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = result.message;
          }

        },
        err => 
        {
          console.log(err);
        }
        
      );
  }

  recover()
  	{ 
  		this.recoverData.append('email', this.user.email);

      console.log("email "+this.user.email);
      
      this.service.queryPost('recover-password', this.recoverData).subscribe(
        response=>
        {      
           console.log("hubo una repuesta");
            let result = response.json();                 
            if(result.success)
            {
                this.errorMessage = result.message;
                //Show success message

              

            }
            else
            {
                this.errorMessage = result.message;
              
            }
        },
        err => 
        {
            console.log(err);         
        }
    );


  	}

  showConfirmAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

 
  
}

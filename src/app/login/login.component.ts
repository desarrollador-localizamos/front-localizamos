import { CommonModule } from '@angular/common';
import { Component,OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApirestService } from '../apirest.service';
import { AuthService } from '../core/services/auth.service';
import {CarouselModule} from 'primeng/carousel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,CarouselModule,RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  private fb = inject (FormBuilder);
  private authService = inject(AuthService);
  private router = inject (Router);

  public user = {email: '', password: ''};
  public url = '';
  public errorMessage = "";
  public email = '';
   		
  public recoverData = new FormData();

  
  images: string[] = ['https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg',
  'https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg', 'https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg'];
  autoplayInterval = 2000;
  showNavigators = false;


  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })


  login() {
   

    const {email,password} = this.loginForm.value;
    this.authService.login(email,password)
      .subscribe({
          next: () => this.router.navigateByUrl('/dashboard'),
        error: (error) =>{
          console.log({LoginError: error});
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        }

      })
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








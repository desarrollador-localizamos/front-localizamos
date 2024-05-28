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
export class LoginComponent implements OnInit{

  private fb = inject (FormBuilder);
  private authService = inject(AuthService);

  public user = {email: '', password: ''};
  public url = '';
  public errorMessage = "";
  public email = '';
   		
  public recoverData = new FormData();

  
images: string[] = ['https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg',
'https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg', 'https://djwaiia8q94ix.cloudfront.net/04.139.00/images/logo/trakzee/image1.jpg'];
autoplayInterval = 2000;
showNavigators = false;

  constructor(private router: Router,
    public service: ApirestService) { }


  ngOnInit(): void {
    if('null' != sessionStorage.getItem('sid') && null != sessionStorage.getItem('sid') && undefined != sessionStorage.getItem('sid'))
    {
      this.router.navigate(['/dashboard']);
    }

  }

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })


  login() {
    console.log(this.loginForm.value);

    const {email,password} = this.loginForm.value;
    this.authService.login(email,password)
      .subscribe({
          next: () => 
          console.log('todo bien'),
        error: (error) =>{
          console.log({LoginError: error});
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








import { Component, ViewChild, ElementRef } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { DataSimpleService } from '../../core/services/datasimple.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


interface Data {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [ InputSwitchModule,InputTextModule,InputIconModule,IconFieldModule, ButtonModule,RippleModule,
    ImageCropperComponent,
    PasswordModule,
    DividerModule,
    FormsModule,],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  defaultImage = { url: 'default-user.png', alt: 'Foto de perfil' };
  image: { url: string; alt: string } = {
    url: 'default-user.png',
    alt: 'Foto de perfil',
  };
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl | string | null = null;
  imageToSend: any | null = null;
  formSubmitted = false;

  protected datos: Data[] = [];
  private res: any[] = [];
  protected result = { users: this.res };
  private cabeceras: any = {
    Entities: {},
    Fields: {},
    Relations: {},
    Joins: {},
    Multiconditions: {},
    Servicios: {},
  };

  constructor(
    private sanitizer: DomSanitizer,
    private dataService: DataSimpleService
  ) {}

  formData: any = {
    id: 0,
    name: 'Localizamos TSA',
    email: '',
    password: '',
    image: '',
    emailNotifications: 0,
    pushNotifications: 0,
  };

  ngOnInit() {
    console.log('Componente EditProfileComponent iniciado');

    // Definir las cabeceras
    this.cabeceras.Fields = {
      Users: [
        { campo: 'id', texto: 'id' },
        { campo: 'name', texto: 'Nombre' },
        { campo: 'email', texto: 'Correo' },
        { campo: 'password', texto: 'Contraseña' },
        { campo: 'image', texto: 'Imagen' },
        { campo: 'emailNotifications', texto: 'Notificaciones email' },
        { campo: 'pushNotifications', texto: 'Notificaciones push' },
      ],
    };

    this.cabeceras.Entities = {
      Users: 'Users',
    };

    this.cabeceras.Relations = {
      Users: [],
    };

    this.cabeceras.Joins = {
      Users: [],
    };

    this.cabeceras.Multiconditions = {};

    this.cabeceras.Servicios = {
      Users: 'visor',
    };

    // Enviar ID del usuario a consultar
    this.consultarUsuarioPorId(0);
  }

  // Consulta para traer datos
  protected consultarUsuarioPorId(id: number) {
    this.consultaback('Users', 'simple', 'name', 'id')
      .pipe(
        tap((response) => {
          // Filtra el resultado para obtener solo el usuario con el ID especificado
          const usuario = this.datos.find((user) => user.id === id);
          if (usuario) {
            console.log('Usuario encontrado:', usuario);
            // Actualizar formData con la información del usuario
            this.formData = {
              id: usuario.id,
              name: usuario.name,
              email: usuario.email,
              password: '', // Por seguridad, no traemos la contraseña
              image: usuario.image,
              emailNotifications: usuario.emailNotifications,
              pushNotifications: usuario.pushNotifications,
            };
            this.image = {
              url: usuario.image || this.defaultImage.url,
              alt: 'Foto de perfil',
            };
          } else {
            console.log('Usuario no encontrado');
          }
        }),
        catchError((error) => {
          console.error('Error al consultar usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  // Función para la consulta
  private consultaback(
    entidad: string,
    tipo: string,
    cabecera?: string,
    identif?: string,
    ordenar?: any
  ): Observable<any> {
    // console.log('servicio', this.cabeceras.Servicios);
    // console.log('entidad', entidad);
    let id = identif || 'id';
    return this.dataService
      .fetchData(
        this.cabeceras.Servicios[entidad],
        this.cabeceras.Entities[entidad],
        this.cabeceras.Fields[entidad],
        this.cabeceras.Relations[entidad],
        {},
        this.cabeceras.Joins[entidad],
        this.cabeceras.Multiconditions[entidad],
        ordenar
      )
      .pipe(
        tap((response) => {
          console.log('Usuarios en bd', response);
          switch (tipo) {
            case 'simple':
              this.datos = response.body.map((item: any) => ({
                id: item['id'],
                name: item['name'],
                email: item['email'],
                password: item['password'],
                image: item['image'],
                emailNotifications: item['emailNotifications'],
                pushNotifications: item['pushNotifications'],
              }));
              break;
          }
        }),
        catchError((error) => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  // Funciones para el funcionamiento de la imagen
  onUploadClick() {
    this.fileInput.nativeElement.click();
  }

  NameOfFile: string | undefined;

  fileChangeEvent(event: Event): void {
    console.log('evento', event);
    this.imageChangedEvent = event;
  }

  async imageCropped(event: ImageCroppedEvent) {
    // Extraer el nombre del archivo original
    if (this.imageChangedEvent && this.imageChangedEvent.target) {
      const file = (this.imageChangedEvent.target as HTMLInputElement)
        .files?.[0];
      if (file) {
        this.NameOfFile = file.name;
      }
    }

    console.log('Nombre del archivo:', this.NameOfFile);
    if (event.objectUrl) {
      // Para mostrar en el HTML
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );

      try {
        // Convertir objectUrl a Blob
        const response = await fetch(event.objectUrl);
        const blob = await response.blob();

        // Convertir Blob a File
        const fileName = String(this.NameOfFile); // Ajustar el nombre que viene por defecto del archivo
        this.imageToSend = new File([blob], fileName, { type: blob.type });

        console.log('Imagen para mostrar:', event.objectUrl);
        console.log(
          'Imagen para enviar:',
          this.imageToSend ? 'Disponible como File' : 'No disponible',
          this.imageToSend
        );
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
        this.imageToSend = null;
      }
    } else {
      this.croppedImage = null;
      this.imageToSend = null;
      console.log('No se pudo obtener la imagen recortada');
    }
  }

  // Función para eliminar la imagen
  onDeleteClick() {
    this.imageChangedEvent = null;
    this.image.url = this.defaultImage.url;
    this.croppedImage = null;
    this.imageToSend = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  // Función para actualizar datos
  onUpdate(profileForm: NgForm) {
    this.formSubmitted = true;
    if (profileForm.valid) {
      try {

        if (this.croppedImage) {
          const imageUrl = this.croppedImage.toString();
          this.image = { ...this.image, url: imageUrl };
          this.imageChangedEvent = null;
        }
        const formData = new FormData();
        formData.append('id', this.formData.id);
        formData.append('name', this.formData.name);
        formData.append('email', this.formData.email);
        formData.append('emailNotifications', this.formData.emailNotifications);
        formData.append('pushNotifications', this.formData.pushNotifications);

        if (this.imageToSend instanceof File) {
          formData.append('image', this.imageToSend, this.imageToSend.name);
        } else {
          formData.append('image', this.image.url);
        }

        console.log('Datos listos para enviar', formData);
        // this.updateProfile(formData);
      } catch (error) {
        console.error('Error al preparar datos para actualización:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }


}

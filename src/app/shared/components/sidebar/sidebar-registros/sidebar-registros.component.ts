import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { CONSTANS } from "../../../../core/constants/vista-dynamic-reporte/constantes";
import { DataSimpleService } from '../../../../core/services/datasimple.service';

/**
 * Esta interface representa la estructura de un campo en el formulario
 */
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'select';
  required?: boolean;
  entidad?: string;
  options?: any[];
  placeholder?: string;
}

@Component({
  selector: 'app-sidebar-registros',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar-registros.component.html',
  styleUrls: ['./sidebar-registros.component.scss']
})

export class SidebarRegistrosComponent implements OnChanges  {
  @Input() visible: boolean = false;
  @Input() position: string = "left";
  @Output() visibleChange = new EventEmitter<boolean>();

  /**
   * @param fields: Array de objetos FieldConfig que representan los campos del formulario
   * @param data: Objeto con la información inicial del formulario en caso de edición
   * @param formSubmit: Evento que se emite cuando se presiona el botón envio
   */
  @Input() fields: FieldConfig[] = [];
  @Input() data: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * Crea y configura el formulario con los campos recibidos
   */
  protected fb = inject(FormBuilder);
  protected form: FormGroup | undefined;
  
  private Fields = CONSTANS.Fields; //campos de entidadedes en consultas
  private Servicios: any= CONSTANS.Servicios;

  constructor(private dataService: DataSimpleService) { }

  ngOnInit() {    
    this.form = this.fb.group({});
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] || changes['data']) {
      this.createForm();
    }
  }

  toggleSidebar() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  /**
   * Crea el formulario con los campos recibidos y establece el valor inicial en caso de edición
   */
  private  createForm() {    
    const formGroup: { [key: string]: any } = {};
    this.fields.map(field => {
      formGroup[field.name] = ['', field.required ? Validators.required : null];
    });

    this.form = this.fb.group(formGroup);
    this.form.patchValue(this.data);
  }

  private fetchData(entidad:any) {    
    this.dataService.fetchData(this.Servicios[entidad], entidad, this.Fields[entidad], [] )
    .pipe(
      tap((response) => {
        console.log('datos', response);          
      }),
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(() => error)
      })
    ).subscribe();
    
  }

  /**
   * Esta función es llamada cuando se presiona el botón enviar en el formulario
   */
  onSubmit() {
    if (this.form && this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
  
}

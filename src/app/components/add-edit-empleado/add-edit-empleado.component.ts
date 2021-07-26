import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadosCiviles : any[] = ['Soltero','Casado', 'Divorciado', 'Unión Libre'];
  idEmpleado : any;
  accion = 'Agregar';

  empleadoForm : FormGroup;

  constructor(private fb: FormBuilder,
    private _empleadoService : EmpleadoService,
    private route : Router,
    private snackBar : MatSnackBar,
    private aRoute: ActivatedRoute

    ) { 
      this.empleadoForm = this.fb.group({
      nombreCompleto: ['',[ Validators.required, Validators.maxLength(20)]],
      correo: ['',[ Validators.required, Validators.email]],
      fechaIngreso: ['',[ Validators.required]],
      telefono: ['',[ Validators.required]],
      estadoCivil: ['',[ Validators.required]],
      sexo: [''],
    });

    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idEmpleado !== undefined){
      this.accion = 'Editar';
      this.esEditar(this.idEmpleado);
    }
  }

  guardarEmpleado() {
    const empleado: Empleado = {
      nombreCompleto: this.empleadoForm.get('nombreCompleto').value,
      correo: this.empleadoForm.get('correo').value,
      fechaIngreso: this.empleadoForm.get('fechaIngreso').value,
      telefono: this.empleadoForm.get('telefono').value,
      estadoCivil: this.empleadoForm.get('estadoCivil').value,
      sexo: this.empleadoForm.get('sexo').value,
    };

    if(this.idEmpleado !== undefined) {
      this.actualizarEmpleado(empleado);
    }else{
      this.agregarEmpleado(empleado);
    }    
  }

  actualizarEmpleado(empleado :  Empleado){
    this._empleadoService.actualizarEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('¡Empleado actualizado con éxito!','',{duration: 3000});
    this.route.navigate(['/']);
  }

  agregarEmpleado(empleado : Empleado){
    this._empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('¡Empleado registrado con éxito!','',{duration: 3000});
    this.route.navigate(['/']);
  }

  esEditar(id : any) {
    const empleado : Empleado = this._empleadoService.getEmpleadoById(id);
    this.empleadoForm.patchValue({
      nombreCompleto : empleado.nombreCompleto,
      correo : empleado.correo,
      fechaIngreso : empleado.fechaIngreso,
      telefono : empleado.telefono,
      estadoCivil : empleado.estadoCivil,
      sexo : empleado.sexo,

    })
  }

}

import { Injectable } from '@angular/core';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEmpleados: Empleado[] = [{
    nombreCompleto: 'Lucas Martínez',
    correo: 'lmartinez@gmail.com',
    telefono: 3153456789,
    sexo: 'Masculino',
    fechaIngreso: new Date(),
    estadoCivil: 'Soltero'

  }];


  constructor() { }

  getEmpleados(){
    return this.listEmpleados.slice();
  }

  eliminarEmpleado(index:number){
    this.listEmpleados.splice(index,1);
  }

  getEmpleadoById(index:number){
   return this.listEmpleados[index];
  }

  agregarEmpleado(empleado : Empleado){
    this.listEmpleados.unshift(empleado); //unshift agrega un registro a la lista en la primera posicion, push agrega algo a la lista en la última posicion
  }

  actualizarEmpleado(empleado : Empleado, idEmpleado: number){
    this.listEmpleados[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleados[idEmpleado].correo = empleado.correo;
    this.listEmpleados[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleados[idEmpleado].telefono = empleado.telefono;
    this.listEmpleados[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleados[idEmpleado].sexo = empleado.sexo;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Proyecto } from '../models/timesheet.model';

@Pipe({
  name: 'proyectoJoin'
})
export class ProyectoJoinPipe implements PipeTransform {

  transform(proyectos: Proyecto[], ...args: unknown[]): unknown {
    const arr = proyectos.map(proyecto => proyecto.descripcion)
    return arr.join(', ');
  }

}

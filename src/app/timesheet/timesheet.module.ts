import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { CargaHorasComponent } from './components/carga-horas/carga-horas.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    CargaHorasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimesheetRoutingModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class TimesheetModule { }

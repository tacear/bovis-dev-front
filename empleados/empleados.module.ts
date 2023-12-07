import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './container/empleados.component';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { FormsModule } from '@angular/forms';

import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { PersonaRegistroComponent } from './components/persona-registro/persona-registro.component';
import { MessagesModule } from 'primeng/messages';
import { EmpleadosPrincipalComponent } from './components/empleados-principal/empleados-principal.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosRegistroComponent,
    PersonaRegistroComponent,
    EmpleadosPrincipalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmpleadosRoutingModule,
    ConfirmPopupModule,
    ToastModule,
    DropdownModule,
    ProgressBarModule,
    CalendarModule,
    AccordionModule,
    MessagesModule,
    TooltipModule,
    ToolbarModule,
    TableModule
  ],
  exports:[

  ],
  providers: [ConfirmationService, MessageService]
})
export class EmpleadosModule { }

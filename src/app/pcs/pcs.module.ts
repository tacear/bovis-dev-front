import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcsRoutingModule } from './pcs-routing.module';
import { IpComponent } from './components/ip/ip.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    IpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PcsRoutingModule,
    ToastModule,
    AccordionModule,
    MessagesModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PcsModule { }

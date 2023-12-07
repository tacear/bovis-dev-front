import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { FacturacionService } from './services/facturacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { PrimengModule } from '../shared/primeng.module';

import { FacturacionComponent } from './container/facturacion.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NotaCreditoComponent } from './components/nota-credito/nota-credito.component';
import { FacturaCrpComponent } from './components/factura-crp/factura-crp.component';
import { BusquedaCancelacionComponent } from './components/busqueda-cancelacion/busqueda-cancelacion.component';

@NgModule({
  declarations: [
    FacturacionComponent,
    UploadFileComponent,
    NotaCreditoComponent,
    FacturaCrpComponent,
    BusquedaCancelacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FacturacionRoutingModule,
    HttpClientModule,
    PrimengModule
  ],
  providers: [
    ConfirmationService,
    FacturacionService,
    MessageService
  ]
})
export class FacturacionModule { }

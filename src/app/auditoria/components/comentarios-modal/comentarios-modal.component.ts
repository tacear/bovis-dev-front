import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-comentarios-modal',
  templateUrl: './comentarios-modal.component.html',
  styleUrls: ['./comentarios-modal.component.css'],
  providers: [MessageService]
})
export class ComentariosModalComponent implements OnInit {

  ref               = inject(DynamicDialogRef)
  config            = inject(DynamicDialogConfig)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)
  
  readOnly: boolean   = true
  numProyecto: number = null

  constructor() { }

  ngOnInit(): void {
    if(this.config.data) {
      this.readOnly = this.config.data.readOnly
      this.numProyecto = this.config.data.numProyecto
      console.log(this.config.data)
    }
  }

}

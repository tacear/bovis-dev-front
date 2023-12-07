import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { CargaFile, InfoProyecto, InfoProyectoFacturas, LstFacturas, ResponseXML } from '../../Models/FacturacionModels';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  isXml = true;
  fileSizeMax = 1000000;
  fileBase64: CargaFile = new CargaFile();
  numProyecto: number;
  infoProyecto: InfoProyecto = new InfoProyecto();
  listFacturasBase64: Array<LstFacturas> = new Array<LstFacturas>();

  constructor(private cargaFileServ: FacturacionService,
    private messageService: MessageService,
    private msgs: MessageService) { }
  strFileBase64: string = '';
  isClear: boolean = false;
  isLoadingGPM: boolean = false;
  isLoadingFacturas: boolean = false;

  @ViewChild('fileUpload') fileUpload: any;
  listResponse: Array<ResponseXML>;
  errorMEssageFile: string = '';
  ngOnInit(): void {
  }

  async onBasicUpload(event: any) {
    if (event && event.files) {
      //console.log('length: ' + event.files.length);
      this.isLoadingFacturas = true;
      await this.convertXML(event.files)
      //console.log(this.listFacturasBase64);

      setTimeout(
        ()=>{
        this.cargaFile()
      },3000);
    }
  }

  async convertXML(files: any) {
    return new Promise((resolve, reject) => {
      let listFacturasBase64Sub: Array<LstFacturas> = new Array<LstFacturas>();
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (evt) => {
          const xmlData: string = (evt as any).target.result;
          var parser = new DOMParser();
          var xmlz = parser.parseFromString(xmlData, "application/xml");
          this.strFileBase64 = window.btoa((new XMLSerializer()).serializeToString(xmlz));
          let stXML: LstFacturas = new LstFacturas();
          stXML.NombreFactura = file.name;
          stXML.FacturaB64 = this.strFileBase64
          //console.log(stXML);
          this.listFacturasBase64.push(stXML);
          //listFacturasBase64Sub.push(stXML);
          resolve(listFacturasBase64Sub);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      }

    });
  }

  cargaFile() {

    let procesaFactura: InfoProyectoFacturas = new InfoProyectoFacturas();
    this.listFacturasBase64.forEach(element => {
      procesaFactura.LstFacturas.push(element);

    });
    procesaFactura.NumProyecto = this.infoProyecto.numProyecto;
    procesaFactura.rfcEmisor = this.infoProyecto.rfcBaseEmisor;
    procesaFactura.rfcReceptor = this.infoProyecto.rfcBaseReceptor;

    this.listResponse = new Array<ResponseXML>();
    try {
      this.cargaFileServ.cargaXML(procesaFactura).subscribe({
        next: (data) => {
          //console.log(data);
          if (data.success) {
            this.listResponse = data.data;
            //console.log(this.listResponse);
            this.messageService.add({
              severity: "success",
              summary: "Validar",
              detail: "Facturas procesadas",
              life: 2000
            });
          }
        },
        error: (e) => {
          //console.log(e);
          let error = `${e.message} \n\n ${e.error}`
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 2000
          });

          this.errorMEssageFile = error;
        }

      })
      this.isLoadingFacturas = false;
      this.isClear = true;
    } catch (err) {
      this.isLoadingFacturas = false;
      this.isClear = true;
      console.log(err);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: String(err)
      });
    }

  }

  clearFile() {
    this.isClear = !this.isClear
    this.fileUpload.clear();
    this.listResponse = new Array<ResponseXML>();
    this.errorMEssageFile = '';
    this.numProyecto = null;
    this.listFacturasBase64 = new Array<LstFacturas>();
    this.listResponse = new Array<ResponseXML>();
  }

  changeEnter(val: any) {
    if (val.keyCode == 13 && this.numProyecto > 0) {
      console.log(this.numProyecto);
      this.isLoadingGPM = true;
      this.getInfoProyecto();
    }
  }

  getInfoProyecto() {
    this.cargaFileServ.getInfoProyecto(this.numProyecto).subscribe(info => {
      if (info.data) {
        this.isXml = false;
        this.infoProyecto = info.data;
      }else{
        this.isXml = true;
        this.infoProyecto.nombre = info.message;
      }
    });
    this.isLoadingGPM = false;
  }

}

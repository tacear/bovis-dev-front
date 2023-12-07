import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from './primeng.module';

//Components
import { FailedComponent } from './components/failed/failed.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FailedComponent,
    MenuSidebarComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    HeaderComponent,
    FailedComponent,
    MenuSidebarComponent
  ]
})
export class SharedModule { }

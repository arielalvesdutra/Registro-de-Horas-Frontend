import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { InsertRecordsComponent } from './insert-records/insert-records.component';
import { ManageRecordsComponent } from './manage-records/manage-records.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faCheckCircle, faBan, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    InsertRecordsComponent,
    ManageRecordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    library.add(faEdit, faTrash, faCheckCircle, faBan, faPlusCircle, faMinusCircle)
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { TimeRecorderComponent } from './time-recorder/time-recorder.component';
import { InsertRecordsComponent } from './insert-records/insert-records.component';
import { TimeRecordListingComponent } from './time-record-listing/time-record-listing.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faCheckCircle, faBan, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    TimeRecorderComponent,
    InsertRecordsComponent,
    TimeRecordListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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

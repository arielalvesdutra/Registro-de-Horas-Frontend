import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { TimeRecorderComponent } from './time-recorder/time-recorder.component';
import { RecorderComponent } from './recorder/recorder.component';
import { TimeRecordListingComponent } from './time-record-listing/time-record-listing.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    TimeRecorderComponent,
    RecorderComponent,
    TimeRecordListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    library.add(faEdit, faTrash)
  }

}

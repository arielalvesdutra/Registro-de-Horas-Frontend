import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { TimeRecorderComponent } from './time-recorder/time-recorder.component';
import { RecorderComponent } from './recorder/recorder.component';
import { TimeRecordListingComponent } from './time-record-listing/time-record-listing.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

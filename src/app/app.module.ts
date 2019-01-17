import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeRecorderComponent } from './time-recorder/time-recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeRecorderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

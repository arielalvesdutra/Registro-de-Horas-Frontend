import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms'

// import { FlexModule, FlexStyleBuilder, FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { TimeRecorderComponent } from './time-recorder/time-recorder.component';
import { RecorderComponent } from './recorder/recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeRecorderComponent,
    RecorderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
    // FlexModule,
    // FlexLayoutModule
    // FlexLayoutModule
    // FlexStyleBuilder
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

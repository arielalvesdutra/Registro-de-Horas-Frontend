import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RecordsService } from '../records.service'
import { TimeRecord } from '../entities/time-record'

@Component({
  selector: 'app-insert-records',
  templateUrl: './insert-records.component.html'
})
export class InsertRecordsComponent implements OnInit {

  insertRecordForm: FormGroup
  
  recordStarted: boolean = false
  recordTitle: string
  recordInit: Date
  recordEnd: Date
  
  cleanRecordCache(): void {
    this.recordTitle = ''
    this.recordInit = null
    this.recordEnd = null
  }
  
  constructor(private recordService: RecordsService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.insertRecordForm = this.formBuilder.group({
      recordTitle: [ this.recordTitle, [ Validators.required, Validators.maxLength(50) ]]
    })
  }

  startTimer() {
    this.recordStarted = true
    this.cleanRecordCache()
    this.recordTitle = this.insertRecordForm.value.recordTitle
    this.recordInit = new Date()
  }

  stopTimer() {
    this.recordStarted = false
    this.recordEnd = new Date()

    this.recordService.addRecord(
      new TimeRecord(null, this.recordTitle, this.recordInit, this.recordEnd)
    ).subscribe(() => RecordsService.registroAdicionado.emit())   
  }
}

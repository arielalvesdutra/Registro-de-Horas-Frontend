import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common'

import { RecordsService } from '../records.service'
import { TimeRecord } from '../time-record.model'

@Component({
  selector: 'app-insert-records',
  templateUrl: './insert-records.component.html',
  styleUrls: ['./insert-records.component.css']
})
export class InsertRecordsComponent implements OnInit {

  constructor(private recordService: RecordsService) { }

  recordStarted: boolean = false
  recordTitle: string
  recordInit: Date
  recordEnd: Date

  cleanRecordCache(): void {
    this.recordTitle = ''
    this.recordInit = null
    this.recordEnd = null
  }

  ngOnInit() {
  }

  startTimer(recordName: string) {
    if (!recordName) {
      return false
    }

    this.cleanRecordCache()
    this.recordStarted = true
    this.recordTitle = recordName
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

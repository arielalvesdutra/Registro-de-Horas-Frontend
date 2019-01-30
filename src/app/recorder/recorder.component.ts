import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common'

import { RecordsService } from '../records.service'
import { TimeRecord } from '../time-record.model'

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  constructor(private recordService: RecordsService) { }

  recordStarted: boolean = false
  recordTitle: string
  recordInit: string
  recordEnd: string

  cleanRecordCache(): void {
    this.recordTitle = ''
    this.recordInit = ''
    this.recordEnd = ''
  }

  ngOnInit() {
  }

  startTimer(recordName: string) {
    if (!recordName) {
      console.log('não tem texto...')
      return false
    }

    this.cleanRecordCache()
    this.recordStarted = true
    this.recordTitle = recordName
    this.recordInit = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')
    console.log(`Iniciando o temporizador...`)
  }

  stopTimer() {
    this.recordStarted = false
    this.recordEnd = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')
    console.log(`Parando o temporizador...`)

    this.recordService.addRecord(
      new TimeRecord(null, this.recordTitle, this.recordInit, this.recordEnd)
    ).subscribe(() => RecordsService.registroAdicionado.emit())   
  }
}

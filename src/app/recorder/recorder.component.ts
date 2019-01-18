import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  constructor() { }

  recordStarted: boolean = false

  recordTitle : string
  recordInit: string
  recordEnd: string

  ngOnInit() {
  }

  startTimer(recordName: string) {

    if (!recordName)  {
      console.log('não tem texto...')
      return false
    }

    this.recordStarted = true
    this.recordTitle = recordName
    this.recordInit = formatDate(new Date(), 'yyyy/MM/dd HH:mm', 'en')
    console.log(`Iniciando o temporizador...`)
  }

  stopTimer() {
    this.recordStarted = false
    this.recordEnd = formatDate(new Date(), 'yyyy/MM/dd HH:mm', 'en')
    console.log(`Parando o temporizador...`)
  }
}

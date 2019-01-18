import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startTimer() {
    console.log(`Iniciando o temporizador...`)
  }

  stopTimer() {
    console.log(`Parando o temporizador...`)
  }
}

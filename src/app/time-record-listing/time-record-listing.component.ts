import { Component, OnInit, Input } from '@angular/core';

import { RecordsService } from '../records.service'
import { TimeRecord } from '../time-record.model'

@Component({
  selector: 'app-time-record-listing',
  templateUrl: './time-record-listing.component.html',
  styleUrls: ['./time-record-listing.component.css']
})
export class TimeRecordListingComponent implements OnInit {

  records: TimeRecord[]
    
  constructor(private recordService: RecordsService) {}

  ngOnInit() {
    this.getRecords()
    
    RecordsService.registroAdicionado.subscribe(param => this.getRecords())
  }
 
  getRecords() {
    this.recordService.getRecords()
      .subscribe(data => this.records = data)
  }
}

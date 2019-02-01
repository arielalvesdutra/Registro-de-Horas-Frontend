import { Component, OnInit, Input } from '@angular/core';

import { RecordsService } from '../records.service'
import { TimeRecord } from '../time-record.model'
import { filter } from 'rxjs/operators';
import { ifError } from 'assert';

@Component({
  selector: 'app-time-record-listing',
  templateUrl: './time-record-listing.component.html',
  styleUrls: ['./time-record-listing.component.css']
})
export class TimeRecordListingComponent implements OnInit {

  dateFilter: string
  titleFilter: string

  records: TimeRecord[]

  recordEditId: number
  recordTitleToUpdate: string
  recordInitDateToUpdate: string
  recordEndDateToUpdate: string

  showFilters: boolean = false

  constructor(private recordService: RecordsService) { }

  ngOnInit() {
    this.getRecords()

    RecordsService.registroAdicionado.subscribe(param => this.getRecordsByFilters())
  }

  private arrayIsEmpty(array: any[]): boolean {
    for (let index in array) {
      return false
    }

    return true
  }

  private buildFilterUrl(filterOptions: string[]) {

    if (this.arrayIsEmpty(filterOptions)) {
      return ''
    }

    let filterUrl = 'filters?'
    let firstElement: boolean = true

    for (let filter in filterOptions) {
      if (firstElement) {
        filterUrl += `${filter}=${filterOptions[filter]}`
        firstElement = false
      } else {
        filterUrl += `&${filter}=${filterOptions[filter]}`
      }
    }

    return filterUrl
  }

  cancelEdit() {
    this.recordEditId = null
  }

  cleanRecordToUpdateValues() {
    this.recordEditId = null
    this.recordTitleToUpdate = null
    this.recordInitDateToUpdate = null
    this.recordEndDateToUpdate = null
  }

  confirmUpdate(timeRecord: TimeRecord) {
    this.recordService.updateRecord(new TimeRecord(
      this.recordEditId,
      this.recordTitleToUpdate,
      this.recordInitDateToUpdate,
      this.recordEndDateToUpdate
    ))
      .subscribe(() => this.getRecordsByFilters())

    this.cleanRecordToUpdateValues()
  }

  deleteRecord(id: number): void {
    this.recordService.deleteRecord(id)
      .subscribe(() => this.getRecordsByFilters())
  }

  getRecords(filtersUrl: string = '') {
    this.recordService.getRecords(filtersUrl)
      .subscribe(data => this.records = data)
  }

  getRecordsByFilters() {
    let filterOptions = []

    if (this.dateFilter) {
      filterOptions['initDate'] = this.dateFilter
    }
    if (this.titleFilter) {
      filterOptions['title'] = this.titleFilter
    }

    let filtersUrl = this.buildFilterUrl(filterOptions)

    this.getRecords(filtersUrl)
  }

  showFilterToggle() {
    this.showFilters = !this.showFilters
  }

  updateRecord(timeRecord: TimeRecord) {
    this.recordEditId = timeRecord.id
    this.recordTitleToUpdate = timeRecord.title
    this.recordInitDateToUpdate = timeRecord.initDate
    this.recordEndDateToUpdate = timeRecord.endDate
  }
}

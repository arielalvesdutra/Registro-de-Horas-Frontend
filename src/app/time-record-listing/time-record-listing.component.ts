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

  currentPage: number = 1
  numberOfPages: number
  pageItems: TimeRecord[]
  pageItensLimit: number = 5
  pages:number[]

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

  private calculateNumberOfPages(): number {
    return Math.ceil(this.records.length / this.pageItensLimit)
  }

  cancelEdit() {
    this.recordEditId = null
  }

  changePage(page: number): void {
    this.pageItems = this.getPageItems(page)
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

  private getPages(): number[] {
    let pages:number[] = []

    for (let index = 1; index <= this.numberOfPages; index++ ) {
      pages.push(index)
    } 

    return pages
  }

  private getPageItems(page:number = null): TimeRecord[] {

    if (page) {
      this.currentPage = page
    }

    let initItem:number  = (this.pageItensLimit * this.currentPage) - 1 - (this.pageItensLimit-1)
    let finalItem:number = (this.pageItensLimit * this.currentPage) 
    

    return this.records.slice(initItem,finalItem)
  }

  getRecords(filtersUrl: string = '') {
    this.recordService.getRecords(filtersUrl)
      .subscribe(data => {
        this.records = data
        this.numberOfPages = this.calculateNumberOfPages()
        this.pages = this.getPages()
        this.pageItems = this.getPageItems()
      })
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

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { filter } from 'rxjs/operators';
import { ifError } from 'assert';

import { RecordsService } from '../records.service'
import { TimeRecord } from '../time-record.model'

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.css']
})
export class ManageRecordsComponent implements OnInit {

  // todo: pode ser um subcomponente
  currentPage: number = 1
  numberOfPages: number
  pageItems: TimeRecord[]
  pageItensLimit: number = 5
  pages:number[]

  // todo: pode ser um subcomponente
  showFilters: boolean = false

  records: TimeRecord[]

  recordsFiltersForm: FormGroup

  recordUpdateForm: FormGroup

  // todo: pode virar um objeto
  recordEditId: number

  constructor(private recordService: RecordsService, private formBuilder: FormBuilder) { }

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
    event.preventDefault()
    this.recordEditId = null
  }

  changePage(page: number): void {
    this.pageItems = this.getPageItems(page)
  }

  cleanRecordToUpdateValues() {
    this.recordEditId = null
    this.recordUpdateForm.patchValue({ 
      recordTitle: '',
      recordInitDateTime: null,
      recordEndDateTime: null
    })
  }

  confirmUpdate(timeRecord: TimeRecord) {
    this.recordService.updateRecord(new TimeRecord(
      this.recordEditId,
      this.recordUpdateForm.value.recordTitle,
      this.recordUpdateForm.value.recordInitDateTime,
      this.recordUpdateForm.value.recordEndDateTime
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
      this.setCurrentPage(page)
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
        this.setCurrentPage()
        this.pages = this.getPages()
        this.pageItems = this.getPageItems()
      })
  }

  getRecordsByFilters() {

    let filterOptions = []

    if (this.recordsFiltersForm.value.initDateFilter) {
      filterOptions['initDate'] = this.recordsFiltersForm.value.initDateFilter
    }
    if (this.recordsFiltersForm.value.titleFilter) {
      filterOptions['title'] = this.recordsFiltersForm.value.titleFilter
    }

    let filtersUrl = this.buildFilterUrl(filterOptions)

    this.getRecords(filtersUrl)
  }

  hasItems(): boolean {
    if (this.numberOfPages > 0) {
      return true
    }

    return false
  }

  ngOnInit() {
    this.getRecords()

    this.recordsFiltersForm = this.formBuilder.group({
      titleFilter: [''],
      initDateFilter: [ ]
    })

    this.recordUpdateForm = this.formBuilder.group({
      recordTitle: [ '', Validators.required ],
      recordInitDateTime: [ Date, Validators.required ],
      recordEndDateTime: [ Date, Validators.required ]
    })

    RecordsService.registroAdicionado.subscribe(param => this.getRecordsByFilters())
  }

  /**
   * @param page 
   */
  private setCurrentPage(page?: number){

    if (page) {
      this.currentPage = page
    }

    if (this.currentPage > this.numberOfPages && this.numberOfPages > 0) {
      this.currentPage = this.numberOfPages
    }
  }

  showFilterToggle() {
    this.showFilters = !this.showFilters
  }

  updateRecord(timeRecord: TimeRecord) {
    this.recordEditId = timeRecord.id    
    this.recordUpdateForm.patchValue({ 
      recordTitle: timeRecord.title,
      recordInitDateTime: timeRecord.initDateTime,
      recordEndDateTime: timeRecord.endDateTime
    })    
  }
}

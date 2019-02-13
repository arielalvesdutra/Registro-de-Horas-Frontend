import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

import { TimeRecord } from './time-record.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  backendApi = 'http://localhost:8000/'
  
  static registroAdicionado = new EventEmitter<string>()

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(
        `Status de erro retornado do Backend: ${error.status}, ` +
        `O corpo estava: ${error.error}`);
    }
    return throwError(
      'Algo errado ocorreu. Favor acessar mais tarde.');
  }

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
  }
  
  addRecord(timeRecord: TimeRecord) {
    return this.http.post<TimeRecord>(this.backendApi + 'addRecord', timeRecord, httpOptions)
  }
  
  deleteRecord(id: number) {
    return this.http.delete(this.backendApi + 'deleteRecord/' + id)
  }
  
  getRecords(filtersUrl: string = ''): Observable<TimeRecord[]> {
    let url = filtersUrl 
      ? this.backendApi + 'getRecords/'  + filtersUrl
      : this.backendApi + 'getRecords'
    return this.http.get<TimeRecord[]>(url)
  }
  
  updateRecord(timeRecord: TimeRecord) {   
    return this.http.put<TimeRecord>(this.backendApi + 'updateRecord/' + timeRecord.id, timeRecord, httpOptions)
  }
}

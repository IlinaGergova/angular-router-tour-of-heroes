import { Injectable } from '@angular/core';
import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  private crisesUrl = 'api/crisis-center';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]> {
    this.messageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map((crises: Crisis[]) => crises.find(crisis => crisis.id === +id)!)
    );
  }

}

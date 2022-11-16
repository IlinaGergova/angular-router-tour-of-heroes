import { Injectable } from '@angular/core';
import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  static nextCrisisId = 100;
  private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);
  constructor(private messageService: MessageService) { }

  getCrises() { return this.crises$; }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map((crises: Crisis[]) => crises.find(crisis => crisis.id === +id)!)
    );
  }

}

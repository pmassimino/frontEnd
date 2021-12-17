import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService<T> {
  protected itemsSubject = new BehaviorSubject<T[]>([]);
  items$ = this.itemsSubject.asObservable();

  protected get items(): T[] {
    return this.itemsSubject.getValue();
  }
  protected set items(val: T[]) {
    this.itemsSubject.next([...val]);
  }
}
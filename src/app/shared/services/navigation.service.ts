import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  _sideNavVisible$ = new BehaviorSubject(true);
  constructor() { }
  
  toggleSideNav(visibility?: boolean) {
    if (typeof visibility !== 'undefined') {
        this._sideNavVisible$.next(visibility);
    } else {
        this._sideNavVisible$.next(!this._sideNavVisible$.value);
    }
}
  sideNavVisible$(): Observable<boolean> {
    return this._sideNavVisible$;
}

}

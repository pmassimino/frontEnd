import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  toggled = false;
  subscription: Subscription = new Subscription();

  constructor(public navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.navigationService.sideNavVisible$().subscribe(isVisible => {
          this.toggled= !isVisible;          
      })
  );
  }

  
onToggle(){  
  this.navigationService.toggleSideNav();
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}


}

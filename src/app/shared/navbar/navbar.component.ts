import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { Empresa } from '../../modules/global/models/models/model';
import { AuthService } from '../../core/services/auth.service';
import { SessionService } from '../../modules/comun/services/session.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EmpresaService } from '../../modules/global/services/empresa.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  username :string;
  @Output() ToggleClick = new EventEmitter<string>();

  public isCollapsed = true;
  empresaSelected:Empresa;
  @ViewChild("navbar-cmp", {static: false}) button;

  constructor(location:Location, private element : ElementRef, private router: Router,private authService:AuthService,private sessionService:SessionService,private empresaService:EmpresaService) {
      this.location = location;
      this.nativeElement = element.nativeElement;
      this.sidebarVisible = false;
  }

  ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      var navbar : HTMLElement = this.element.nativeElement; 
      //this.empresaSelected = this.sessionService.CurrentEmpresa;//JSON.parse(localStorage.getItem("empresaSelected"));         
      this.empresaService.currentValue().subscribe(res=>this.empresaSelected = res);
      this.username = this.authService.currentAccount().Nombre; 
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  onToggle() 
    {
    this.ToggleClick.emit("toggle");
    }
  }

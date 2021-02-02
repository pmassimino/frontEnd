import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../../models/model';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-factura-afip',
  templateUrl: './factura-afip.component.html',
  styleUrls: ['./factura-afip.component.css']
})
export class FacturaAFIPComponent implements OnInit {
  entity: Factura ;
  id:string;
  form :  FormGroup;
  constructor(private router: Router,private route: ActivatedRoute,private service:FacturaService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
      //editar
      if(this.id)
      { 
         this.getById(this.id);     
      }
  }
  popupData():void
  {

  }
  getById(id):void
    {
      this.service.findOne(id).subscribe(res=>{this.entity = res;});
    }
  goBack():void
  {
    
  }

}

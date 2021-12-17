import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Area } from '../../models/model';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.css']
})
export class AreaSelectComponent implements OnInit {
  closeResult = '';
  @ViewChild('content', { static: false }) private content;
  isModalShown = false;
  entityData: Area[] = [];
  modalReference: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private router: Router,private service : AreaService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false; 
    }

    ngOnInit(): void
    {
     this.popupdata();    
   }
 
   ngAfterViewInit(): void {
     //this.open(this.content);
     this.modalReference = this.modalService.open(this.content);
     this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
   }
 
   popupdata():void
       {
         this.service.findAll()
         .subscribe(res => {this.entityData = res; } ,
         err => {console.log(err) ; });
       }
   
 
   open(content) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
   select(entity:Area)
   {
     this.service.Current = entity;
     this.closeDialog();    
     this.router.navigate(['dashboard']);
 
   }
   
   closeDialog(){    
     this.modalReference.close();
     this.router.navigate(['']);
   }
 
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return `with: ${reason}`;
     }    
   }  

}

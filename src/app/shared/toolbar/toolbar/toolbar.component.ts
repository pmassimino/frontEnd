import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() 
  name:string; 

  @Input()
  addNewVisible:boolean=true;

  @Input()
  printVisible:boolean=false;   
  //Events
  @Output()
  addNew = new EventEmitter();
  @Output()
  exportToExcel = new EventEmitter();
  @Output()
  findByName = new EventEmitter<string>();
  @Output()
  print = new EventEmitter();

  constructor() { }
  ngOnInit() {  
  } 
  

  onAddNew()
  {
    this.addNew.emit();
  }
  onExportToExcel()
  {
    this.exportToExcel.emit();
  }
  onFindByName(newname)
  {
    this.name = newname;
    this.findByName.emit(this.name);    
  }
  onPrint()
  {
    this.print.emit();
  }

}

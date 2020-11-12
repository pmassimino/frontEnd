import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() name:string 
  //Events
  @Output()
  addNew = new EventEmitter();
  @Output()
  exportToExcel = new EventEmitter();
  @Output()
  findByName = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
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

}

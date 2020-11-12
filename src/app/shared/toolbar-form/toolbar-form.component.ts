import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-form',
  templateUrl: './toolbar-form.component.html',
  styleUrls: ['./toolbar-form.component.css']
})
export class ToolbarFormComponent implements OnInit {
  @Input() mode:string=""
  //Events
  @Output()
  print = new EventEmitter();
  @Output()
  exportToExcel = new EventEmitter();
  @Output()
  findByName = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  
  onExportToExcel()
  {
    this.exportToExcel.emit();
  }
  
  onPrint()
  {
    this.print.emit();

  }

}

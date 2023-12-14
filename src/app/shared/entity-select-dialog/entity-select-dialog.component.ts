import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EntitySelectView } from '../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-select-dialog',
  templateUrl: './entity-select-dialog.component.html',
  styleUrls: ['./entity-select-dialog.component.css']
})
export class EntitySelectDialogComponent implements OnInit {
  filteredIds: string[] = [];
  entityData: EntitySelectView[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  titulo : string;
  displayedColumns = ['Id', 'Nombre','Select'];
  totalItems: number;
  total: number;  
  dataSource: MatTableDataSource<EntitySelectView>;
  constructor(private router: Router, private dialogRef: MatDialogRef<EntitySelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.entityData = data.entityData;
    this.filteredIds = data.filteredIds;
    this.dataSource = new MatTableDataSource(this.entityData);
    this.titulo = data.titulo;
  }

  ngOnInit(): void {
    this.configTable();
    this.applyFilter();
  }

  add(item: EntitySelectView): void {
    this.dialogRef.close({ data: 'ok' });
  }
  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(): void {
    if (this.filteredIds.length > 0) {
      this.dataSource.data = this.entityData.filter(entity => !this.filteredIds.includes(entity.Id));
      this.calcular();
    }
  }
  findByName(name): void {
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();
  }

  calcular(): void {
    this.totalItems = 0;    
    this.totalItems = this.dataSource.filteredData.reduce((total, item) => total + 1, 0);    
  }

  select(entity: EntitySelectView) {
    entity.Selected = !entity.Selected; // Cambiar el estado Select      
  }

  anySelected(): boolean {
    return this.dataSource.filteredData.some(entity => entity.Selected);
  }

  close(): void {
    this.dialogRef.close({ result: 'cancel' });
  }
  aceptar(): void {
    const selectedEntities = this.dataSource.filteredData.filter(entity => entity.Selected);

    this.dialogRef.close({ result: "ok", selectedEntities: selectedEntities });
  }
  cancel(): void {
    this.dialogRef.close({ result: 'cancel' });
  }

}

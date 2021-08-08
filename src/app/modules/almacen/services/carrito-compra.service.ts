import { Injectable } from '@angular/core';
import { Articulo, ItemCarrito } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {
  
  constructor() { }
  public add(articulo:Articulo,cantidad:number=1): void
  {
    const carritoList = this.getAll();
    const item:ItemCarrito= new ItemCarrito();
    item.Articulo = articulo;
    item.Cantidad = 1;
    carritoList.push(item);
    localStorage.setItem("carritoList", JSON.stringify(carritoList));

  }
  public delete(id:string)
  {
    const carritoList = this.getAll();
    for (let i = 0; i < carritoList.length; i++) {
      if (carritoList[i].Articulo.Id === id) {
        carritoList.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("carritoList", JSON.stringify(carritoList));
  }
  public deleteAll()
  {
    var carritoList :ItemCarrito[]=[];
    localStorage.setItem("carritoList", JSON.stringify(carritoList));
  }
  public getAll():ItemCarrito[]
  {
    var entityData: ItemCarrito[] = []    
    entityData = JSON.parse(localStorage.getItem("carritoList"))||[];
    return entityData;
  }
}

import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo, Familia } from '../../models/model';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaService } from '../../services/familia.service';
import { UntypedFormControl, UntypedFormGroup, Validators, UntypedFormBuilder} from '@angular/forms';
import { CondIvaOperacion, UnidadMedida } from '../../../global/models/models/model';
import { CondIvaOperacionService } from '../../../global/services/cond-iva-operacion.service';
import { UnidadMedidaService } from '../../../global/services/unidad-medida.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
myForm :  UntypedFormGroup;
entity: Articulo = new Articulo();
condIva: CondIvaOperacion[] = [];
familia: Familia[] = [];
unidadMedida:UnidadMedida[]=[]
submitted = false;
mode = "new";
_id= String;

constructor(private articuloService: ArticuloService, private condIvaOpService: CondIvaOperacionService,
            private familiaService: FamiliaService,private unidadMedidaService: UnidadMedidaService, 
            private router: Router,private route: ActivatedRoute,
            private formBuilder: UntypedFormBuilder)            
            { 
                            
            }


  ngOnInit(): void {
    this.popupData();    
    this._id = this.route.snapshot.params['id'];   
    this.createForm(); 
    //editar
    if(this._id)
    { 
       this.getById(this._id);
       this.mode="edit"
    }
    else //set default values
    {
      this.setDefaultValues();
    }
    }

  createForm():void
    {
      this.myForm = new UntypedFormGroup({
      Id: new UntypedFormControl(this.entity.Id,Validators.required),
      Nombre: new UntypedFormControl(this.entity.Nombre,Validators.required),
      IdFamilia: new UntypedFormControl(this.entity.IdFamilia),
      IdUnidad: new UntypedFormControl(this.entity.IdUnidad),
      CostoVenta: new UntypedFormControl(this.entity.CostoVenta),
      ImpuestoVenta: new UntypedFormControl(this.entity.ImpuestoVenta),
      CondIva:new UntypedFormControl(this.entity.CondIva),
      AlicuotaIva: new UntypedFormControl(this.entity.AlicuotaIva),
      MargenVenta: new UntypedFormControl(this.entity.MargenVenta),
      PrecioVenta: new UntypedFormControl(this.entity.PrecioVenta),
      PrecioVentaFinal: new UntypedFormControl(this.entity.PrecioVentaFinal)});
      this.calculate();      
  }

  popupData():void
  {
    this.condIvaOpService.findAll()
    .subscribe(res => { this.condIva = res; }, err => {console.log(err); });
    this.familiaService.findAll().subscribe(res => { this.familia = res; }, err => {console.log(err); });
    this.unidadMedidaService.findAll().subscribe(res => { this.unidadMedida = res; }, err => {console.log(err); });

  }
  setDefaultValues():void
  {
    this.articuloService.newDefault().subscribe(res=>{this.entity=res;this.createForm();},err => {console.log(err);});

  }
  getById(id):void
  {
    this.articuloService.findOne(id).subscribe(res=>{this.entity = res;this.createForm();});
  }
 new(): void
  {
    this.submitted = false;   
  }
  condIvaChange(args)
  { 
    let alicuotaIva = this.condIva.find(x=>x. Id ===this.myForm.get("CondIva").value).Alicuota;    
    this.myForm.get("AlicuotaIva").patchValue(alicuotaIva); 
   } 
  save() 
  {
    if( this.mode=="new"){  //new
    this.articuloService.add(this.myForm.value)
    .subscribe(data => {console.log(data);
               this.goBack();this.submitted = true; }, 
               error => {console.log(error);               
               this.setControlsError(error.error);               
               }
     );
     }
     else //Edit
     {
      this.articuloService.update(this.entity.Id,this.myForm.value)
      .subscribe(data => {console.log(data);
                 this.goBack();this.submitted = true; }, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }
  
  calculate():void{
    this.myForm.valueChanges.subscribe(val =>{
      const newPrecioVenta =((val.CostoVenta * val.MargenVenta/ 100) +  val.CostoVenta);
      const newPrecioVentaFinal = (((newPrecioVenta - val.ImpuestoVenta) * val.AlicuotaIva/ 100) + newPrecioVenta + val.ImpuestoVenta);
      this.myForm.controls.PrecioVenta.patchValue(newPrecioVenta, {emitEvent: false});
      this.myForm.controls.PrecioVentaFinal.patchValue(newPrecioVentaFinal, {emitEvent: false});        
  });
}
  onSubmit() {
     this.save();
  }

  goBack() {
    this.router.navigate(['almacen/articulo/list']);   
  }

  setControlsError(validationErrors)
  {    
    Object.keys(validationErrors).forEach(prop=>
      {
        const formControl = this.myForm.get(prop);
        if (formControl)
           {
            formControl.setErrors({serverError: validationErrors[prop]});
            formControl.markAsTouched();
                   }
       });    
  }

}

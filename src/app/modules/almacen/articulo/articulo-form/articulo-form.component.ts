import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo, Familia } from '../../models/model';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaService } from '../../services/familia.service';
import { FormControl, FormGroup, Validators, FormBuilder , ReactiveFormsModule} from '@angular/forms';
import { CondIvaOperacion, UnidadMedida } from '../../../global/models/models/model';
import { CondIvaOperacionService } from '../../../global/services/cond-iva-operacion.service';
import { UnidadMedidaService } from '../../../global/services/unidad-medida.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
form :  FormGroup;
articulo: Articulo = new Articulo();
condIva: CondIvaOperacion[] = [];
familia: Familia[] = [];
unidadMedida:UnidadMedida[]=[]
submitted = false;
mode = "new";
_id= String;

constructor(private articuloService: ArticuloService, private condIvaOpService: CondIvaOperacionService,
            private familiaService: FamiliaService,private unidadMedidaService: UnidadMedidaService, 
            private router: Router,private route: ActivatedRoute,
            private formBuilder: FormBuilder)            
            { 
                            
            }


  ngOnInit(): void {
    this.popupData();    
    this._id = this.route.snapshot.params['id'];
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
    

    this.createForm();
    this.calculateOnInit();
    }

  createForm():void
    {
      this.form = this.formBuilder.group({
      id: new FormControl(this.articulo.id,Validators.required),
      nombre: new FormControl(this.articulo.nombre,Validators.required),
      idFamilia: new FormControl(this.articulo.idFamilia),
      idUnidad: new FormControl(this.articulo.idUnidad),
      costoVenta: new FormControl(this.articulo.costoVenta),
      impuestoVenta: new FormControl(this.articulo.impuestoVenta),
      condIva:new FormControl(this.articulo.condIva),
      alicuotaIva: new FormControl(this.articulo.alicuotaIva),
      margenVenta: new FormControl(this.articulo.margenVenta),
      precioVenta: new FormControl(this.articulo.precioVenta),
      precioVentaFinal: new FormControl(this.articulo.precioVentaFinal)});
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
    this.articuloService.newDefault().subscribe(articulo=>this.articulo=articulo,err => {console.log(err);});

  }
  getById(id):void
  {
    this.articuloService.findOne(id).subscribe(res=>this.articulo = res);
  }
 new(): void
  {
    this.submitted = false;   
  }
  condIvaChange(args)
  { 
    this.articulo.alicuotaIva = this.condIva.find(x=>x. id ===this.articulo.condIva).alicuota; 
   } 
  save() 
  {
    if( this.mode=="new"){  //new
    this.articuloService.add(this.form.value)
    .subscribe(data => {console.log(data);
               this.goBack();this.submitted = true; }, 
               error => {console.log(error);               
               this.setControlsError(error.error);               
               }
     );
     }
     else //Edit
     {
      this.articuloService.update(this.articulo.id,this.form.value)
      .subscribe(data => {console.log(data);
                 this.goBack();this.submitted = true; }, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }
  
  calculateOnInit():void{
      this.form.valueChanges.subscribe(val =>{
      const newPrecioVenta =((val.costoVenta * val.margenVenta/ 100) + val.impuestoVenta + val.costoVenta);
      const newPrecioVentaFinal = (((newPrecioVenta - val.impuestoVenta) * val.alicuotaIva/ 100) + newPrecioVenta);
      this.form.controls.precioVenta.patchValue(newPrecioVenta, {emitEvent: false});
      this.form.controls.precioVentaFinal.patchValue(newPrecioVentaFinal, {emitEvent: false});        
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
        const formControl = this.form.get(prop);
        if (formControl)
           {
            formControl.setErrors({serverError: validationErrors[prop]});
            formControl.markAsTouched();
                   }
       });    
  }
  get id() { return this.form.get('id'); }


}

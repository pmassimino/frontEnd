import { Injectable, Directive, forwardRef } from '@angular/core';
import { CoreService} from '../services/core.service';
import { ValidationErrors, AsyncValidator, FormGroup, NG_VALIDATORS, Validator, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NumeroDocumentoValidator implements AsyncValidator {
  constructor(private coreService: CoreService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const tipoDocumento = control.get('idTipoDoc').value;
    const numeroDocumento = control.get('numeroDocumento').value;
    return this.coreService.validarNumeroDocumento(tipoDocumento,numeroDocumento).pipe(
      map(notValid => (notValid ? { numeroDocumentoNoValido: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appNumeroDocumentoValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() =>  NumeroDocumentoValidator),
      multi: true
    }
  ]
})
export class  NumeroDocumentoValidatorDirective {
  constructor(private validator:  NumeroDocumentoValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}


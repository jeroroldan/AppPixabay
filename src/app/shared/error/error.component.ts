import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  texto = '';
  mostrar = false;
  suscripcion: Subscription

  constructor( private _imagenService: ImageService ) {
    this.suscripcion = this._imagenService.getError().subscribe( data =>{
      this.mostrarMensaje();
      this.texto = data;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje(){
    this.mostrar= true;
    setTimeout(()=>{
      this.mostrar = false;
    },2000);
  }

}

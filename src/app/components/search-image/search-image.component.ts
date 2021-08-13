import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {

  nombreImagen: string;



  constructor( private _imagenService: ImageService ) {
    this.nombreImagen = ''

   }

  ngOnInit(): void {
  }

  buscarImagenes(){
    if( this.nombreImagen === '' ){
      this._imagenService.setError('Agrega un texto de busqueda')
      return;
    }
    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
  }

}

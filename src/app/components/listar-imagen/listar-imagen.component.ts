
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  suscripcion: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _imagenService: ImageService) {
    this.suscripcion = _imagenService.getTerminoBusqueda().subscribe((data) => {
      this.termino = data;
      this.loading = true;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {}

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino,this.imagenesPorPagina,this.paginaActual).subscribe(
      (data) => {
        this.loading = false;
        
        if (data.hits.length === 0) {
          this._imagenService.setError('Opps no encontramos ningun resultado');
          return;
        }
        this.calcularTotalPaginas = Math.ceil(
          data.totalHits / this.imagenesPorPagina
        );
        this.listImagenes = data.hits;
      },
      (error) => {
        this._imagenService.setError('Opps...Ocurrio un error');
        this.loading = false;
      }
    );
  }

  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaPosterior() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }

  paginaPosteriorClass(){
    if( this.paginaActual === this.calcularTotalPaginas ){
      return false;
    }else{
      return true;
    }
  }
}

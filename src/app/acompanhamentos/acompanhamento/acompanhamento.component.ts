import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcompanhamentosService } from '../acompanhamentos.service';

@Component({
  selector: 'salv-acompanhamento',
  templateUrl: './acompanhamento.component.html'
})
export class AcompanhamentoComponent implements OnInit {

  acompanhamento: Acompanhamento

  constructor(private acompanhamentosService: AcompanhamentosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.acompanhamentosService.acompanhamentoById(this.route.snapshot.params['id'])
      .subscribe(acompanhamento => this.acompanhamento = acompanhamento)
  }

}



export class ResidenteComponent implements OnInit {

  residente: Residente
  familiares: Familiar[]
  convenios: Convenio[]

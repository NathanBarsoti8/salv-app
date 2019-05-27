import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcompanhamentosService } from './../../acompanhamentos/acompanhamentos.service';
import { Acompanhamento } from './../../acompanhamentos/acompanhamento/acompanhamento.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'salv-residente-acomp',
  templateUrl: './residente-acomp.component.html',
  animations: [
    trigger('residente-acompAppeared', [
        state('ready', style({ opacity: 1 })),
        transition('void => ready', [
            style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
            animate('500ms 0s ease-in-out')
        ])
    ])
  ]
})

export class ResidenteAcompComponent implements OnInit {

  residenteacompState = 'ready'

  dateForm: FormGroup

  public searchString: string;
  
  acompanhamentos: Acompanhamento[]

  acompanhamento1: Acompanhamento
  atividade
  data_atividade
  funcionarios1: any[]
  residentes1: any[]
  residentes: any = []
  funcionarios: any = []

  public filter

  constructor(private acompanhamentosService: AcompanhamentosService, 
              private route: ActivatedRoute, 
              private spinner: NgxSpinnerService, 
              private ns: NotificationService, 
              private fb: FormBuilder) { }

  paginaAtual: number = 1;

  ngOnInit() {

    this.spinner.show();

    this.acompanhamentosService.residenteAcomp(this.route.snapshot.params['id'])
      .subscribe(
      acomp => {
      this.acompanhamentos = acomp
      console.log('acompanhamentos', this.acompanhamentos)
      this.spinner.hide()
    })

    this.dateForm = this.fb.group({
      dateStart: this.fb.control(null),
      dateFinish: this.fb.control(null)
    })



    this.acompanhamentosService.acompanhamentoById(this.route.snapshot.params['id'])
      .subscribe((acompanhamento: Acompanhamento) => {
        this.spinner.hide()
        this.acompanhamento1 = acompanhamento[0]; console.log(this.acompanhamento1)
        this.atividade = acompanhamento[0].ATIVIDADE
        this.data_atividade = acompanhamento[0].DATA_ACOMPANHAMENTO
      })

      this.acompanhamentosService.AcompanhamentoFuncionarioQuery(this.route.snapshot.params['id']).subscribe(acompanhamento_funcionario => {
        this.spinner.hide()
        this.funcionarios1 = acompanhamento_funcionario
        console.log('funcionario', this.funcionarios)
      })
  
      this.acompanhamentosService.AcompanhamentoResidenteQuery(this.route.snapshot.params['id']).subscribe(acompanhamento_residente => {
        this.spinner.hide()
        this.residentes1 = acompanhamento_residente
  
        console.log('residente', this.residentes)
      })

    
  }

  filtroData () {
    let dates = this.dateForm.value

    if (dates.dateFinish == null) {
        this.spinner.show()
    this.acompanhamentosService.filtroDataInicial(dates).subscribe((response) => {
        this.acompanhamentos = response
        this.dateForm.reset()
        this.spinner.hide()
        console.log(dates)
    })
    } else {
        this.spinner.show()
        this.acompanhamentosService.filtroDataInicialFinal(dates)
        .subscribe((response) => {
            this.acompanhamentos = response
            this.dateForm.reset()
            this.spinner.hide()
            console.log(dates)
        })
    }
  } 

}

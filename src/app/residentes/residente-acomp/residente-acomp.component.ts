import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcompanhamentosService } from './../../acompanhamentos/acompanhamentos.service';
import { Acompanhamento } from './../../acompanhamentos/acompanhamento/acompanhamento.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProntuarioService } from './residente-acomp.service'

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
  prontuarioForm: FormGroup

  public searchString: string;

  acompanhamentos: Acompanhamento[]

  acompanhamento1: Acompanhamento
  atividade
  data_atividade
  funcionarios1: any[]
  residentes1: any[]
  residentes: any = []
  funcionarios: any = []
  codigo_acompanhamento: any

  public filter

  constructor(private acompanhamentosService: AcompanhamentosService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private ps: ProntuarioService) { }

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

    this.prontuarioForm = this.fb.group({
      dateStart: this.fb.control(null),
      dateFinish: this.fb.control(null)
    })



    this.acompanhamentosService.AcompanhamentoFuncionarioQuery(this.codigo_acompanhamento).subscribe(acompanhamento_funcionario => {
      this.spinner.hide()
      this.funcionarios1 = acompanhamento_funcionario
      console.log('funcionario', this.funcionarios)
    })

    this.acompanhamentosService.AcompanhamentoResidenteQuery(this.codigo_acompanhamento).subscribe(acompanhamento_residente => {
      this.spinner.hide()
      this.residentes1 = acompanhamento_residente

      console.log('residente', this.residentes)
    })


  }

  acompFull() {

    this.acompanhamentosService.acompFull()
      .subscribe((response) => {
        this.spinner.hide()
        this.acompanhamentos = response
        console.log(response)
      })
  }

  
  filtroData () {
    let dates = this.dateForm.value

    dates.CODIGO_RESIDENTE = this.route.snapshot.params['id']

    if (dates.dateFinish == null) {
        this.spinner.show()
    this.acompanhamentosService.filtroDataInicialResidente(dates).subscribe((response) => {
        this.acompanhamentos = response
        this.dateForm.reset()
        this.spinner.hide()
        console.log(dates)
        console.log(response)
    })
    } else {
        this.spinner.show()
        this.acompanhamentosService.filtroDataInicialFinalResidente(dates).subscribe((response) => {
            this.acompanhamentos = response
            this.dateForm.reset()
            this.spinner.hide()
            console.log(dates)
            console.log(response)
        })
    }
}

  //Função responsável por receber o blob vindo da api e transformar ele em pdf
  prontuarioResidente() {
    let dates = this.prontuarioForm.value
    dates.codigoResidente = this.route.snapshot.params['id']
    this.spinner.show()
    this.ps.prontuarioResidente(dates).subscribe((x) => {
      var newBlob = new Blob([x], { type: 'application/pdf' })

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }

      const data = window.URL.createObjectURL(newBlob)
      var link = document.createElement('a')
      link.href = data
      link.download = "Prontuário.pdf"
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))

      setTimeout(function () {
        window.URL.revokeObjectURL(data)
        link.remove()
      }, 100)
      this.prontuarioForm.reset()
      this.spinner.hide()
      this.ns.notify('Prontuário emitido com sucesso')
    })
  }

}

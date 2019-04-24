import { Funcionario, FuncionarioQuery } from './../../funcionarios/funcionario.model';
import { DialogConfirmService } from 'src/app/residentes/dialog-confirm.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Residente } from './../../residentes/residente/residente.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NovoAcompanhamentoService } from './../novo-acompanhamento/novo-acompanhamento.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { AcompanhamentosService } from '../acompanhamentos.service';
import { Acompanhamento, AcompanhamentoQuery, Acompanhamento_Residente, Acompanhamento_Funcionario } from './acompanhamento.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jspdf from 'jspdf'

@Component({
  selector: 'salv-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  animations: [
    trigger('acompanhamentoAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcompanhamentoComponent implements OnInit {



  acompanhamentoState = 'ready'

<<<<<<< HEAD
 @Input() acompanhamento1: Acompanhamento []
=======
  acompanhamento1: Acompanhamento[]
>>>>>>> 5a77ee0a5f4cfa586317576d9db78b862a564cfa
  funcionarios1: any[]
  residentes1: any[]

  editarAcompanhamentoForm: FormGroup
  codigo_acompanhamento: number
  ACOMPANHAMENTO_CODIGO: any[]
<<<<<<< HEAD
  acompanhamento: AcompanhamentoQuery []= []

=======
  acompanhamento: AcompanhamentoQuery[] = []
>>>>>>> 5a77ee0a5f4cfa586317576d9db78b862a564cfa
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  residentes: any = []
  residentesApagar: any = []
  funcionarios: any = []
  funcionariosApagar: any = []
  selectedResidentes: any = []
  selectedFuncionarios: any = []
  acompanhamentoSelecionados: any = []
  dropdownSettings: any = []
  dropdownSettings2: any = []


  constructor(private acompanhamentosService: AcompanhamentosService, private formBuilder: FormBuilder, private route: ActivatedRoute, private acompanhamentoService: AcompanhamentosService, private NovoAcompanhamentoService: NovoAcompanhamentoService, private router: Router, private activatedRoute: ActivatedRoute, private ns: NotificationService, private dialogConfirmService: DialogConfirmService, private spinner: NgxSpinnerService) { }

  markAllDirty(control: AbstractControl) {
    if (control.hasOwnProperty('controls')) {
      control.markAsDirty() // mark group
      let ctrl = <any>control;
      for (let inner in ctrl.controls) {
        this.markAllDirty(ctrl.controls[inner] as AbstractControl);
      }
    }
    else {
      (<FormControl>(control)).markAsDirty();
    }
  }


  ngOnInit() {

    this.spinner.show();

    this.acompanhamentosService.acompanhamentoById(this.route.snapshot.params['id'])
      .subscribe(acompanhamento => {
        this.spinner.hide()
        this.acompanhamento1 = acompanhamento[0]; console.log(acompanhamento)
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


    ///////////EDITAR RESIDENTE

    this.editarAcompanhamentoForm = this.formBuilder.group({
      DATA_ACOMPANHAMENTO: this.formBuilder.control(null, [Validators.required]),
      ATIVIDADE: this.formBuilder.control(null, [Validators.required]),
      residentes: this.formBuilder.control(null, [Validators.required]),
      funcionarios: this.formBuilder.control(null, [Validators.required])

    })


    this.acompanhamentoService.AcompanhamentoQuery
      (this.activatedRoute.snapshot.params['id']).subscribe(acompanhamento => {

        this.acompanhamento = acompanhamento
        this.codigo_acompanhamento = this.acompanhamento[0].CODIGO
        console.log('dados', this.acompanhamento, 'residentes')

      })


    this.acompanhamentoService.AcompanhamentoFuncionarioQuery
      (this.activatedRoute.snapshot.params['id']).subscribe(acompanhamento_funcionario => {

        this.selectedFuncionarios = acompanhamento_funcionario

        console.log('funcionario', this.selectedFuncionarios)
      })

    this.acompanhamentoService.AcompanhamentoResidenteQuery
      (this.activatedRoute.snapshot.params['id']).subscribe(acompanhamento_residente => {

        this.selectedResidentes = acompanhamento_residente

        console.log('residentes', this.selectedResidentes)
      })







    setTimeout(() => {

      this.editarAcompanhamentoForm.patchValue({

        DATA_ACOMPANHAMENTO: this.acompanhamento[0].DATA_ACOMPANHAMENTO,
        ATIVIDADE: this.acompanhamento[0].ATIVIDADE,


      })
      if (this.editarAcompanhamentoForm != null) {
        this.spinner.hide()
      }
    }, 2250)


    //Residentes List 
    this.NovoAcompanhamentoService.residentes()
      .subscribe(residentes => {
        this.spinner.hide()
        this.residentes = residentes
        console.log('residentes', residentes)



      })


    //funcionarios List
    this.NovoAcompanhamentoService.funcionarios()
      .subscribe(funcionarios => {
        this.spinner.hide()
        this.funcionarios = funcionarios
        console.log('funcionario', funcionarios)
        this.spinner.hide()
      })


    this.dropdownSettings = {
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar por nome',
      enableSearch: true,
      displayAllSelectedText: true,
      singleSelection: false,
      idField: 'CODIGO_RESIDENTE',
      textField: 'NOME',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      itemsShowLimit: 5

    }


    this.dropdownSettings2 = {
      enableSearch: true,
      displayAllSelectedText: true,
      singleSelection: false,
      idField: 'CODIGO_FUNCIONARIO',
      textField: 'FNOME',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar por nome',
    }



  }




  editarAcompanhamento(editarAcomp: Acompanhamento) {

    this.acompanhamentoService.updateAcompanhamento(editarAcomp, this.codigo_acompanhamento).subscribe(res => {

      if (res) {

        this.ns.notify(`Acompanhamento atualizado com sucesso!`)
        window.location.reload()

        
      this.acompanhamento1 = res[0]

     

      if (res){
      
        this.acompanhamentoService.acompanhamentoById(this.route.snapshot.params['id']).subscribe(res => {
          this.acompanhamento1 = res[0]
          console.log(res)
          this.editarAcompanhamentoForm.reset()
          this.ns.notify('Acompanhamento atualizado com sucesso!')
      })
    }
      
     
      
        }else {
      if (this.editarAcompanhamentoForm.valid == true && this.selectedFuncionarios != null && this.selectedResidentes != null) {

        this.ns.notify(`Acompanhamento inserido com sucesso!`)
        this.router.navigate(['/acompanhamentos'])

      } else {
        if (this.editarAcompanhamentoForm.valid == true && this.selectedFuncionarios != null && this.selectedResidentes != null) {

          this.ns.notify(`Acompanhamento inserido com sucesso!`)
          this.router.navigate(['/acompanhamentos'])

        } else {
          this.markAllDirty(this.editarAcompanhamentoForm)
          console.log(this.editarAcompanhamentoForm.controls)
          this.ns.notify(`Preencha os campos obrigatórios!`)
        }
      }
      console.log('Edição acompanhamento', editarAcomp, this.codigo_acompanhamento)
    })
  }  



  updateAcompanhamentoFuncionario(acompanhamento_funcionario: Acompanhamento_Funcionario[]) {
    for (let index = 0; index < this.editarAcompanhamentoForm.value.funcionarios.length; index++) {

      acompanhamento_funcionario = [Object.assign(this.editarAcompanhamentoForm.value.funcionarios[index], { "ACOMPANHAMENTO_CODIGO": this.codigo_acompanhamento })]
      this.acompanhamentoService.createAcompanhamentoFuncionario(acompanhamento_funcionario).subscribe(res => {
         if(res){

         this.acompanhamentoService.AcompanhamentoFuncionarioQuery(this.route.snapshot.params['id']).subscribe(res => {
       
         this.funcionarios1 = res
         })
        }
        
        console.log('acompanhamento funcionario', acompanhamento_funcionario)
      })

    }
  }

  updateAcompanhamentoResidente(acompanhamento_residente: Acompanhamento_Residente[]) {
    for (let index = 0; index < this.editarAcompanhamentoForm.value.residentes.length; index++) {

      acompanhamento_residente = [Object.assign(this.editarAcompanhamentoForm.value.residentes[index], { "ACOMPANHAMENTO_CODIGO": this.codigo_acompanhamento })]
      this.acompanhamentoService.createAcompanhamentoResidente(acompanhamento_residente).subscribe(res => {
        if(res){

          this.acompanhamentoService.AcompanhamentoResidenteQuery(this.route.snapshot.params['id']).subscribe(res => {
              
          this.residentes1 = res
        
          })
         }

        console.log('acompanhamento residente', acompanhamento_residente)
      })

    }


  }

  deleteResidente(idResidente: number, idAcompanhamento: number) {
    this.dialogConfirmService.confirm(`Deseja excluir o residente do acompanhamento?`)
      .then((isTrue) => {
        if (isTrue) {
          this.acompanhamentoService.deleteResidenteAcompanhamento(idResidente, idAcompanhamento).subscribe(() => {

            this.ns.notify('Dependente excluído com sucesso!')
          })
        }
        console.log("residente excluido: ", idResidente)
      })
  }

  deleteFuncionario(idFunc: number, idAcomp: number) {
    this.dialogConfirmService.confirm(`Deseja excluir o funcionário do acompanhamento?`)
      .then((isTrue) => {
        if (isTrue) {
          this.acompanhamentoService.deleteFuncionarioAcompanhamento(idFunc, idAcomp)
            .subscribe(() => {

              this.ns.notify('Funcionario excluído com sucesso!')
            })
        }
        console.log("funcionario excluido: ", idFunc)
      })
  }






  onResidenteSelect(residente: any) {
    console.log('onResidenteSelect', residente['CODIGO_RESIDENTE'])


  }

  onDeResidenteSelect(residente: any) {
    this.deleteResidente(residente.CODIGO_RESIDENTE, this.codigo_acompanhamento)

    console.log('onDeresidenteSelect', residente.CODIGO_RESIDENTE, this.codigo_acompanhamento)

  }


  onFuncionarioSelect(funcionarios: any) {
    console.log('onFuncionarioSelect', funcionarios['CODIGO_FUNCIONARIO'])
  }

  onDeFuncionarioSelect(funcionarios: any) {
    this.deleteFuncionario(funcionarios.CODIGO_FUNCIONARIO, this.codigo_acompanhamento)
    console.log('onDeFuncionarioSelect', funcionarios.CODIGO_RESIDENTE, this.codigo_acompanhamento)
  }



  reportAcompanhamento() {
    this.acompanhamentoService.reportAcompanhamento(this.codigo_acompanhamento).subscribe(res => {
      this.ns.notify('Relatório emitido com sucesso!')
    })
  }


}
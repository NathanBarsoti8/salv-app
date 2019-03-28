import { NovoAcompanhamentoService } from './novo-acompanhamento.service';
import { Acompanhamento } from './../acompanhamento/acompanhamento.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { trigger, state, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'salv-novo-acompanhamento',
  templateUrl: './novo-acompanhamento.component.html',
  animations: [
    trigger('novo-acompanhamentoAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class NovoAcompanhamentoComponent implements OnInit {




  novoacompanhamentoState = 'ready'

  myForm: FormGroup
  //Variable Declare
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  residentes: any = []
  funcionarios: any = []
  selectedResidentes: any = []
  selectedFuncionarios: any = []
  dropdownSettings: any = []
  dropdownSettingsF: any = []


  novoAcompanhamentoForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private NovoAcompanhamentoService: NovoAcompanhamentoService, ) { }

  ngOnInit() {

    //Formulário Novo Acompanhamento
    this.novoAcompanhamentoForm = this.formBuilder.group({
      residente: this.formBuilder.control('', []),
      data: this.formBuilder.control('', []),
      atividade: this.formBuilder.control('', []),
      funcionario: this.formBuilder.control('', [])
    })


    //Residentes List         


    
    this.NovoAcompanhamentoService.residentes()
      .subscribe(residentes => {
        this.residentes = residentes
        console.log('residente', residentes)
        
        this.residentes =[
          
          {id: this.residentes[1].CODIGO_RESIDENTE, text: JSON.stringify(this.residentes[1].NOME) }
         
        ]
      })
    
    //funcionarios List
    this.NovoAcompanhamentoService.funcionarios()
      .subscribe(funcionarios => {
        this.funcionarios = funcionarios
        console.log('funcionario', funcionarios)

        this.funcionarios = [

          {id: this.funcionarios[1].CODIGO_FUNCIONARIO, text: JSON.stringify(this.funcionarios[1].NOME) }      
        ]
      })




    this.selectedResidentes = []
    this.selectedFuncionarios = []


    
    
          
      this.dropdownSettings = {
      enableSearch: true,
      displayAllSelectedText: true,
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Marcar todos',
      unSelectAlltext: 'Desmarcar todos',
      residentesShowLimit: 10,
      allowSearchFilter: this.ShowFilter
    }


      this.myForm = this.formBuilder.group({
      residente: [this.selectedResidentes],
      funcionario: [this.selectedFuncionarios]

    })

  }

  novoAcompanhamento(acompanhamento: Acompanhamento) {
    console.log(acompanhamento)
  }

  onResidenteSelect(residente: any) {
    console.log('onResidenteSelect', residente)
  }

  onFuncioanrioSelect(funcionarios: any) {
    console.log('onFuncioanrioSelect', funcionarios)
  }

}

//Modules
import { NgModule } from '@angular/core'
import { SharedModule } from './../shared/shared.module'
import { RouterModule, Routes } from '@angular/router'
import { CurrencyMaskModule } from "ng2-currency-mask";

//Components
import { ResidentesComponent } from './residentes.component';
import { ResidenteComponent } from './residente/residente.component';
import { InfosPessoaisComponent } from './residente/infos-pessoais/infos-pessoais.component';
import { InfosFamiliarComponent } from './residente/infos-familiar/infos-familiar.component';
import { InfosConvenioComponent } from './residente/infos-convenio/infos-convenio.component';
import { InfosBeneficiosComponent } from './residente/infos-beneficios/infos-beneficios.component';
import { NovoResidenteComponent } from './novo-residente/novo-residente.component';
import { FamiliarResidenteComponent } from './novo-residente/familiar-residente/familiar-residente.component';
import { ConvenioResidenteComponent } from './novo-residente/convenio-residente/convenio-residente.component';


//Routes
const ROUTES: Routes = [
    { path: '', component: ResidentesComponent },
    { path: 'novo-residente', component: NovoResidenteComponent },
    { path: 'familiar-residente', component: FamiliarResidenteComponent },
    { path: 'convenio-residente', component: ConvenioResidenteComponent },
    
    { path: ':id', component: ResidenteComponent }
]

@NgModule({
    declarations: [
        ResidentesComponent,
        ResidenteComponent,
        InfosFamiliarComponent,
        InfosBeneficiosComponent,
        InfosConvenioComponent,
        InfosPessoaisComponent,
        NovoResidenteComponent,
        FamiliarResidenteComponent,
        ConvenioResidenteComponent
    ],
    imports: [
        SharedModule,
        CurrencyMaskModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class ResidenteModule { }
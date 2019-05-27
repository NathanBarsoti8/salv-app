import { Routes } from "@angular/router";

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component'
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { FirstAccessComponent } from './auth/first-access/first-access.component';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'
import { ResidenteAcompComponent } from './residentes/residente-acomp/residente-acomp.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TelaInicialComponent, canActivate: [AuthGuard] },
    { path: 'esqueci-a-senha', component: ForgetPasswordComponent },
    { path: 'esqueci-a-senha/:token', component: ResetPasswordComponent },
    { path: 'primeiro-acesso/:username', component: FirstAccessComponent },

    { path: 'residente-acomp/:id', component: ResidenteAcompComponent },

    { path: 'convenios', loadChildren: './convenios/convenio.module#ConvenioModule', canActivate: [AuthGuard] },
    { path: 'funcionarios', loadChildren: './funcionarios/funcionario.module#FuncionarioModule', canActivate: [AuthGuard] },
    { path: 'acompanhamentos', loadChildren: './acompanhamentos/acompanhamento.module#AcompanhamentoModule', canActivate: [AuthGuard] },
    { path: 'residentes', loadChildren: './residentes/residente.module#ResidenteModule', canActivate: [AuthGuard] },

    { path: '**', component: NotFoundComponent }
]
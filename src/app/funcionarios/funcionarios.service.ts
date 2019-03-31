import { Dependente } from './funcionario/infos-dependente/dependente.model';
import { SALV_API } from './../app.api';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/observable/forkJoin'
import { Funcionario, Pessoa, Telefone, Telefone_Pessoa, Endereco, Endereco_Pessoa } from './funcionario.model';


@Injectable()
export class FuncionariosService {

    constructor(private http: HttpClient) { }

    funcionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(`${SALV_API}/funcionario`)
    }

    funcionarioById(id: string): Observable<Funcionario> {
        return this.http.get<Funcionario>(`${SALV_API}/funcionario/${id}`)
    }

    dependenteById(id: string): Observable<Dependente[]> {
        return this.http.get<Dependente[]>(`${SALV_API}/dependente/${id}`)
    }

    deleteFuncionario(id: string): Observable<any> {
        return this.http.delete<any>(`${SALV_API}/funcionario/${id}`)
    }

    createNewEmployee(pessoa: Pessoa, telefone: Telefone, endereco: Endereco, funcionario: Funcionario) {
        return this.http.post<Pessoa>(`${SALV_API}/pessoa`, pessoa).switchMap(resPessoa => {
            delete funcionario.PESSOA
            return this.http.post<Telefone>(`${SALV_API}/telefone`, telefone).switchMap(resTelefone => {
                delete funcionario.TELEFONE
                let _rel_tel_pes = {
                    PESSOA_CODIGO: resPessoa.CODIGO,
                    TELEFONE_CODIGO: resTelefone.CODIGO
                }
                return this.http.post<Telefone_Pessoa>(`${SALV_API}/telefone_pessoa`, _rel_tel_pes).switchMap(resTP => {
                    return this.http.post<Endereco>(`${SALV_API}/endereco`, endereco).switchMap(resEndereco => {
                        delete funcionario.ENDERECO
                        let _rel_end_pes = {
                            PESSOA_CODIGO: resPessoa.CODIGO,
                            ENDERECO_CODIGO: resEndereco.CODIGO
                        }
                        return this.http.post<Endereco_Pessoa>(`${SALV_API}/endereco_pessoa`, _rel_end_pes).switchMap(resEP => {
                            funcionario.PESSOA_CODIGO = resPessoa.CODIGO
                            return this.http.post<Funcionario>(`${SALV_API}/funcionario`, funcionario)
                        })
                    })
                })
            })
        })
    }
}
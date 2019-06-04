import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { SALV_API } from './../../app.api'
import { infosAcompanhamento } from './infosAcompanhamento.model'

@Injectable()
export class ProntuarioService {

    constructor(private http: HttpClient) { }

    prontuarioResidente(dates): Observable<Blob> {
        return this.http.post(`${SALV_API}/prontuario`, dates, { responseType: 'blob' })
    }

    infosAcompanhamento(codigoAcompanhamento): Observable<infosAcompanhamento> {
        return this.http.get<infosAcompanhamento>(`${SALV_API}/infos-acompanhamento/${codigoAcompanhamento}`)
    }
}
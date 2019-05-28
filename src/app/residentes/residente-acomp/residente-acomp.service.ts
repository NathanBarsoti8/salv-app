import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { SALV_API } from './../../app.api'

@Injectable()
export class ResidenteAcompanhamentoService {

    constructor(private http: HttpClient) { }

    prontuarioResidente(dates): Observable<Blob> {
        return this.http.post(`${SALV_API}/prontuario`, dates, { responseType: 'blob' })
    }
}
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioPage } from '../models/usuario-page.interface';
import { DaoService } from './dao.service';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private daoService: DaoService,
    private http: HttpClient,
  ) { }

  public listarTodosOsUsuarios(page: number, size: number): Observable<HttpResponse<IUsuarioPage>> {
    return this.daoService.get<IUsuarioPage>(`${AppSettings.RELATORIOS}?page=${page}&size=${size}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
}

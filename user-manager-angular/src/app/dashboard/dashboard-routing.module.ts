import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DetalheUsuarioComponent } from './components/usuario/detalhe-usuario/detalhe-usuario.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'usuarios/detalhe', component: DetalheUsuarioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

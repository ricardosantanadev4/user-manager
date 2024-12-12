import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'dashboard', component: SidenavComponent, children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserKursdetailComponent } from './components/userpanel/user_kursuebersicht/user-kursdetail/user-kursdetail.component';
import { LoginComponent } from './components/adminpanel/login/login.component';
import { AdminKursuebersichtComponent } from './components/adminpanel/admin_uebersicht/admin-kursuebersicht/admin-kursuebersicht.component';
import { AdminTabellenuebersichtComponent } from './components/adminpanel/admin_alle_tabellen/admin-tabellenuebersicht/admin-tabellenuebersicht.component';
import { AdminKursAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-add-form/admin-kurs-add-form.component';
import { AdminKursEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-edit-form/admin-kurs-edit-form.component';
import { AdminKurskategorieAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-add-form/admin-kurskategorie-add-form.component';
import { AdminKurskategorieEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-edit-form/admin-kurskategorie-edit-form.component';
import { AdminKursgruppeAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kursgruppe-add-form/admin-kursgruppe-add-form.component';
import { AdminKursgruppeEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kursgruppe-edit-form/admin-kursgruppe-edit-form.component';
import { UserPositionsdetailComponent } from './components/userpanel/user_kursuebersicht/user-positionsdetail/user-positionsdetail.component';
import { UserPositionsuebersichtComponent } from './components/userpanel/user_kursuebersicht/user-positionsuebersicht/user-positionsuebersicht.component';
import { UserKursuebersichtComponent } from './components/userpanel/user_kursuebersicht/user-kursuebersicht/user-kursuebersicht.component';
import { AdminPositionAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-position-add-form/admin-position-add-form.component';
import { AdminPositionskategorieAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-positionskategorie-add-form/admin-positionskategorie-add-form.component';
import { UserQualifikationenFormComponent } from './components/userpanel/user_karriereplaner/user-qualifikationen-form/user-qualifikationen-form.component';
import { UserAnforderungPositionFormComponent } from './components/userpanel/user_karriereplaner/user-anforderung-position-form/user-anforderung-position-form.component';
import { AdminKompetenzAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kompetenz-add-form/admin-kompetenz-add-form.component';
import { AdminPositionskategorieEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-positionskategorie-edit-form/admin-positionskategorie-edit-form.component';
import { AdminKompetenzEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kompetenz-edit-form/admin-kompetenz-edit-form.component';
import { AdminPositionEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-position-edit-form/admin-position-edit-form.component';
import { AdminPositionsuebersichtComponent } from './components/adminpanel/admin_uebersicht/admin-positionsuebersicht/admin-positionsuebersicht.component';
import { AdminKursbesucheComponent } from './components/adminpanel/admin_alle_tabellen/admin-kursbesuche/admin-kursbesuche.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'uebersicht/kursuebersicht', pathMatch: 'full' },
  { path: 'uebersicht', redirectTo: 'uebersicht/kursuebersicht', pathMatch: 'full' },
  { path: 'uebersicht/kursuebersicht', component: UserKursuebersichtComponent },
  { path: 'uebersicht/positionsuebersicht', component: UserPositionsuebersichtComponent },
  { path: 'kursdetail/:id', component: UserKursdetailComponent},
  { path: 'positionsdetail/:id', component: UserPositionsdetailComponent},
  { path: 'planen', redirectTo: '/planen/eigenkompetenzen', pathMatch: 'full' },
  { path: 'planen/eigenkompetenzen', component: UserQualifikationenFormComponent},
  { path: 'planen/wunschkompetenzen', component: UserAnforderungPositionFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin/uebersicht', redirectTo: '/admin/uebersicht/kursuebersicht', pathMatch: 'full' },
  { path: 'admin/uebersicht/kursuebersicht', component: AdminKursuebersichtComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/uebersicht/positionsuebersicht', component: AdminPositionsuebersichtComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin', redirectTo: '/admin/alleTabellen', pathMatch: 'full' },
  { path: 'admin/alleTabellen', component: AdminTabellenuebersichtComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Kurs/:id', component: AdminKursEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Kurskategorie/:id', component: AdminKurskategorieEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Kursgruppe/:id', component: AdminKursgruppeEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Position/:id', component: AdminPositionEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Positionskategorie/:id', component: AdminPositionskategorieEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/edit_Kompetenz/:id', component: AdminKompetenzEditFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Kurs', component: AdminKursAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Kurskategorie', component: AdminKurskategorieAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Kursgruppe', component: AdminKursgruppeAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Position', component: AdminPositionAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Positionskategorie', component: AdminPositionskategorieAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/add_Kompetenz', component: AdminKompetenzAddFormComponent, 
  canActivate: [AuthGuard]},
  { path: 'admin/kursbesuche', component: AdminKursbesucheComponent, 
  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

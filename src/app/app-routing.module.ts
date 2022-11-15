import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserKursdetailComponent } from './components/userpanel/user_kursuebersicht/user-kursdetail/user-kursdetail.component';
import { UserKarriereplanerFormsComponent } from './components/userpanel/user_karriereplaner/user-karriereplaner-forms/user-karriereplaner-forms.component';
import { LoginComponent } from './components/adminpanel/login/login.component';
import { AdminKursuebersichtComponent } from './components/adminpanel/admin_kursuebersicht/admin-kursuebersicht/admin-kursuebersicht.component';
import { AdminTabellenuebersichtComponent } from './components/adminpanel/admin_alle_tabellen/admin-tabellenuebersicht/admin-tabellenuebersicht.component';
import { AdminKursAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-add-form/admin-kurs-add-form.component';
import { AdminKursEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-edit-form/admin-kurs-edit-form.component';
import { AdminKurskategorieAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-add-form/admin-kurskategorie-add-form.component';
import { AdminKurskategorieEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-edit-form/admin-kurskategorie-edit-form.component';
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


const routes: Routes = [
  { path: '', redirectTo: '/kursuebersicht', pathMatch: 'full' },
  { path: 'kursuebersicht', component: UserKursuebersichtComponent },
  { path: 'positionsuebersicht', component: UserPositionsuebersichtComponent },
  { path: 'kursdetail/:id', component: UserKursdetailComponent},
  { path: 'positionsdetail/:id', component: UserPositionsdetailComponent},
  { path: 'planen', component: UserKarriereplanerFormsComponent},
  { path: 'planen/eigenkompetenzen', component: UserQualifikationenFormComponent},
  { path: 'planen/wunschkompetenzen', component: UserAnforderungPositionFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin/kursuebersicht', component: AdminKursuebersichtComponent},
  { path: 'admin', component: AdminTabellenuebersichtComponent},
  { path: 'admin/edit_Kurs/:id', component: AdminKursEditFormComponent},
  { path: 'admin/edit_Kurskategorie/:id', component: AdminKurskategorieEditFormComponent},
  { path: 'admin/edit_Position/:id', component: AdminPositionEditFormComponent},
  { path: 'admin/edit_Positionskategorie/:id', component: AdminPositionskategorieEditFormComponent},
  { path: 'admin/edit_Kompetenz/:id', component: AdminKompetenzEditFormComponent},
  { path: 'admin/add_Kurs', component: AdminKursAddFormComponent},
  { path: 'admin/add_Kurskategorie', component: AdminKurskategorieAddFormComponent},
  { path: 'admin/add_Position', component: AdminPositionAddFormComponent},
  { path: 'admin/add_Positionskategorie', component: AdminPositionskategorieAddFormComponent},
  { path: 'admin/add_Kompetenz', component: AdminKompetenzAddFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

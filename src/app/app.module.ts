import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHeaderComponent } from './components/userpanel/user-header/user-header.component';
import { UserKursuebersichtComponent } from './components/userpanel/user_kursuebersicht/user-kursuebersicht/user-kursuebersicht.component';
import { UserKursdetailComponent } from './components/userpanel/user_kursuebersicht/user-kursdetail/user-kursdetail.component';
import { UserKarriereplanerFormsComponent } from './components/userpanel/user_karriereplaner/user-karriereplaner-forms/user-karriereplaner-forms.component';
import { LoginComponent } from './components/adminpanel/login/login.component';
import { AdminKursuebersichtComponent } from './components/adminpanel/admin_kursuebersicht/admin-kursuebersicht/admin-kursuebersicht.component';
import { AdminHeaderComponent } from './components/adminpanel/admin-header/admin-header.component';
import { UserQualifikationenFormComponent } from './components/userpanel/user_karriereplaner/user-qualifikationen-form/user-qualifikationen-form.component';
import { UserAnforderungPositionFormComponent } from './components/userpanel/user_karriereplaner/user-anforderung-position-form/user-anforderung-position-form.component';
import { FilterKursPipe } from './pipes/filter-kurs.pipe';
import { AdminTabellenuebersichtComponent } from './components/adminpanel/admin_alle_tabellen/admin-tabellenuebersicht/admin-tabellenuebersicht.component';
import { AdminKursAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-add-form/admin-kurs-add-form.component';
import { AdminKursEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurs-edit-form/admin-kurs-edit-form.component';
import { AdminKurskategorieAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-add-form/admin-kurskategorie-add-form.component';
import { AdminKurskategorieEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kurskategorie-edit-form/admin-kurskategorie-edit-form.component';
import { FilterPositionPipe } from './pipes/filter-position.pipe';
import { UserPositionsdetailComponent } from './components/userpanel/user_kursuebersicht/user-positionsdetail/user-positionsdetail.component';
import { UserPositionsuebersichtComponent } from './components/userpanel/user_kursuebersicht/user-positionsuebersicht/user-positionsuebersicht.component';
import { CommonModule } from '@angular/common';
import { AdminPositionAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-position-add-form/admin-position-add-form.component';
import { AdminPositionskategorieAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-positionskategorie-add-form/admin-positionskategorie-add-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminKompetenzAddFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kompetenz-add-form/admin-kompetenz-add-form.component';
import { AdminPositionskategorieEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-positionskategorie-edit-form/admin-positionskategorie-edit-form.component';
import { AdminKompetenzEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-kompetenz-edit-form/admin-kompetenz-edit-form.component';
import { AdminPositionEditFormComponent } from './components/adminpanel/admin_alle_tabellen/admin-position-edit-form/admin-position-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    UserKursuebersichtComponent,
    UserKursdetailComponent,
    UserKarriereplanerFormsComponent,
    LoginComponent,
    AdminKursuebersichtComponent,
    AdminHeaderComponent,
    UserQualifikationenFormComponent,
    UserAnforderungPositionFormComponent,
    FilterKursPipe,
    AdminTabellenuebersichtComponent,
    AdminKursAddFormComponent,
    AdminKursEditFormComponent,
    AdminKurskategorieAddFormComponent,
    AdminKurskategorieEditFormComponent,
    FilterPositionPipe,
    UserPositionsdetailComponent,
    UserPositionsuebersichtComponent,
    AdminPositionAddFormComponent,
    AdminPositionskategorieAddFormComponent,
    AdminKompetenzAddFormComponent,
    AdminPositionskategorieEditFormComponent,
    AdminKompetenzEditFormComponent,
    AdminPositionEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

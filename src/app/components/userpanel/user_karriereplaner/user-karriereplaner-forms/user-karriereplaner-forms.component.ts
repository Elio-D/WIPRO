import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-karriereplaner-forms',
  templateUrl: './user-karriereplaner-forms.component.html',
  styleUrls: ['./user-karriereplaner-forms.component.css']
})
export class UserKarriereplanerFormsComponent implements OnInit {



  constructor(
   
  ) { 
   
  }

  show_qualifikationen = false;

  show_anforderungen_position = true;

  ngOnInit(): void {
  }

  show_was_passt_zu_mier(){
    this.show_qualifikationen = true;
    this.show_anforderungen_position = false;
  }

  show_was_waere_moeglich(){
    this.show_qualifikationen = false;
    this.show_anforderungen_position = true;
  }
}

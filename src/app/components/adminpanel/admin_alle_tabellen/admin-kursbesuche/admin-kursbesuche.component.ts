import { Component, OnInit } from '@angular/core';

import { Kurslog } from 'src/app/interfaces/kurslog';

import { KurseService } from 'src/app/services/kurse.service';

@Component({
  selector: 'app-admin-kursbesuche',
  templateUrl: './admin-kursbesuche.component.html',
  styleUrls: ['./admin-kursbesuche.component.css']
})
export class AdminKursbesucheComponent implements OnInit {
  logsKursbesuche: Kurslog[] = [];
  countLogsKursbesuche: any[] = [];

  constructor(private kurseService: KurseService) { }

  ngOnInit(): void {
    this.getDate();
  }

  /**
  * Holt alle Kurslogs via Kursservice
  */
  getDate() {
    this.kurseService.getAllKursLogs().subscribe((kurselogs => {
      this.logsKursbesuche = kurselogs;
      this.kurseService.getAllKursLogsCounted().subscribe((kurselogs => {
        this.countLogsKursbesuche = kurselogs;
      }));
    }));

  }

  /**
  * Löscht alle Kurslogs einer bestimmten id
  * @param id Alle Kurslogs dieser ID werden gelöscht
  */
  deleteKurslogs(id: number) {
    this.kurseService.deleteKurslogs(id).subscribe((data: any) => {
    });
    this.getDate()
  }

  /**
  * Filtert alle Logs nach einer gewissen ID
  * @param id ID nachwelcher gefiltert wird
  * @return Logs-Array aller Logs dieser ID
  */
  getKurslogsByID(id: number): any[] {
    const logs: any[] = this.logsKursbesuche.filter(log => log.id == id);
    return logs;
  }

  /**
  * Convertiert String in Datumiltert alle Logs nach einer gewissen ID
  * @param timestamp Zahlenstring, welcher in lesbares Datum umgewandelt werden soll
  * @return String mit lesbarem Datum
  */
  timeConverter(timestamp: string){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if(sec <= 9) {
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':0' + sec ;
    } else {
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    }
    return time;
  }

  /**
  * Entfernt alle Leerschläge eines Strings
  * Wird benötigt, um ID-Attribute-Namen ohne Leerschläge zu garantieren
  * @param string Der String, welcher von allen Leerschlägen befreit werden solll
  * @returns Den selben String ohne Leerschläge
  */
  trimString(string: string){
    return string.replace(/\s/g, "")
  }
}

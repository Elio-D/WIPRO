import { Kurs } from '../interfaces/kurs';

export const KURSE: Kurs[] = [
    { 
        "id": 1, 
        "kursname": "kurs1", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 1, "kurskategoriename": "kK1", "spalte": 1}, 
        "kurskompetenzen_erlerndend": [   
            { "id": 5, "kompetenzname": "kompetenz5"},
            { "id": 6, "kompetenzname": "kompetenz6"}
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 2, 
        "kursname": "kurs2", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 2, "kurskategoriename": "kK2", "spalte": 2},
        "kurskompetenzen_erlerndend": [   
            { "id": 3, "kompetenzname": "kompetenz3"},
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 3, 
        "kursname": "kurs3", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 3, "kurskategoriename": "kK3", "spalte": 3},
        "kurskompetenzen_erlerndend": [  
            { "id": 3, "kompetenzname": "kompetenz3"},
            { "id": 4, "kompetenzname": "kompetenz4"}
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 4, 
        "kursname": "kurs4", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 4, "kurskategoriename": "kK4", "spalte": 4},
        "kurskompetenzen_erlerndend": [   
            { "id": 1, "kompetenzname": "kompetenz1"}
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 5, 
        "kursname": "kurs5", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 5, "kurskategoriename": "kK5", "spalte": 1},
        "kurskompetenzen_erlerndend": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"},
            { "id": 3, "kompetenzname": "kompetenz3"},
            { "id": 4, "kompetenzname": "kompetenz4"},
            
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 6, 
        "kursname": "kurs6", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 6, "kurskategoriename": "kK6", "spalte": 2},
        "kurskompetenzen_erlerndend": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"}
        ], 
        "link": "https://fff.ch" 
    },
    { 
        "id": 7, 
        "kursname": "kurs7", 
        "kursbeschreibung": "testbeschreibung", 
        "kurskategorie": {"id": 1, "kurskategoriename": "kK1", "spalte": 1},
        "kurskompetenzen_erlerndend": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"}
        ], 
        "link": "https://fff.ch" 
    }
    
];
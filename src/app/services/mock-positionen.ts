import { Position } from '../interfaces/position';
import { Kompetenz } from '../interfaces/kompetenz';

export const POSITIONEN: Position[] = [
    {   
        "id": 1,
        "positionsname": "positon1",
        "positionskategorie": {"id": 1, "positionskategoriename": "kP1", "spalte": 1},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"}
        ],
        "passend_zu_branche": 1
    },
    {   
        "id": 2,
        "positionsname": "positon2",
        "positionskategorie": {"id": 2, "positionskategoriename": "kP2", "spalte": 2},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"}
        ],
        "passend_zu_branche": 1
    },
    {   
        "id": 3,
        "positionsname": "positon3",
        "positionskategorie": {"id": 3, "positionskategoriename": "kP3", "spalte": 3},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 1, "kompetenzname": "kompetenz1"},
            { "id": 2, "kompetenzname": "kompetenz2"}
        ],
        "passend_zu_branche": 1
    },
    {   
        "id": 4,
        "positionsname": "positon4",
        "positionskategorie": {"id": 4, "positionskategoriename": "kP4", "spalte": 4},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 4, "kompetenzname": "kompetenz4"},
            { "id": 5, "kompetenzname": "kompetenz5"}
        ],
        "passend_zu_branche": 1
    },
    {   
        "id": 5,
        "positionsname": "positon5",
        "positionskategorie": {"id": 5, "positionskategoriename": "kP5", "spalte": 3},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 4, "kompetenzname": "kompetenz4"},
            { "id": 5, "kompetenzname": "kompetenz5"}
        ],
        "passend_zu_branche": 0
    },
    {   
        "id": 6,
        "positionsname": "positon6",
        "positionskategorie": {"id": 6, "positionskategoriename": "kP6", "spalte": 4},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 4, "kompetenzname": "kompetenz4"},
            { "id": 5, "kompetenzname": "kompetenz5"}
        ],
        "passend_zu_branche": 0
    },
    {   
        "id": 7,
        "positionsname": "positon7",
        "positionskategorie": {"id": 6, "positionskategoriename": "kP6", "spalte": 5},
        "positionsbeschreibung": "beschreibung k1",
        "positionskompetenzen": [   
            { "id": 6, "kompetenzname": "kompetenz6"}
        ],
        "passend_zu_branche": 0
    }

];
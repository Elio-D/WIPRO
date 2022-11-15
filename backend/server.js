const express = require("express");
const server = express();
const cors = require('cors');
const mysql = require('mysql');
const { json } = require("express");

server.use(cors({
    origin: 'http://localhost:4200',
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));

  server.use(express.json());
  server.use(express.urlencoded());

  var connection = mysql.createConnection({
    host: "147.88.62.39",
    user: "wipro",
    password: "a123456b"
  });

  connection.connect(function(err) {
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
    }
    console.log('Connected')  
  });
//----Login Token-----

/*server.get('/userAdminBerechtigung', authenticateToken, async (req, res) => {
    //Lesen der aktuellen Benutzerberechtigung. Ausgabe True falls ein Admin (nur mit verifiziertem Token).
  });
  
  //verifyUser
  server.post('/login', async (req, res) => {
    //Einloggen in einen bestehenden Account (erstellt notwendiges Token).
  });
  
  //function authenticateToken(req, res, next) {
  //}
  
  //function generateAccessToken(user) {}
  //}*/

//----Kurs-----

server.get('/kurse', async (req, res) => {
  //Lesen aller Kurse aus der Datenbank.
  //var sql = 'SELECT kurs.id, kurs.kursname, kurs.kursbeschreibung, kurs.kurskategorie, kurs.kurskompetenzen_erlerndend, kurs.link FROM wipro_hs22.kurs';
  var sql = "SELECT DISTINCT kurs.id, kurs.kursname, kurs.kursbeschreibung, JSON_OBJECT('id', kkat.id, 'spalte', kkat.spalte, 'kurskategoriename', kkat.kurskategoriename) AS kurskategorie, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.kurs_kompetenz AS k_komp ON komp.id = k_komp.idKompetenz "+
  "WHERE k_komp.idKurs = kurs.id) AS kurskompetenzen_erlerndend, kurs.link FROM wipro_hs22.kurs "+
  "JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kurs.id = k_k.idKurs "+
  "JOIN wipro_hs22.kurskategorie AS kkat ON k_k.idKurskategorie = kkat.id;";
  
    connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      var obj = jsonParserKurs(result);
      res.send(obj);
  
    } else {
  
      res.status(404);
  
    }
  
    res.end();
  });
});


function jsonParserKurs(stringValue) {

  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  objectValue.forEach(element => {
    element.kurskategorie = JSON.parse(element.kurskategorie);
    element.kurskompetenzen_erlerndend = JSON.parse(element.kurskompetenzen_erlerndend);
  });
  return objectValue;
}

server.get('/kursByID/:id', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  "SELECT DISTINCT kurs.id, kurs.kursname, kurs.kursbeschreibung, JSON_OBJECT('id', kkat.id, 'spalte', kkat.spalte, 'kurskategoriename', kkat.kurskategoriename) AS kurskategorie, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.kurs_kompetenz AS k_komp ON komp.id = k_komp.idKompetenz "+
  "WHERE k_komp.idKurs = kurs.id) AS kurskompetenzen_erlerndend, kurs.link FROM wipro_hs22.kurs "+
  "JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kurs.id = k_k.idKurs "+
  "JOIN wipro_hs22.kurskategorie AS kkat ON k_k.idKurskategorie = kkat.id WHERE kurs.id =?;";

  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      var obj = jsonParserKurs(result)[0]
      res.send(obj);
  
    } else {
  
      res.status(404);
  
    }
  
    res.end();
  });
});

/*server.get('/kurse/:kategorie', async (req, res) => {
  //Lesen aller Kurse einer bestimmten Kategorie.
  var sql =  'SELECT * FROM wipro_hs22.kurs WHERE Kurskategorie=?';
  var res = connection.query(sql, [Kurskategorie], function (err, result, fields) {
    if (err) throw err;
    return result;
  });
  return res;
});*/
  
server.put('/kurs_update', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'UPDATE wipro_hs22.kurs SET kurs.kursname=?, kurs.kursbeschreibung=?, kurs.link=? WHERE kurs.id=?';
  connection.query(sql, [req.body.kursname, req.body.kursbeschreibung, req.body.link, req.body.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.put('/kurs_update_kat/:id', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'UPDATE wipro_hs22.kurs_kurskategorie SET kurs_kurskategorie.idKurskategorie=? WHERE kurs_kurskategorie.idKurs=?';
  console.log(req.body.kurskategorie);
  connection.query(sql, [req.body.kurskategorie.id, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/kurs_add', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'INSERT INTO wipro_hs22.kurs (kurs.kursname, kurs.kursbeschreibung, kurs.link) ' +
  'VALUES (?, ?, ?)';
  connection.query(sql, [req.body.kursname, req.body.kursbeschreibung, req.body.link], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/kurs_add_kat/:id', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'INSERT INTO wipro_hs22.kurs_kurskategorie (kurs_kurskategorie.idKurs, kurs_kurskategorie.idKurskategorie) ' +
  'VALUES (?, ?)';
  console.log(req.body.kurskategorie.id);
  connection.query(sql, [req.params.id, req.body.kurskategorie.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/kurs_add_komp/:id', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'INSERT INTO wipro_hs22.kurs_kompetenz (kurs_kompetenz.idKurs, kurs_kompetenz.idKompetenz) ' +
  'VALUES (?, ?)';
  connection.query(sql, [req.body.id, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.delete('/kurs_delete/:id', async (req, res) => {
  //Löschen eines bestehenden Kurses aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql =  'DELETE FROM wipro_hs22.kurs WHERE idKurs=?';
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(obj);
    } else {
      res.status(404);
    }
    res.end();
  });
});


//----Kurskategorie-----

server.get('/kurskategorien', async (req, res) => {
  //Lesen aller Kurskategorien aus der Datenbank.
  var sql =  'SELECT * FROM wipro_hs22.kurskategorie';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.get('/kurskategorien_valid', async (req, res) => {
  //Lesen aller Kurskategorien, welche Kurse zugeordnet haben aus der Datenbank.
  var sql =  'SELECT DISTINCT kkat.id, kkat.spalte, kkat.kurskategoriename FROM wipro_hs22.kurskategorie AS kkat '+
  'JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kkat.id = k_k.idKurskategorie';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.get('/kurskategorien/:spalte', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  'SELECT * FROM wipro_hs22.kurskategorie WHERE kurskategorie.spalte=?';
  connection.query(sql, [req.params.spalte], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});
  
server.get('/kurskategorieByID/:id', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  'SELECT * FROM wipro_hs22.kurskategorie WHERE kurskategorie.id=?';

  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result[0]);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/kurskategorie_add', async (req, res) => {
  //Hinzufügen einer neuen Kurskategorie in die Datenbank (nur mit verifiziertem Token).
  var sql = "INSERT INTO wipro_hs22.kurskategorie (kurskategorie.spalte, kurskategorie.kurskategoriename) VALUES (?, ?)";
  connection.query(sql, [req.body.spalte, req.body.kurskategoriename], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.put('/kurskategorie_update/:id', async (req, res) => {
  //Update einer bestehenden Kurskategorie anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'UPDATE wipro_hs22.kurskategorie SET kurskategorie.kurskategoriename=?, kurskategorie.spalte=? WHERE kurskategorie.id=?';
  connection.query(sql, [req.body.kurskategoriename, req.body.spalte, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  }); 
})

server.delete('/kurskategorie_delete/:id', async (req, res) => {
  //Löschen einer bestehenden Kurskategorie aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.kurskategorie WHERE kurskategorie.id=?';
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//----Positionen-----

server.get('/positionen', async (req, res) => {
  //Lesen aller Berufe aus der Datenbank.
  var sql = "SELECT DISTINCT position.id, position.positionsname, "+
  "JSON_OBJECT('id', pkat.id, 'positionskategoriename', pkat.positionskategoriename, 'spalte', pkat.spalte) AS positionskategorie, position.positionsbeschreibung, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.position_kompetenz AS p_komp ON komp.id = p_komp.idKompetenz "+
  "WHERE p_komp.idPosition = position.id) AS positionskompetenzen, passend_zu_branche FROM wipro_hs22.position "+
  "JOIN wipro_hs22.position_positionskategorie AS p_p ON position.id = p_p.idPosition "+
  "JOIN wipro_hs22.positionskategorie AS pkat ON p_p.idPositionskategorie = pkat.id;";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      var obj = jsonParserPosition(result);
      res.send(obj);
    } else {
      res.status(404);
    }
    res.end();
  });
});

function jsonParserPosition(stringValue) {

  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  objectValue.forEach(element => {
    element.positionskategorie = JSON.parse(element.positionskategorie);
    element.positionskompetenzen = JSON.parse(element.positionskompetenzen);
  });
  return objectValue; 
}

server.get('/positionByID/:id', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  "SELECT DISTINCT position.id, position.positionsname, "+
  "JSON_OBJECT('id', pkat.id, 'positionskategoriename', pkat.positionskategoriename, 'spalte', pkat.spalte) AS positionskategorie, position.positionsbeschreibung, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.position_kompetenz AS p_komp ON komp.id = p_komp.idKompetenz "+
  "WHERE p_komp.idPosition = position.id) AS positionskompetenzen, passend_zu_branche FROM wipro_hs22.position "+
  "JOIN wipro_hs22.position_positionskategorie AS p_p ON position.id = p_p.idPosition "+
  "JOIN wipro_hs22.positionskategorie AS pkat ON p_p.idPositionskategorie = pkat.id WHERE position.id =?;";

  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      var obj = jsonParserPosition(result)[0]
      res.send(obj);
  
    } else {
  
      res.status(404);
  
    }
  
    res.end();
  });
});

  
server.put('/position_update/:id', async (req, res) => {
  //Update eines bestehenden Berufs anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'UPDATE wipro_hs22.position SET position.positionsname=?, position.positionsbeschreibung=?, position.passend_zu_branche=? WHERE position.id=?';
  connection.query(sql, [req.body.positionsname, req.body.positionsbeschreibung, req.body.passend_zu_branche, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.put('/position_update_kat/:id', async (req, res) => {
  
  //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
  var sql =  'UPDATE wipro_hs22.position_positionskategorie SET position_positionskategorie.idPositionskategorie=? WHERE position_positionskategorie.idPosition=?';
  console.log(req.body.kurskategorie);
  connection.query(sql, [req.body.positionskategorie.id, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/position_add', async (req, res) => {
    //Hinzufügen eines neuen Berufs in die Datenbank (nur mit verifiziertem Token).
    var sql = 'INSERT INTO wipro_hs22.position (position.positionsname, position.positionsbeschreibung, position.passend_zu_branche) VALUES (?, ?, ?)';
    connection.query(sql, [req.body.positionsname, req.body.positionsbeschreibung, req.body.passend_zu_branche], function (err, result, fields) {
      if (err) throw err;
      if (result) {
        console.log(result);
        res.send(result);
      } else {
        res.status(404);
      }
      res.end();
    });
  });

  server.post('/position_add_kat/:id', async (req, res) => {
  
    //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
    var sql =  'INSERT INTO wipro_hs22.position_positionskategorie (position_positionskategorie.idPosition, position_positionskategorie.idPositionskategorie) ' +
    'VALUES (?, ?)';
    connection.query(sql, [req.params.id, req.body.positionskategorie.id], function (err, result, fields) {
      if (err) throw err;
      if (result) {
        console.log(result);
        res.send(result);
      } else {
        res.status(404);
      }
      res.end();
    });
  });
  
  server.post('/position_add_komp/:id', async (req, res) => {
    
    //Hinzufügen eines neuen Kurses in die Datenbank (nur mit verifiziertem Token).
    var sql =  'INSERT INTO wipro_hs22.position_kompetenz (position_kompetenz.idPosition, position_kompetenz.idKompetenz) ' +
    'VALUES (?, ?)';
    connection.query(sql, [req.body.id, req.params.id], function (err, result, fields) {
      if (err) throw err;
      if (result) {
        console.log(result);
        res.send(result);
      } else {
        res.status(404);
      }
      res.end();
    });
  });

server.delete('/position_delete/:id', async (req, res) => {
  //Löschen eines bestehenden Berufs aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.position WHERE position.id=?'
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//----Positionskategorie----
server.get('/positionskategorien', async (req, res) => {
  //Lesen aller Berufe aus der Datenbank.
  var sql = 'SELECT * FROM wipro_hs22.positionskategorie';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.get('/positionskategorien/:spalte', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  'SELECT * FROM wipro_hs22.positionskategorie WHERE positionskategorie.spalte=?';
  connection.query(sql, [req.params.spalte], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/positionskategorie_add', async (req, res) => {
  console.log(req.body.spalte);
  //Hinzufügen einer neuen Kurskategorie in die Datenbank (nur mit verifiziertem Token).
  var sql = "INSERT INTO wipro_hs22.positionskategorie (positionskategorie.spalte, positionskategorie.positionskategoriename) VALUES (?, ?)";
  connection.query(sql, [req.body.spalte, req.body.positionskategoriename], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.put('/positionskategorie_update/:id', async (req, res) => {
  //Update einer bestehenden Kurskategorie anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'UPDATE wipro_hs22.positionskategorie SET positionskategorie.positionskategoriename=?, positionskategorie.spalte=? WHERE positionskategorie.id=?';
  connection.query(sql, [req.body.positionskategoriename, req.body.spalte, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  }); 
})

server.delete('/positionskategorie_delete/:id', async (req, res) => {
  //Löschen einer bestehenden Kurskategorie aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.positionskategorie WHERE positionskategorie.id=?';
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.get('/positionskategorieByID/:id', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  'SELECT * FROM wipro_hs22.positionskategorie WHERE positionskategorie.id=?';
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result[0]);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//----Berufsanforderungen-----

server.get('/kompetenzen', async (req, res) => {
  
  //Lesen aller Berufsanforderungen aus der Datenbank.
  var sql = 'SELECT * FROM wipro_hs22.kompetenz';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.get('/kompetenzByID/:id', async (req, res) => {
  //Lesen aller Kurskategorien einer bestimmten Spalte.
  var sql =  'SELECT * FROM wipro_hs22.kompetenz WHERE kompetenz.id=?';

  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result[0]);
    } else {
      res.status(404);
    }
    res.end();
  });
});
  
server.put('/kompetenz_update/:id', async (req, res) => {
  //Update einer bestehenden Berufsanforderung anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'UPDATE wipro_hs22.kompetenz SET kompetenz.kompetenzname=? WHERE kompetenz.id=?';
  connection.query(sql, [req.body.kompetenzname, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.post('/kompetenz_add', async (req, res) => {
  //Hinzufügen einer neuen Berufsanforderung in die Datenbank (nur mit verifiziertem Token).
  var sql = 'INSERT INTO wipro_hs22.kompetenz (kompetenz.kompetenzname) VALUES (?)';
  connection.query(sql, [req.body.kompetenzname], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});


server.delete('/kompetenz_delete/:id', async (req, res) => {
  //Löschen einer bestehenden Berufsanforderung aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.kompetenz WHERE kompetenz.id=?'; 
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.delete('/kurs_komp_delete/:id', async (req, res) => {
  //Löschen aller Kompetenzen eines Kurses (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.kurs_kompetenz WHERE kurs_kompetenz.idKurs=?'; 
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

server.delete('/position_komp_delete/:id', async (req, res) => {
  //Löschen aller Kompetenzen eines Kurses (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.position_kompetenz WHERE idPosition=?'; 
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

  //------------------------------------

  server.listen(4566, () => {
    console.log("Backend Karriereplaner is running on 4566");
  });
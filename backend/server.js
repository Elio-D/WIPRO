require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require("express");

server.use(cors({
    //origin: 'http://wipro-hs22-mstrebel.enterpriselab.ch',
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
    if(err) {
      console.log('error when connecting to db:', err);
    }
    console.log('Connected')  
  });

//----Login Token-----

async function getUser(username) {
  var user = {"Username": "", "Password": ""}
  var sql = "SELECT * FROM wipro_hs22.user WHERE user.Username=?";
  await connection.query(sql, username, function (err, result, fields) {
    user.Username = result[0].Username;
    user.Password = result[0].Password;
    console.log(user)
    return user;
  });
}

//Benutzer überprüfen
server.post('/login', async (req, res) => {

  var user = {"Username": "", "Password": ""}

  var sql = "SELECT * FROM wipro_hs22.user WHERE user.Username=?";
  connection.query(sql, [req.body.Username], function (err, result, fields) {
  if (err) {
    throw err;
    return res.status(400).send({
      msg: err
    });
  }
  if (!result.length) {
    return res.status(401).send({
      msg: 'Username or password is incorrect!'
    });
  }
  // check password
  bcrypt.compare(
    req.body.Password,
    result[0].Password,
    (bErr, bResult) => {
      // wrong password
      if (bErr) {
        throw bErr;
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      if (bResult) {
        const token = generateAccessToken({
          username: result[0].Username,
          password: result[0].Password
        });
        return res.status(200).send({
          msg: 'Logged in!',
          token,
          user: result[0]
        });
      }
      return res.status(401).send({
        msg: 'Username or password is incorrect!'
      });
    });
  });
});
  

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}
  
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

//----Kurs-----

server.get('/kurse', async (req, res) => {

  //Lesen aller Kurse aus der Datenbank
  var sql = "SELECT DISTINCT kurs.id, kurs.kursname, kurs.kursbeschreibung, "+
  "JSON_OBJECT('id', kkat.id, 'spalte', kkat.spalte, 'kurskategoriename', kkat.kurskategoriename) AS kurskategorie, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.kurs_kompetenz AS k_komp ON komp.id = k_komp.idKompetenz "+
  "WHERE k_komp.idKurs = kurs.id) AS kurskompetenzen_erlerndend, kurs.link FROM wipro_hs22.kurs "+
  "JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kurs.id = k_k.idKurs "+
  "JOIN wipro_hs22.kurskategorie AS kkat ON k_k.idKurskategorie = kkat.id;";
    connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      console.log(result)
      var obj = jsonParserKurs(result); //Parsing von JSON-Antwort
      console.log(obj)
      res.send(obj);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Wandelt die verschachtelten Elemente der SQL-Abfrage ebenfalls ins JSON FOrmat um (Daten sind nur so in Kurs Objekt umwandelbar)
function jsonParserKurs(stringValue) {

  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  objectValue.forEach(element => {
    element.kurskategorie = JSON.parse(element.kurskategorie);
    element.kurskompetenzen_erlerndend = JSON.parse(element.kurskompetenzen_erlerndend);
  });
  return objectValue;
}

/*//Lesen aller Kurse aus der Datenbank.
server.get('/kurse_gruppe', async (req, res) => {

  var sql = "SELECT DISTINCT kurs.id, kurs.kursname, kurs.kursbeschreibung, JSON_OBJECT('id', kkat.id, 'spalte', kkat.spalte, 'kurskategoriename', kkat.kurskategoriename) AS kurskategorie, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.kurs_kompetenz AS k_komp ON komp.id = k_komp.idKompetenz "+
  "WHERE k_komp.idKurs = kurs.id) AS kurskompetenzen_erlerndend, kurs.link, kursreihenfolge.idKursgruppe, kursreihenfolge.Abfolge FROM wipro_hs22.kurs "+
  "JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kurs.id = k_k.idKurs "+
  "JOIN wipro_hs22.kurskategorie AS kkat ON k_k.idKurskategorie = kkat.id "+
  "JOIN wipro_hs22.kursreihenfolge ON kurs.id = kursreihenfolge.idKurs;";
  
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
});*/

//Lesen eines Kurs basierend auf der Kurs-ID
server.get('/kursByID/:id', async (req, res) => {

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

//Lesen aller Kurse einer Kursgruppe
server.get('/kursByGruppe/:group', async (req, res) => {

  var sql =  "SELECT DISTINCT kurs.id, kurs.kursname, kurs.kursbeschreibung, JSON_OBJECT('id', kkat.id, 'spalte', kkat.spalte, 'kurskategoriename', kkat.kurskategoriename) AS kurskategorie, "+
  "(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', komp.id, 'kompetenzname', komp.Kompetenzname)) FROM wipro_hs22.kompetenz AS komp "+
  "JOIN wipro_hs22.kurs_kompetenz AS k_komp ON komp.id = k_komp.idKompetenz "+
  "WHERE k_komp.idKurs = kurs.id) AS kurskompetenzen_erlerndend, kurs.link FROM wipro_hs22.kurs "+
  "JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kurs.id = k_k.idKurs "+
  "JOIN wipro_hs22.kurskategorie AS kkat ON k_k.idKurskategorie = kkat.id "+
  "JOIN wipro_hs22.kursreihenfolge AS k_reihe ON kurs.id = k_reihe.idKurs "+
  "WHERE k_reihe.idKursgruppe=? ORDER BY k_reihe.Abfolge ASC;";
  connection.query(sql, [req.params.group], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      var obj = jsonParserKurs(result) //Parsing von JSON-Antwort
      res.send(obj);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Anpassen eines Kurs anhand seiner ID  
server.put('/kurs_update', authenticateToken, async (req, res) => {
  
  var sql =  'UPDATE wipro_hs22.kurs SET kurs.kursname=?, kurs.kursbeschreibung=?, kurs.link=? WHERE kurs.id=?';
  connection.query(sql, [req.body.kursname, req.body.kursbeschreibung, req.body.link, req.body.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Anpassen der Kurskategorie eines Kurs anhand seiner ID
server.put('/kurs_update_kat/:id', authenticateToken, async (req, res) => {

  var sql =  'UPDATE wipro_hs22.kurs_kurskategorie SET kurs_kurskategorie.idKurskategorie=? WHERE kurs_kurskategorie.idKurs=?';
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

//Hinzufügen eines neuen Kurs
server.post('/kurs_add', authenticateToken, async (req, res) => {

  var sql =  'INSERT INTO wipro_hs22.kurs (kurs.kursname, kurs.kursbeschreibung, kurs.link) ' +
  'VALUES (?, ?, ?)';
  connection.query(sql, [req.body.kursname, req.body.kursbeschreibung, req.body.link], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Hinzufügen einer Kurskategorie zu einem Kurs
server.post('/kurs_add_kat/:id', authenticateToken, async (req, res) => {

  var sql =  'INSERT INTO wipro_hs22.kurs_kurskategorie (kurs_kurskategorie.idKurs, kurs_kurskategorie.idKurskategorie) ' +
  'VALUES (?, ?)';
  connection.query(sql, [req.params.id, req.body.kurskategorie.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Hinzufügen einer Kompetenz zu einem Kurs
server.post('/kurs_add_komp/:id', authenticateToken, async (req, res) => {

  var sql =  'INSERT INTO wipro_hs22.kurs_kompetenz (kurs_kompetenz.idKurs, kurs_kompetenz.idKompetenz) ' +
  'VALUES (?, ?)';
  connection.query(sql, [req.body.id, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Löschen eines bestimmten Kurs anhand seiner ID
server.delete('/kurs_delete/:id', authenticateToken, async (req, res) => {

  var sql =  'DELETE FROM wipro_hs22.kurs WHERE kurs.id=?';
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


//----Kurskategorie-----

//Lesen aller Kurskategorien aus der Datenbank
server.get('/kurskategorien', async (req, res) => {
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

/*//Lesen aller Kurskategorien, welche Kurse zugeordnet haben
server.get('/kurskategorien_valid', async (req, res) => {

  var sql = 'SELECT DISTINCT kkat.id, kkat.spalte, kkat.kurskategoriename FROM wipro_hs22.kurskategorie AS kkat '+
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
});*/

//Lesen aller Kurskategorien, welche Kurse zugeordnet anhand ihrer Spalte
server.get('/kurskategorien_valid/:spalte', async (req, res) => {

  var sql =  'SELECT DISTINCT kkat.id, kkat.spalte, kkat.kurskategoriename FROM wipro_hs22.kurskategorie AS kkat '+
  'JOIN wipro_hs22.kurs_kurskategorie AS k_k ON kkat.id = k_k.idKurskategorie WHERE kkat.spalte=?';
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

//Lesen aller Kurskategorien einer bestimmten Spalte.
server.get('/kurskategorien/:spalte', async (req, res) => {

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
  
//Lesen einer Kurskategorie anhand ihrer ID
server.get('/kurskategorieByID/:id', async (req, res) => {

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

//Update einer bestehenden Kurskategorie anhand ihrer ID
server.put('/kurskategorie_update/:id', authenticateToken, async (req, res) => {

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
});

//Hinzufügen einer neuen Kurskategorie
server.post('/kurskategorie_add', authenticateToken, async (req, res) => {
  
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

//Löschen einer bestehenden Kurskategorie anhand ihrer ID
server.delete('/kurskategorie_delete/:id', authenticateToken, async (req, res) => {

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


//----Kursgruppe----

//Lesen aller Kursgruppen
server.get('/kursgruppen', async (req, res) => {

  var sql =  'SELECT kursgruppe.id, kursgruppe.kursgruppenname, NULL as kursreihenfolge FROM wipro_hs22.kursgruppe';
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

//Lesen einer Kursgruppe anhand ihrer ID
server.get('/kursgruppeByID/:id', async (req, res) => {

  var sql =  'SELECT kursgruppe.id, kursgruppe.kursgruppenname, NULL as kursreihenfolge FROM wipro_hs22.kursgruppe WHERE kursgruppe.id=?';
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

//Anpassen einer bestehenden Kursgruppe
server.put('/kursgruppe_update/:id', authenticateToken, async (req, res) => {

  var sql = 'UPDATE wipro_hs22.kursgruppe SET kursgruppe.kursgruppenname=? WHERE kursgruppe.id=?';
  connection.query(sql, [req.body.kursgruppenname, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  }); 
});

//Hinzufügen einer neuen Kursgruppe
server.post('/kursgruppe_add', authenticateToken, async (req, res) => {

  var sql = "INSERT INTO wipro_hs22.kursgruppe (kursgruppe.kursgruppenname) VALUES (?)";
  connection.query(sql, [req.body.kursgruppenname], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Hinzufügen von Kursen in die Kursgruppe anhand ihrer ID in der korrekten Reihenfolge (Abfolge)
server.post('/kursgruppe_add_kurse/:id/:count', authenticateToken, async (req, res) => {

  var sql = "INSERT INTO wipro_hs22.kursreihenfolge (kursreihenfolge.idKurs, kursreihenfolge.idKursgruppe, kursreihenfolge.Abfolge) VALUES (?, ?, ?)";
  connection.query(sql, [req.params.id, req.body.id, req.params.count], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Löschen einer bestehenden Kursgruppe
server.delete('/kursgruppe_delete/:id', authenticateToken, async (req, res) => {

  var sql = 'DELETE FROM wipro_hs22.kursgruppe WHERE kursgruppe.id=?';
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

//Löschen aller Kurse aus der Kursgruppe anhand der Kursgruppen ID
server.delete('/kursgruppe_delete_kurse/:id', authenticateToken, async (req, res) => {

  var sql = 'DELETE FROM wipro_hs22.kursreihenfolge WHERE kursreihenfolge.idKursgruppe=?';
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

//Löschen eines einzelnen Kurs aus der Kursgruppe anhand der Kurs und Kursgruppen ID
server.delete('/kursdelete_kursgruppe/:id/:kurs', authenticateToken, async (req, res) => {
  //Löschen einer bestehenden Kurskategorie aus der Datenbank anhand dessen ID (nur mit verifiziertem Token).
  var sql = 'DELETE FROM wipro_hs22.kursreihenfolge WHERE kursreihenfolge.idKurs=? AND kursreihenfolge.idKursgruppe=?';
  connection.query(sql, [req.params.kurs, req.params.id], function (err, result, fields) {
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

//Lesen aller Positionen
server.get('/positionen', async (req, res) => {

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
      var obj = jsonParserPosition(result); //JSON-Parsing von Resultat
      res.send(obj);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Wandelt die verschachtelten Elemente der SQL-Abfrage ebenfalls ins JSON Format um (Daten nur so in Positions Objekt umwandelbar)
function jsonParserPosition(stringValue) {

  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  objectValue.forEach(element => {
    element.positionskategorie = JSON.parse(element.positionskategorie);
    element.positionskompetenzen = JSON.parse(element.positionskompetenzen);
  });
  return objectValue;
}

//Lesen einer Position anhand ihrer ID
server.get('/positionByID/:id', async (req, res) => {

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

//Anpassen einer Position anhand ihrer ID  
server.put('/position_update', authenticateToken, async (req, res) => {

  var sql = 'UPDATE wipro_hs22.position SET position.positionsname=?, position.positionsbeschreibung=?, position.passend_zu_branche=? WHERE position.id=?';
  connection.query(sql, [req.body.positionsname, req.body.positionsbeschreibung, req.body.passend_zu_branche, req.body.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Anpassen der Positionskategorie einer Position anhand der Positions ID
server.put('/position_update_kat/:id', authenticateToken, async (req, res) => {

  var sql =  'UPDATE wipro_hs22.position_positionskategorie SET position_positionskategorie.idPositionskategorie=? WHERE position_positionskategorie.idPosition=?';
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

//Hinzufügen einer neuen Position
server.post('/position_add', authenticateToken, async (req, res) => {

    var sql = 'INSERT INTO wipro_hs22.position (position.positionsname, position.positionsbeschreibung, position.passend_zu_branche) VALUES (?, ?, ?)';
    connection.query(sql, [req.body.positionsname, req.body.positionsbeschreibung, req.body.passend_zu_branche], function (err, result, fields) {
      if (err) throw err;
      if (result) {
        res.send(result);
      } else {
        res.status(404);
      }
      res.end();
    });
  });

//Hinzufügen der Positionskategorie zu einem Kurs anhander der Positions und Positionskategorie ID
server.post('/position_add_kat/:id', authenticateToken, async (req, res) => {
  
    var sql =  'INSERT INTO wipro_hs22.position_positionskategorie (position_positionskategorie.idPosition, position_positionskategorie.idPositionskategorie) ' +
    'VALUES (?, ?)';
    connection.query(sql, [req.params.id, req.body.positionskategorie.id], function (err, result, fields) {
      if (err) throw err;
      if (result) {
        res.send(result);
      } else {
        res.status(404);
      }
      res.end();
    });
});

//Hinzufügen einer Kompetenz zu einer Position anhand der Kompetenz und Positions ID
server.post('/position_add_komp/:id', authenticateToken, async (req, res) => {
    
  var sql =  'INSERT INTO wipro_hs22.position_kompetenz (position_kompetenz.idPosition, position_kompetenz.idKompetenz) ' +
  'VALUES (?, ?)';
  connection.query(sql, [req.body.id, req.params.id], function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

//Löschen einer bestehenden Position anhand ihrer ID
server.delete('/position_delete/:id', authenticateToken, async (req, res) => {

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

//Lesen aller Positionskategorien
server.get('/positionskategorien', async (req, res) => {

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

/*server.get('/positionskategorien_valid', async (req, res) => {
  //Lesen aller Kurskategorien, welche Kurse zugeordnet haben aus der Datenbank.
  var sql =  'SELECT DISTINCT pkat.id, pkat.spalte, pkat.positionskategoriename FROM wipro_hs22.positionskategorie AS pkat '+
  'JOIN wipro_hs22.position_positionskategorie AS p_p ON pkat.id = p_p.idPositionskategorie';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});*/

//Lesen aller Positionskategorien anhand ihrer Spalte
server.get('/positionskategorien/:spalte', async (req, res) => {

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

//Lesen aller Positionskategorien einer bestimmten Spalte, welche in die Branche passen
server.get('/positionskategorien_valid_branche/:spalte', async (req, res) => {

  var sql =  "SELECT DISTINCT pkat.id, pkat.spalte, pkat.positionskategoriename FROM wipro_hs22.positionskategorie AS pkat "+
  "JOIN wipro_hs22.position_positionskategorie AS p_p ON pkat.id = p_p.idPositionskategorie "+
  "JOIN wipro_hs22.position AS pos ON p_p.idPosition = pos.id WHERE pkat.spalte=? AND pos.passend_zu_branche=1";
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

//Lesen einer Positionskategorie anhand ihrer ID
server.get('/positionskategorieByID/:id', async (req, res) => {

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

//Anpassen einer Positionskategorie anhand ihrer ID
server.put('/positionskategorie_update/:id', authenticateToken, async (req, res) => {

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

//Hinzufügen einer neuen Positionskategorie
server.post('/positionskategorie_add', authenticateToken, async (req, res) => {

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

//Löschen einer bestehenden Positionskategorie anhand ihrer ID
server.delete('/positionskategorie_delete/:id', authenticateToken, async (req, res) => {

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

//----Kompetenzen-----

//Lesen aller Kompetenzen
server.get('/kompetenzen', async (req, res) => {
  
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

//Lesen einer bestimmten Kompetenz anhand ihrer ID
server.get('/kompetenzByID/:id', async (req, res) => {

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

//Anpassen einer Kompetenz anhand ihrer ID  
server.put('/kompetenz_update/:id', authenticateToken, async (req, res) => {

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

//Hinzufügen einer neuen Kompetenz
server.post('/kompetenz_add', authenticateToken, async (req, res) => {
 
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

//Löschen einer Kompetenz anhand ihrer ID
server.delete('/kompetenz_delete/:id', authenticateToken, async (req, res) => {

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

//Löschen aller Kompetenzen eines Kurs anhand der Kurs ID
server.delete('/kurs_komp_delete/:id', authenticateToken, async (req, res) => {

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

//Löschen aller Kompetenzen einer Position anhand der Positions ID
server.delete('/position_komp_delete/:id', authenticateToken, async (req, res) => {

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


//----Kurslogs----

//Lesen aller Kurslogs
server.get('/kurslogs', async (req, res) => {

  var sql =  "SELECT kurslogs.idKurs AS id, kurs.kursname, kurslogs.timestamp FROM wipro_hs22.kurslogs "+
  "JOIN wipro_hs22.kurs ON kurslogs.idKurs = kurs.id";
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

//Lesen aller Kurslogs, für jeden Kurs wird die Anzahl Einträge gezählt und pro Kurs gruppiert
server.get('/kurslogsCounted', async (req, res) => {

  var sql =  "SELECT DISTINCT kurslogs.idKurs AS id, kurs.kursname, COUNT(*) as anzahlAufrufe FROM wipro_hs22.kurslogs "+
  "JOIN wipro_hs22.kurs ON kurslogs.idKurs = kurs.id GROUP BY idKurs";
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

//Hinzufügen eines neuen Kurslogs anhand seiner ID (Klick auf "Zum Kursanbieter")
server.post('/kurslog_add/:id', async (req, res) => {

  var sql =  "INSERT INTO wipro_hs22.kurslogs (timestamp, idKurs) VALUES (NOW(), ?)";
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

//Löschen der Kurslogs eines bestimmten Kurs anhand der Kurs ID
server.delete('/kurslogdelete/:id', async (req, res) => {

  var sql =  "DELETE FROM wipro_hs22.kurslogs WHERE idKurs=?";
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

//Server ist auf Port 4566 aufrufbar
server.listen(4566 /*8080*/, () => {
  console.log("Backend Karriereplaner is running on 4566");
});
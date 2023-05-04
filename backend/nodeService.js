const Service = require('node-windows').Service

const svc = new Service({
    name: "nodeBasicServer",
    descritpion: "Backend Karriereplaner",
    script: "C:\\Apache24\\backend\\server.js"
})

svc.on('install', function(){
    svc.start()
})

svc.install()
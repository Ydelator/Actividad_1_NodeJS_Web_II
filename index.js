const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

//Creacion de directorio
if (fs.existsSync("data")) {
    console.log("El directorio ya existe")
} else {
    fs.mkdir("data",(error)=>{
        if (error) {
            console.log(error.message)
        }else{
            console.log("Directorio creado on exito")
        }
    })
}

let id = 1;
app.post("/formulario", (req, res)=>{
    const {nombre, apellido, titulo, autor, editorial, ano} = req.body;
    console.log(req.body)
    if (!nombre || !apellido || !titulo || !autor || !editorial || !ano) {
        return res.redirect('/error.html')
    }
    fs.writeFileSync(`data/id_${id}.txt`,`id: 1 \nNombre: ${nombre} \nApellido: ${apellido} \nTitulo: ${titulo} \nAutor: ${autor} \nEditorial: ${editorial} \nAño: ${ano}`)
    id++
    res.send(`Archivo de datos descargado. Verificar la carpeta "data"`)
})

app.listen(port)
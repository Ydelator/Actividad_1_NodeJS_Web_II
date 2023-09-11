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

app.post("/formulario", (req, res)=>{
    const {ID, nombre, apellido, titulo, autor, editorial, ano} = req.body;
    console.log(req.body)
    if (!ID || !nombre || !apellido || !titulo || !autor || !editorial || !ano) {
        return res.redirect('/error.html')
    }
    const fileName = `data/id_${ID}.txt`;
    const cuerpo =  `id: ${ID} \nNombre: ${nombre} \nApellido: ${apellido} \nTitulo: ${titulo} \nAutor: ${autor} \nEditorial: ${editorial} \nAño: ${ano}`;
    fs.writeFile(fileName, cuerpo, (err)=>{
        if (err) {
            res.send('Ha ocurido un error al descargar el archivo')
        } else {
            res.download(fileName, (err)=>{
                if (err) {
                    console.error(err)
                }else{
                    console.log('Archivo descargado con exito')
                }
            })
        }
    })

  

    //res.redirect('/download')

    //res.send(`Archivo de datos descargado. Verificar la carpeta "data"`)
})

app.listen(port)
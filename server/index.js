const express = require("express");
const mysql = require("mysql");
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const dbConfig = mysql.createConnection({
    user:'root',
    password:'maxelltod',
    server:'localhost',
    port:3306,
    database:'db_convivio',
    options:{
        trustServerCertificate:true
    }

});

dbConfig.connect();

app.get('/api/padron', async(req,res)=>{
    const {cedula} = req.query;

    if(!cedula) {
        return res.status(400).send('se requiere cedula');
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute(
            'SELECT nombres, apellido1, apellido2 FROM padron WHERE cedula=?',[cedula]
        );

        await connection.end()

        if(rows.length > 0){
            res.json(rows[0])
        }else{
            res.status(400).send('Record no se encuentra')
        }
    } catch (error) {
        console.error("Database Error", error)
        res.status(500).send('Server Error')
    }

});

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
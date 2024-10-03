// const express = require("express");
// const mssql = require("mssql");
// const cors = require("cors")
// const app = express()

// app.use(cors())
// app.use(express.json())

// // const dbConfig = {
// //     user:'sa',
// //     password:'Maxelltod360',
// //     server:'localhost',
// //     port:1433,
// //     database:'convivio.test',
// //     options:{
// //         trustServerCertificate:true
// //     }

// // };

// // app.get('/api/data', async(req,res)=>{
// //     const {cedula} = req.query;

// //     if(!cedula) {
// //         return res.status(400).send('se requiere cedula');
// //     }
// //     try {
// //         await mssql.connect(dbConfig);

// //         const result = await mssql.query `SELECT nombres, apellido1, apellido2 FROm docentes WHERE cedula = ${cedula}`;

// //         // res.json(result.recordset);

// //         if(result.recordset.length > 0){
// //             res.json(result.recordset[0]);
// //         }else{
// //             res.status(400).send('Record no se Encontro')
// //         }
// //     } catch (error) {
// //         console.error('Database Error', error);
// //         res.status(500).send('Server Error')

// //     }
// // })

// const PORT = process.env.PORT || 3001;


// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
const mongoose = require('mongoose');


// Cadena de conexión
const URI = process.env.MONGODB_URI || 'mongodb+srv://mamaoro1405:1234@clustermern.4whqd.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMERN';
// const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/dbtest';


mongoose.connect(URI)
    .then(() => console.log('La base de datos ha sido conectada: ', URI))
    .catch(error => console.error('Error al conectar con la base de datos:', error));


// const connection = mongoose.connection;
// connection.once('open', ()=>{
//     console.log('La base de datos ha sido conectada: ', URI);
// });

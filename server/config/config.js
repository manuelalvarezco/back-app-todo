//PORT
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DATABASE
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/todoApp'
} else {
    urlDB = process.env.URLDB;
}

process.env.URLDB = urlDB;

// EXPIRED TOKEN
process.env.EXPIRED_TOKEN = '48h';

// SEED 
process.env.SEED = process.env.SEED || 'secret';
import express from "express";

const app = express();

// initacja bazy danych 
const users = [{id: 23, name: 'Adam', email: 'adam@gmail.com' },{id: 21, name: 'Marek', email: 'marek@gmail.com' },{id: 13, name: 'Eleonora', email: 'eleonora@gmail.com' }]

app.get('/', (req, res) => {
res.send('Witaj na stronie głównej');
}

app.get('/admin', (req, res) => {
    res.send('Witaj w panelu admina');
    }



app.listen(3008, () => console.log("Server słucha ..."));

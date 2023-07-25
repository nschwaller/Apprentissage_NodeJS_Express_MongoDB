// importer package express et le stocker dans la constante
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// On définis le dossier public comme dossier static
app.use(express.static('public'));

// ces deux use permettent de traité des formulaires
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

// si on fait un get sans envoyer de réponse (res) alors ca tournera en boucle
// Ici on envoie une réponse au chemin par defaut (localhost:3000/)
app.get('/', (req, res) => {
    res.send('Hello world');
});

// On envoie une réponse dans localhost:3000/bonjour
app.get('/bonjour', (req, res) => { 
    res.send('<h1> Bonjour tout le monde </h1>');
});

// On envoie une réponse qui correspond a notre fichier html page.html
app.get('/fichier/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/page.html'));
});

app.post('/form', (req, res) => {
    console.log(req.body);

    if(req.body.password == '1234'){
        res.send('Formulaire traité!');
    }else{
        res.redirect('/fichier/html?mdpIncorrect=1');
    }
});

// On récupère le nom dans la route et on utilis req.params qui est un tableau contenant tout nos paramètres
app.get('/user/:prenom', (req, res) => {
    const text = `Bonjour ${req.params.prenom}`;
    res.send(text);
});

app.get('/articles/:id', (req, res) => {
    res.send(`Article #${req.params.id} du blog`)
});

// query correspond a ce qu'il y a apres le ? dans une url : localhost:3000/user?prenom=test&nom=test
app.get('/user', (req, res) => {
    const text = `Bonjour ${req.query.prenom}`;
    res.send(text);
});

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
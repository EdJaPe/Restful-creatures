const express = require('express');
const router = express.Router();
const fs = require('fs');
const { route } = require('./prehistoric_creatures');
//Mounted at /dinos
//Index, stubbing out your route - /dinos
router.get('/', (req, res) => {
    // read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    //parse JSON into a JS mutable data structure
    let dinoData = JSON.parse(dinos);
    console.log(dinoData);
    // res.send('DINOS BABY!')
    res.render('dinos/index', { dinos: dinoData });
});
// New route , exists at /dinos/new
router.get('/new', (req, res) => {
    console.log('--------- New dino who dis')
    res.render('dinos/new');
})
//get routes first, least specific to most specific 
//show/details - /dinos:id
router.get('/:id', (req, res) => {
    //get the index
    let dinoIndex = req.params.id; //this will be the key/index number of the dino in the dinoData array
    //get mutable dino data
    let dinos = fs.readFileSync('./dinos.json');
    console.log(dinos)
    let dinoData = JSON.parse(dinos); //is an array
    //find dino at said index
    let thisDino = dinoData[dinoIndex];
    //if there is no dino at dinoData[dinoIndex]
    if (!thisDino) {
        //show a 404 page -- end game
        res.redirect('/dinos/new');
    } else {
        //ship it
        res.render('dinos/show', { dino: thisDino, dinoId: dinoIndex });
    }
});
//Edit = GET /dinos/:id/edit
router.get('/:id/edit', (req, res) => {
    //send the dino info into a client page which is the form for a put route
    let dinoIndex = req.params.id; 
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); 
    let thisDino = dinoData[dinoIndex];
    if (!thisDino) {
        res.redirect('/dinos');
    } else {
        res.render('dinos/edit', { dino: thisDino, dinoId:
        dinoIndex });
    }
});
//update route
router.put('/:id', (req, res) => {
    console.log(`|----- PUT to /dinos/${req.params.id}`);
    //get dino from data store (same logic as GET /dinos/:id / show/details route)
    let dinoIndex = req.params.id; 
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); 
    //update dino
    dinoData[dinoIndex] = req.body;
    //write new dino to data store
    //write to dinos.json
    let dinoJSON = JSON.stringify(dinoData);
    fs.writeFileSync('./dinos.json', dinoJSON);
    //send response (redirect to show/details page)
    res.redirect(`/dinos/${dinoIndex}`);
    // res.send(`editing dino at ${req.params.id}`);
});
//Delete
router.delete('/:id', (req, res) => {
    console.log('~~~~~DELETE~~~~~');
    //get the dino from my data store
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);
    dinosJS.splice(dinoIndex, 1);
    fs.writeFileSync('./dinos.json', JSON.stringify(dinosJS));
    res.redirect('/dinos');
});
// Create - POST to /dinos
router.post('/', (req, res) => {
    console.log(req.body);
    // res.send('posting a dino')
    //turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);
    //add new dino from req.body to array
    dinosJS.push(req.body);
    //turn dino array into JSON
    let dinoJSON = JSON.stringify(dinosJS);
    //write to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);
    res.redirect('/dinos');
})
module.exports = router;
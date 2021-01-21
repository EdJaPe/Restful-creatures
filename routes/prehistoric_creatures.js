const express = require('express')
//const express = require('express'

const router = express.Router();
const fs = require('fs');

let creatures = fs.readFileSync('./prehistoric_creatures.json');
let creatureData = JSON.parse(creatures); 

router.get('/', (req, res) => {
    res.render('creatures/creaturesIndex', { creatures: creatureData})
});    

router.get('/new', (req, res) => {
    res.render('creatures/newPre' )
})
    //pRSE JSON into a JS mutable Data Structure
router.get('/:id', (req, res) => {
    res.render('creatures/show', {creatures: creatureData[req.params.id] });
}); 
router.post('/', (req, res) => {
    console.log(req.body);
    // res.send('posting a dino')
    //turn dinos.json into a mutable array
    //add new dino from req.body to array
    creatureData.push(req.body);
    //turn dino array into JSON
    let creatureJSON = JSON.stringify(creatureData);
    //write to dinos.json
    fs.writeFileSync('./prehistoric_creatures.json', creatureJSON);
    res.redirect('/');
})


module.exports = router;
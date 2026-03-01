const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

});

// router      //another method for .get .post .delete id
//     .route("./id")
//     .post('/', (req, res) => {
//         res.send('Create user');
//     })  
//     .get('/:id', (req, res) => { 
//         var id = req.params.id;
//         res.send(`User get id ${id}`);
//     });

router.get('/new', (req, res) => { //try going to /localhost:3000/users/new 

});  

router.post('/', (req, res) => {
    res.send('Create user');
});

router.get('/:id', (req, res) => { //put dynamic routes below static ones
    var id = req.params.id;
    res.send(`User get id ${id}`);
})

const users = [{ name: "aviral"}, { name: "krishna" }];

router.param("id", (req, res, next, id) => {
    console.log(id);
    req.user = users[id];
    next();
})

module.exports = router;
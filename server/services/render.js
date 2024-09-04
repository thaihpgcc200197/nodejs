const axios = require('axios');
const dotenv =require('dotenv').config();

const apiUrl =process.env.apiUrl || 'http://localhost:8080';


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(apiUrl+'/api/users')
        .then(function(response){

            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
   
    axios.get(apiUrl+'/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
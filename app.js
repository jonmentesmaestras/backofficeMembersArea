const users = require('./users')
const forgot = require('./users/forgotPassword')
const changePassword = require('./users/changePassword')

const issuesAndSuggestions = require('./routes/issuesAnsSuggestion');

const userCategory = require('./routes/UsuariosCategoria');

const downloadVideo = require('./routes/DownloadResource');

const adsDashboard = require('./routes/AnunciosGuardados');
const adsCategory = require('./routes/AnunciosCategoria');

const updateCategory = require('./routes/updateCategory');

const tokens = require('./users/userTokens')
const express = require('express')
const crypto = require('crypto')
const bodyParser = require('body-parser');
const {stringify} = require('querystring');
const access = require('./access')
const {response} = require("express");
const path = require('path')
const app = express()

const publicRoot = path.join(__dirname, 'public')
const suggestion = path.join(__dirname, 'public/issuesSuggestions')

const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  };
  
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(suggestion));

// recuperar password
app.use('/forgotPassword', forgot.recover);

app.use('/changePassword', changePassword.execute);

app.use('/suggestions', issuesAndSuggestions);

app.use('/dashboard', adsDashboard);

app.use('/assignCategory', adsCategory);

app.use('/updateCategory', updateCategory)

app.use('/usercategory', userCategory)

app.use('/download', downloadVideo)



app.get('/users', (req, res) => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    res.json(users);
  });

  app.get('/logout', (req, res) => {
    var myUser
    
    myUser.msg = "Usuario Log out"
    res.setHeader('Content-Type', 'application/json')
    res.json(myUser)
      
    // Redirect to a new page based on a query parameter
      //return res.redirect('/login.html');
    
  });



const PORT = 3000 //process.env.PORT || 3000

async function authenticate_user(req, res, next) {
    let creds = req.get('Authorization')
    creds = creds.substr(creds.indexOf(' ') + 1)
    creds = Buffer.from(creds, 'base64').toString('binary')

    creds = creds.split(':')
    let email = creds[0]
    let pass = creds[1]
    let dbUser = null
    var myUser = {
        email: "",
        token: "",
        error: false,
        msg: ""

    }
    var payloadString = "{}"

    /* Database check of credentials */
    const validedUser = await users.findUser(email, pass)
    console.log("validedUser " + validedUser)

    // check if valid user
    const isValidUser = isNumber(validedUser)
   

    if(isValidUser){
        myUser.email = email
        //get token
        const myUserToken = await tokens.createToken(validedUser)
        myUser.token = myUserToken.token
        res.setHeader('Content-Type', 'application/json')
        res.json(myUser);
        //res.end(payloadString)
       
        
    } else {

        myUser.error  = true
        myUser.msg = "Usuario No valido"
        res.setHeader('Content-Type', 'application/json')
        res.json(myUser)
        //res.end(payloadString)
    }

    
    


}

function isNumber(str) {
    return !isNaN(Number(str));
  }

function createUser(req, res, next) {
    //TODO: check for existing user
    const authorizationHeader = req.get('Authorization');

    console.log("the authorization header is " + authorizationHeader)
    console.log("the req.body.transaction is " + req.body.data.purchase.transaction)


    var fieldValues = {
        CodigoFactura: req.body.data.purchase.transaction,
        Nombre: req.body.data.buyer.name,
        Apellido: "N.A.",
        Email: req.body.data.buyer.email,
        Password: access.generatePassword()
    }

    /*var fieldValues = {
          CodigoFactura:codigoFactura,
          Nombre:req.body.nombre,
          Apellido:req.body.apellido,
          Email:req.body.email,
          Password:"123"
     }*/


    users.createUser(fieldValues).then((item) => {
        console.log("the item is " + item.UserID)
    })


    var jsonString = '{"Nombre":' + '"' + fieldValues.Nombre + '"'
    jsonString = jsonString + ', "Apellido":' + '"' + fieldValues.Apellido + '"'
    jsonString = jsonString + ', "Email":' + '"' + fieldValues.Email + '"'
    jsonString = jsonString + ', "Factura":' + '"' + fieldValues.CodigoFactura + '"}'

    const payload = JSON.parse(jsonString)

    var payloadString = JSON.stringify(payload)

    res.setHeader('Content-Type', 'application/json')

    res.end(payloadString)

    next()
}

/* cancel subscription */
function cancelSubscription(req, res, next) {
    //TODO: check for existing user
    //const authorizationHeader = req.get('Authorization');

    //console.log("the authorization header is " + authorizationHeader)
    //console.log("the req.body.transaction is " + req.body.data.purchase.transaction)

 

    users.cancelSubscription(req.body.data.buyer.email).then((item) => {
        console.log("suscripcion cancelada ", item)
    })


    var jsonString = '{"Mensaje":' + '"Suscripcion Cancelada para ' +req.body.data.buyer.email+  '"}'

    const payload = JSON.parse(jsonString)

    var payloadString = JSON.stringify(payload)

    res.setHeader('Content-Type', 'application/json')

    res.end(payloadString)

    next()
}


app.get('/login', authenticate_user, (req, res) => {
    
    res.status(200).end()
})

app.post('/createUser', createUser, (req, res) => {
    
    res.status(200).end()
})

app.post('/cancelSubscription', cancelSubscription, (req, res) => {
    
    res.status(200).end()
})


app.get('/logout', authenticate_user, (req, res) => {
    res.status(200).end()
})

app.use((req, res, next) => {
    res.status(404).send('Route not found')
})

app.use((err, res, next) => {
    res.status(err.status || 500).send(err.message || "Problem")
})

const server = app.listen(PORT, function () {
    console.log(`Server is up and running on port ${server.address().port}`)
})


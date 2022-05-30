const express = require('express');
const app = express();
const session = require('express-session');
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
const mongoose = require('mongoose');

app.listen(process.env.PORT || 1989, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 1989")
    }
})

app.use(session({
    secret: 'Molly',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

/**
 * req = request object, res = response object
 */
app.get('/', function (req, res) {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/user_profile.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/login.html', function (req, res) {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/user_profile.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

/**
 * Sends what is in public if link/route does not match.
 */
app.use(express.static('./public'));

const https = require('https');

app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {
            data += chunk
        })

        https_res.on("end", function() {
            parsed_data = JSON.parse(data)

            hp = parsed_data.stats.filter((object) => {
                return object.stat.name == "hp"
            }).map((hpfinder) => {
                return hpfinder.base_stat
            })

            //alternatively, instead of chaining the map function above, simply use hp[0].base_stat to get the hp base stat

            attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "attack"
            }).map((atkfinder) => {
                return atkfinder.base_stat
            })

            defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "defense"
            }).map((deffinder) => {
                return deffinder.base_stat
            })

            special_attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-attack"
            }).map((specatkfinder) => {
                return specatkfinder.base_stat
            })

            special_defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-defense"
            }).map((specdeffinder) => {
                return specdeffinder.base_stat
            })

            speed = parsed_data.stats.filter((object) => {
                return object.stat.name == "speed"
            }).map((speedfinder) => {
                return speedfinder.base_stat
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": parsed_data.name,
                "hp": hp,
                "attack": attack,
                "defense": defense,
                "special_attack": special_attack,
                "special_defense": special_defense,
                "speed": speed
            })
        })
    });

})

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/public/search.html')
})

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/public/memory-game.html')
})

app.get('/game-setup', (req, res) => {
    res.sendFile(__dirname + '/public/game-setup.html')
})

const bodyparser = require("body-parser");
const res = require('express/lib/response');
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb+srv://pokemon:comp2537@cluster0.thyz8.mongodb.net/Assignment3?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    pass: String,
    firstName: String,
    lastName: String,
    isAdmin: String,
    cart: Array,
    pastOrders: Array,
    timeline: Array
});

const userModel = mongoose.model("users", userSchema);

// checks to see if the database is connected by logging the JSON data in console
// app.get('/users/getAll', (req, res) => {
//     userModel.find({}, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data);
//     });
// })

app.get("/createAccount.html", (req, res) => {
    res.sendFile(path.join(htmlPath + '/public/createAccount.html'));
});

// app.post("/createAccount", (req, res, next) => {
//         console.log(`username: ${req.body.userName}\n
//         password: ${req.body.password}\n
//         confirmed password: ${req.body.confirmPassword}\n
//         first name: ${req.body.firstName}\n
//         last name: ${req.body.lastName}`);
//         userModel.create({
//             'username': req.body.userName,
//             'pass': req.body.confirmPassword,
//             'firstName': req.body.firstName,
//             'lastName': req.body.lastName
//         }, function (err, data) {
//             if (err) {
//                 console.log("Error detected! " + err);
//             } else {
//                 console.log("User Info: " + data);
//             }
//             res.send(data);
//         });

//     }
// );

// insert new user into db
app.put('/createAccount', function (req, res) {
    console.log(`username: ${req.body.username}\n
        password: ${req.body.pass}\n
        first name: ${req.body.firstName}\n
        last name: ${req.body.lastName}`);
    console.log(req.body);
    userModel.create({
        'username': req.body.username,
        'pass': req.body.pass,
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'isAdmin': "false"
    }, function (err, data) {
        if (err) {
            console.log("Error detected! " + err);
        } else {
            console.log("User Info: " + data);
        }
        res.send(data);
    });
});

app.get('/getAllUsers', function(req, res) {
    userModel.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("User" + data)
        }
        res.send(data);
    })
})

app.put('/deleteUser/:username', (req, res) => {
    userModel.deleteOne({
        'username': req.params.username
    }, function (err, data) {
        if (err) {
            console.log("An error has occured: " + err);
        } else {
            console.log("Delete user data: " + data);
        }
        res.send("User successfully deleted!");
    });
})

app.post('/promote-user', (req, res) => {
    userToPromote = req.body.username;
    userModel.updateOne({
        'username': userToPromote
    }, {
        $set: {
            'isAdmin': 'true'
        }
    }, function (err, data) {
        if (err) {
            console.log("Another error! " + err)
        } else {
            console.log("Promotion data: " + data)
        }
        res.send("Promotion successful!")
    })


    console.log("Promotion complete!")
})

// function authenticate(req, res, next) {
//     if (req.session.authenticated) {
//         next();
//     } else {
//         res.redirect('/')
//     }
// }
app.get('/user_profile', (req, res) => {
    res.sendFile(__dirname + '/public/user_profile.html');
})

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/admin-dashboard.html');
})

app.post('/authenticateUser', (req, res) => {
    inputUser = req.body.username;
    inputPass = req.body.pass;

    if (userModel.find({username: inputUser}, (err, user) => {
        if (err) {
            console.log(err);
        } else if (inputPass === user[0].pass) {
            req.session.loggedIn = true;
            req.session.username = user[0].username;
            res.redirect('/user_profile');
        }
    }))
    console.log(`Welcome, ${req.body.username}!`)
});

app.post('/authenticateAdmin', (req, res) => {
    inputUser = req.body.username;
    inputPass = req.body.pass;

    if (userModel.find({username: inputUser}, (err, user) => {
        if (err) {
            console.log(err)
        } else if (inputPass === user[0].pass && user[0].isAdmin === "true") {
            req.session.loggedIn = true;
            req.session.username = user[0].username;
            res.redirect('/admin-dashboard');
        } else {
            console.log("You are not an admin! Please use the regular user login");
        }
    }))
    console.log(`Welcome, admin ${req.body.username}!`)
});

app.get('/logout', (req, res) => {
    req.session.destroy;
    res.redirect('/');
})

app.get('/getUserInfo', function(req, res) {
    currentUser = req.session.username;

    userModel.find({username: currentUser}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.send(user)
        }
    })
})

app.put('/viewedPokemon', function (req, res) {
    console.log(req.body);
    currentPokemon = req.body.
    userModel.timeline.create({
        'pokemon': req.body.pokemon
    }, function (err, data) {
        if (err) {
            console.log("Error! " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send(data);
    });
})
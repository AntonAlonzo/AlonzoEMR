const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});

const controllerUser = require('../controller/controlleruser.js');
const controllerRecord = require('../controller/controllerrecord.js');
const controllerHome = require('../controller/controllerhome.js');

//Home page section
app.get('/', controllerHome.goHome);
//app.get('/about', controllerhome.goAbout)

//Login and signup section
app.get('/user/login', controllerUser.login);
app.post('/user', controllerUser.checkLogin);
app.get('/user/signup', controllerUser.signup);
app.post('/user/signup', controllerUser.addUser);
app.get('/user/:username', controllerUser.userPage);

//Records section
app.get('/record/new', controllerRecord.createPatient);
app.post('/record', controllerRecord.addPatient);
app.get('/patient/:patientId', controllerRecord.viewPatient);

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const controllerUser = require('../controller/controlleruser.js');
const controllerPatient = require('../controller/controllerpatient.js');
const controllerHome = require('../controller/controllerhome.js');
const controllerConsultation = require('../controller/controllerconsultation.js');

//Home page section
app.get('/', controllerHome.goHome);
//app.get('/about', controllerhome.goAbout)

//Login and signup section
app.get('/user/login', controllerUser.login);
app.post('/user', controllerUser.checkLogin);
app.get('/user/signup', controllerUser.signup);
app.post('/user/signup', controllerUser.addUser);
app.get('/user/:username', controllerUser.userPage);
app.get('/logout', controllerUser.logout);

//Records section
app.get('/patient/new', controllerPatient.createPatient);
app.post('/patient', controllerPatient.addPatient);
app.get('/patient/:patientId', controllerPatient.viewPatient);
app.get('/patients/search', controllerPatient.searchPatients);

//Consultation

app.get('/patient/:patientId/newConsultation', controllerConsultation.createConsultation);
app.post('/patient/:patientId', controllerConsultation.addConsultation);
app.get('/patient/:patientId/editConsultation/:consultationId', controllerConsultation.editConsultationPage);
app.patch('/patient/:patientId/editConsultation/:consultationId', controllerConsultation.editConsultation);

// Search
app.get('/patients/patient/:patientId', controllerPatient.viewPatient);
app.get('/patient/edit/:patientId', controllerPatient.editPatient);
app.post('/patient/modify/:patientId', controllerPatient.modifyPatient);

module.exports = app;
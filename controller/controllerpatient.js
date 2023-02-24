var User = require('../model/user');
var Patient = require('../model/patient');
var types = ['Surgical', 'Purely Medical', 'Checkup'];



const controllerPatient = {

    //Get page to create a new patient in the DB
    createPatient: async (req, res) => {
        res.render('patient/newPatient', { types });
    },

    //Post the new patient data into the DB
    addPatient: async (req, res) => {
        if (req.session.username) {
            var data = req.body;
            data.creator = req.session.username;
            var newData = new Patient(data);
            await newData.save()
                .then(async () => {
                    res.redirect('/');
                })
                .catch((err) => {
                    message = err;
                    res.redirect('/patient/new');
                })

        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    editPatient: async (req, res) => {
        const patientId = req.params.patientId;

        Patient.find({ _id: patientId }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render('patient/editPatient', {
                    patient: result[0],
                    types
                });
            }
        });
    },

    //Post the modified patient data into the DB
    modifyPatient: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;

            const query = { _id: patientId };
            // const title = req.body.postTitle;
            // const content = req.body.postBody;
            Patient.updateOne(query, 
                { lastName: req.body.lastName, 
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    type: req.body.type,
                    gender: req.body.gender,
                    address: req.body.address,
                    contactNumber: req.body.contactNumber,
                    birthday: req.body.birthday,
                    occupation: req.body.occupation,
                    referral: req.body.referral }, function(err, result) {
                if(err){
                    console.log(err);
                } else {
                res.redirect('/');
                }
            });

        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    viewPatient: async (req, res) => {
        const patientId = req.params.patientId;

        // res.render('patient/patientRecord', { types });
        Patient.find({ _id: patientId }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render('patient/patientRecord', {
                    patient: result[0]
                });
            }
        });
    },

    searchPatients: async (req, res) => {
        var { q } = req.query;
        var searchPatients = await Patient.find({ $text: { $search: q } }).sort({ 'date': -1 });
        res.render('patient/searchPatient', { q, searchPatients });
    },
}

module.exports = controllerPatient;

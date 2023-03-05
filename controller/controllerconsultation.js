var User = require('../model/user');
var Patient = require('../model/patient');
var Consultation = require('../model/consultation')
var types = ['Surgical', 'Purely Medical', 'Checkup'];



const controllerConsultation = {

    //Get page to create a new consultation in the DB
    createConsultation: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;
            res.render('consultation/addConsultation', { patientId });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Post the new consultation data into the DB
    addConsultation: async (req, res) => {
        if (req.session.username) {
            const { patientId } = req.params;
            var data = req.body;

            data.patientID = patientId;
            if (!data.date) {
                data.date = Date.now();
            }
            var newData = new Consultation(data);
            await newData.save()
                .then(async () => {
                    res.redirect(`/patient/${patientId}`);
                })
                .catch((err) => {
                    console.log(err)
                    message = err;
                    res.redirect(`/patient/${patientId}/newConsultation`);
                })

        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Get edit consultation page

    editConsultationPage: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;
            const consultationId = req.params.consultationId;

            var currConsult = await Consultation.findOne({ patientID: patientId, _id: consultationId })
            res.render('consultation/editConsultation', { patientId, currConsult });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Edit consultation data on db
    editConsultation: async (req, res) => {
        if (req.session.username) {
            const { consultationId } = req.params;
            console.log(req.params.patientId);
            const data = req.body;

            const { date, subjective, assessment, objective, plan } = data;
            await Consultation.findByIdAndUpdate(consultationId, { date, subjective, assessment, objective, plan })
            res.redirect(`/patient/${req.params.patientId}`);
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

}

module.exports = controllerConsultation;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const validNames = ['Dave Thompson', 'Mark Hughes', 'Rhys Davies'];
const regex = new RegExp(validNames.join('|'), 'i');

app.post('/validate', (req, res) => {
    const { name,  description } = req.body || {};
    setTimeout(() => {
        if (typeof name !== 'undefined') {
            if (regex.test(name)) { 
                res.status(200).send({ isValid: true, processedData: { name: name.toUpperCase(), description: description.toUpperCase() } });
             } else {
                res.status(400).send({ isValid: false, error: 'Server validation error: invalid input' });
             }
        } else {
            res.status(200).send({ isValid: true });
        }
    }, 1000)
});

app.post('/features', (req, res) => {
    const { key, value } = req.body || {};
    setTimeout(() => {
        if (key !== 'koreAzure') {
            res.status(200).send({ isSetable: value });
        } else {
            res.status(400).send({ isSetable: false, error: `Server error: unable to enable feature ${key}` });
        } 
    }, 1000)
});

app.post('/summary', (req, res) => {
    const { pass } = req.body || {};
    setTimeout(() => {
        if (pass) {
            res.status(200).send({ success: true });
        } else {
            res.status(400).send({ success: false, error: `Server error: unable to submit data` });
        } 
    }, 1000)
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
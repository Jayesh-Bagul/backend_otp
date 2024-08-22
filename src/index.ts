import express from 'express';
import { n, sec } from './sec';

let otp_found = false
let otp: any;

const app = express();

app.use(express.json());


let start_arr = [190000, 280000, 370000, 460000, 550000, 640000, 730000, 820000, 910000];
let currentIndex = 0; 

app.get('/start_from', (req, res) => {
    if (currentIndex >= start_arr.length) {
        res.status(400).json({ error: 'No more numbers available' });
        return;
    }

    
    const nextNumber = start_arr[currentIndex];
    currentIndex++; 

    res.json({
        number: nextNumber
    });
});


app.post('/otp_cracked', (req, res) => {
    otp = req.body.otp;
    console.log(otp)
    otp_found = true
    res.json({
        message: "Received OTP"
    });
});


app.get('/otp_object', (req, res) => {
    res.json({
        message: 'OTP cracked',
        otp: otp,
        otp_found: otp_found
    });
});

app.get('/sec_and_n', (req, res) => {
    res.json({
        sec: sec,
        n: n
    });
});



app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const http = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jasonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/558b38c676";
    const options = {
        method: "POST",
        auth: "string:9b48403bb1a3b385f703c2b2edd8a332-us14"
    };



    // const data = {
    //     members: [{
    //         email_address: email,
    //         status: "Subscribed",
    //         marge_fields: {
    //             FNAME: firstName,
    //             LNAME: lastName,

    //         }
    //     }]
    // };

    // const jasonData = JSON.stringify(data);
    // const url = "https://us14.api.mailchimp.com/3.0/lists/558b38c676";
    // const options = {
    //     method: "POST",
    //     auth: "string:9b48403bb1a3b385f703c2b2edd8a332-us14"
    // };


    const request = http.request(url, options, (response) => {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jasonData);
    request.end();
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});

//api
//0246012c77e239a99775ac2fe0d9c323-us14
//9b48403bb1a3b385f703c2b2edd8a332-us14

//list ID
//558b38c676
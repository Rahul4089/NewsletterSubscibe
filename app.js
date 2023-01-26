const express = require("express")
const app = express()
const https = require("https")
const parser = require("body-parser")
const bodyParser = require("body-parser")

app.use(parser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function (req, res) {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME:lname
                }

            }
        ]
    }
    const jsonfile = JSON.stringify(data);
    var Url = "https://us21.api.mailchimp.com/3.0/lists/c3bca7ae12"
    console.log(Url)
    var options = {
        method:"POST",
        auth:"rahul:065ae58c14cd1203ea998033ea7fb16d-us21"
    }

   const request = https.request(Url,options,function (response) {
       var log_response = response.statusCode
        if (log_response === 200){
            res.sendFile(__dirname + "/Success.html")
        }else{
            res.sendFile(__dirname + "/Failure.html")
        }
        response.on("data",function (data) {
            console.log(JSON.parse(data))
            
        })
    })
    request.write(jsonfile)
    request.end()
    
})


app.listen(3000, function () {
    console.log("Your server is now active on 3000!!!");
})


// API Key - 065ae58c14cd1203ea998033ea7fb16d-us21
// Unique Id -c3bca7ae12
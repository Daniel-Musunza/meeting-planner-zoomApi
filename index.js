const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const rp = require("request-promise");
const app = express();
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
}));
app.use(express.static(path.join(__dirname)));

const port = 3444;

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express and Zoom API" });
});

// Zoom API
let email, userid, resp;

const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, config.APISecret);
app.post("/meeting", (req, res) => {
  // email = req.body.email;
  email ="musunzafestus2019@gmail.com"
  const options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users/${email}/meetings`,
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: true,
        participant_video: true,
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };

  rp(options)
    .then(function (response) {
      console.log("Response is:", response.join_url);
      const dataRes = {
        join_url: response.join_url,
      };
      res.status(200).json(dataRes);
    })
    .catch(function (err) {
      console.log("API call failed, reason", err);
      res.status(500).json({ error: 'Failed to create meeting' });
    });
});

app.get('/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.json'));
});

app.post('/addreminder', (req, res) => {
  console.log('Received addreminder request');
  const newData = req.body;

  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read data file' });
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).json({ error: 'Failed to parse data file' });
      return;
    }

    jsonData.push(newData);

    const updatedData = JSON.stringify(jsonData);
    fs.writeFile(dataPath, updatedData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500).json({ error: 'Failed to write data file' });
        return;
      }

      res.json({ message: 'Data added successfully', data: jsonData });
    });
  });
});

const hostname = 'localhost';
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

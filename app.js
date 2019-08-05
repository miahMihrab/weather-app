const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
//custom
const geoCode = require("./src/utils/geoCode");
const forecast = require("./src/utils/forecast");
const publicDir = path.join("public");

const app = express();
const PORT = process.env.PORT || 3000;
//set static dir
app.use(express.static(publicDir));

//view-engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname + "/views/partials")
  })
);
app.set("view engine", "handlebars");

app.get("", (req, res) => {
  res.render("weather");
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please send valid address"
    });
  } else {
    console.log(req.query.search);
    geoCode(req.query.search, (err, data) => {
      if (err) throw err;
      else {
        forecast(data.lattitude, data.longitude, (err, dt) => {
          if (err) {
            console.log(`Errrror: ${err}`);
          } else {
            res.send({
              temperature: dt.temperature,
              precip_type: dt.precipType,
              precipProbability: dt.precipProbability,
              summary: dt.summary
            });
          }
        });
      }
    });
  }
});

app.listen(PORT, console.log(`Server started at port: ${PORT}`));
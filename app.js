const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
//custom
const geoCode = require("./src/utils/geoCode");
const forecast = require("./src/utils/forecast");
const publicDir = path.join("public");

const app = express();
const port = process.env.PORT || 3000;
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
    geoCode(req.query.search, (err, data) => {
      if (err) throw err;
      else {
        forecast(data.lattitude, data.longitude, (err, dt) => {
          if (err) {
            return res.send({
              error: err
            })
          } else {
            res.send({
              temperature: `${((dt.temperature -32)/1.8).toFixed(2)}C`,
              precip_type: dt.precipType,
              precipProbability: dt.precipProbability,
              location: data.location,
              summary: dt.summary
            });
          }
        });
      }
    });
  }
});

app.listen(port, console.log(`Server started at port: ${port}`));
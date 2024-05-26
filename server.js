const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

let gameResults = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/MainMenu.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/result", (req, res) => {
  const { playerName, time } = req.body;

  if (!playerName || !time) {
    return res
      .status(400)
      .json({ error: "Player name and time are required." });
  }

  const result = { playerName, time };
  gameResults.push(result);
  console.log("Received result:", result);
  res.json({ message: "Result received successfully." });
});

app.get("/result", (req, res) => {
  res.send(gameResults);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

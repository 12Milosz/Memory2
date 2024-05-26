const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises; // Używamy fs.promises

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

app.post("/saveScore", async (req, res) => {
  const { playerName, elapsedTime } = req.body;

  try {
    // Odczytujemy zawartość pliku asynchronicznie
    let data = await fs.readFile("scores.json", "utf8");
    let scores = JSON.parse(data);

    // Dodajemy nowy wynik do istniejącej listy
    scores.push({ playerName, elapsedTime });

    // Zapisujemy zawartość pliku asynchronicznie
    await fs.writeFile("scores.json", JSON.stringify(scores));
    console.log("Score appended successfully.");
    res.status(200).send("Score appended successfully.");
  } catch (error) {
    console.error("Error appending score:", error);
    res.status(500).send("Error appending score.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

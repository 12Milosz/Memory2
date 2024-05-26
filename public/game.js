const selectedLevel = localStorage.getItem("selectedLevel");
const playerName = localStorage.getItem("playerName");

const soundEffect2 = new Audio("soundEffect2.mp3");
const soundEffect = new Audio("soundEffect.wav");

let score = 0;

function shuffleData(data) {
  // return data.sort(() => 0.5 - Math.random());
  return data;
}

async function fetchData() {
  console.log("Fetching Data...");
  try {
    let response = await fetch("./data.json");
    let json = await response.json();
    let memory_data = json[selectedLevel];
    let sorted_data = shuffleData(memory_data);
    return sorted_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

(async () => {
  try {
    console.log("awaiting for data...");
    let sorted_data = await fetchData();
    console.log(sorted_data);
    if (sorted_data) {
      for (let i = 0; i < sorted_data.length; i++) {
        let card = document.createElement("div");
        card.className = "box";
        card.innerText = sorted_data[i];
        document.querySelector(".game").appendChild(card);
      }
    }

    let openCards = [];
    let opened = false;
    const boxes = document.querySelectorAll(".box");
    console.log(boxes);
    boxes.forEach((element) => {
      element.addEventListener("click", (event) => {
        if (element.classList.contains("open")) return;
        if (opened == false) {
          soundEffect.play();
          openCards.push(element);
          element.classList.add("open");
          console.log(openCards.length, openCards);
        }
        if (openCards.length == 2 && opened == false) {
          opened = true;
          let card1 = openCards[0].textContent;
          let card2 = openCards[1].textContent;

          if (card1 === card2) {
            console.log("Match!");
            setTimeout(async () => {
              openCards.forEach((card) => card.classList.add("match"));
              openCards = [];
              opened = false;
              soundEffect2.play();
              score++;
              if (score >= 10) {
                stopStopwatch();
                console.log(
                  playerName,
                  elapsedTime,
                  JSON.stringify({ playerName, elapsedTime })
                );
                const response = await fetch("/result", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    player_name: playerName,
                    elapsed_time: elapsedTime,
                  }),
                });
                if (response.ok) {
                  const data = await response.json();
                  console.log("Received response from backend:", data);
                } else {
                  console.error("Failed to send data to backend.");
                }
              }
            }, 500);
          } else {
            setTimeout(() => {
              openCards.forEach((card) => card.classList.remove("open"));
              openCards = [];
              opened = false;
            }, 1000);
          }
        }
        console.log(score);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();

const reset_button = document
  .querySelector(".reset")
  .addEventListener("click", () => {
    // Implement reset functionality here
  });
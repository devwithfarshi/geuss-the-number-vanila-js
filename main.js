const input = document.getElementById("number_input");
const geussBtn = document.getElementById("geuss_btn");
const min_value = document.getElementById("min_value");
const max_value = document.getElementById("max_value");
const hint = document.getElementById("hint");
const chance_left = document.getElementById("chance_left");
const reset_btn = document.getElementById("reset_btn");
const entered_numbers = document.getElementById("entered_numbers");

let chance = 5;
const min = Math.floor(Math.random() * (79 - 10)) + 10;
const max = min + 20;
min_value.innerText = min;
max_value.innerText = max;
chance_left.innerText = chance;

const randomNumber = Math.floor(Math.random() * (max - min)) + min;
console.log(`
This is the random number ${randomNumber}
`);

geussBtn.addEventListener("click", () => {
  if (chance !== 0) {
    const geussNumber = +input.value;
    if (geussNumber == 0 || geussNumber == "" || geussNumber == null) {
      hint.classList.add("text-red-400");
      hint.innerText = "Please enter a number!";
      input.value = "";
    } else {
      if (geussNumber == randomNumber) {
        gameWin(randomNumber);
      } else if (geussNumber < randomNumber) {
        notify("info", "Your are so closed to answer!");
        chance = updateChance(chance, geussNumber);
        input.value = "";
      } else if (geussNumber > randomNumber) {
        notify("info", "Your are so far away from answer!");
        chance = updateChance(chance, geussNumber);
        input.value = "";
      } else {
        notify("info", "Exeucution failed!");
        input.value = "";
      }
    }
  } else {
    gameOver();
  }
});

reset_btn.addEventListener("click", () => {
  window.location.reload();
});

// enterd number push into DOM list
const createList = (text) => {
  const li = document.createElement("li");
  li.className += " text-2xl text-green-500";
  li.innerText = text;
  entered_numbers.appendChild(li);
};

// game over function
const gameOver = () => {
  hint.classList.remove("text-red-400");
  hint.classList.add("text-yellow-400");
  hint.innerText = `You are lost and ans is ${randomNumber}`;
  reset_btn.classList.remove("hidden");
  reset_btn.classList.add("block");
  geussBtn.classList.remove("block");
  geussBtn.classList.add("hidden");
  input.classList.add("hidden");
  chance_left.parentElement.classList.add("hidden");
};
// game win funtion
const gameWin = (randomNumber) => {
  hint.classList.remove("text-red-400");
  hint.classList.remove("text-yellow-400");
  hint.innerText = `The number is: ${randomNumber}. and you are Win.`;
  reset_btn.classList.remove("hidden");
  reset_btn.classList.add("block");
  geussBtn.classList.remove("block");
  geussBtn.classList.add("hidden");
  input.classList.add("hidden");
  chance_left.parentElement.classList.add("hidden");
};

// update chance function
const updateChance = (chance, geussNumber) => {
  chance--;
  chance_left.innerText = chance;
  createList(geussNumber);
  if (chance == 0) {
    gameOver();
    return;
  }
  return chance;
};

// custion notification function
const notify = (type, text) => {
  if (type == "info") {
    hint.classList.remove("text-red-400");
    hint.classList.add("text-yellow-400");
    hint.innerText = text;
  } else {
    hint.classList.remove("text-yellow-400");
    hint.classList.add("text-red-400");
    hint.innerText = text;
  }
};

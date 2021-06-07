const sampleData = [
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question:
      "The Axolotl is an amphibian that can spend its whole life in a larval state.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "A slug&rsquo;s blood is green.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "Kangaroos keep food in their pouches next to their children.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "A bear does NOT defecate during hibernation. ",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "Rabbits are rodents.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "A flock of crows is known as a homicide.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "Cats have whiskers under their legs.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "The Killer Whale is considered a type of dolphin.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "Rabbits are carnivores.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "The internet browser Firefox is named after the Red Panda.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
];

const buttonElem = document.getElementById("submit-btn");
const warningElem = document.getElementById("warning");
const question = document.getElementById("question");
const fieldsetElem = document.getElementById("my-fieldset");
const scoreElem = document.getElementById("score");

let id = 0;
question.innerHTML = `${id + 1}. ${sampleData[id].question}`;

const answerArray = [];
buttonElem.addEventListener("click", (e) => {
  e.preventDefault();
  const options = document.getElementsByName("option");

  let checkedAnswer = null;
  let count = 0;
  for (let opt of options) {
    if (opt.checked) {
      const answer = opt.id === "option1" ? "True" : "False";
      answerArray.push(answer);
      checkedAnswer = opt;
    } else {
      count++;
    }
  }

  ++id;
  if (id === sampleData.length) {
    const score = calculateScore();
    fieldsetElem.style.display = "none";
    scoreElem.children[1].innerText = `${score} / ${sampleData.length}`;
    scoreElem.style.display = "block";
    return;
  }

  if (count === 2) {
    warningElem.innerText = "Please select one option!";
  } else {
    warningElem.innerText = "";
    question.innerHTML = `${id + 1}. ${sampleData[id].question}`;
    checkedAnswer.checked = false;
  }

  if (id === sampleData.length - 1) {
    buttonElem.innerText = "Submit";
  }
});

function calculateScore() {
  let correctAnswerCounter = 0;
  for (let i = 0; i < answerArray.length; i++) {
    const questionCorrectAnswer = sampleData[i].correct_answer;
    if (questionCorrectAnswer === answerArray[i]) {
      correctAnswerCounter++;
    }
  }
  return correctAnswerCounter;
}

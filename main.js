const responseFromApi = fetch(
  "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean"
)
  .then((res) => res.json())
  .then((data) => {
    if (data.response_code === 0) {
      const sampleData = data.results;
      main(sampleData);
    }
  })
  .catch((err) => {
    alert(err.message || err);
  });

const answerArray = [];

function main(sampleData) {
  const questionIdElem = document.getElementById("_id");
  const totalQuestionElem = document.getElementById("_total");
  totalQuestionElem.innerText = sampleData.length;
  const buttonElem = document.getElementById("submit-btn");
  const warningElem = document.getElementById("warning");
  const question = document.getElementById("question");
  const fieldsetElem = document.getElementById("my-fieldset");
  const scoreElem = document.getElementById("score");

  let id = 0;
  question.innerHTML = `${id + 1}. ${sampleData[id].question}`;
  questionIdElem.innerText = id + 1;

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
      const score = calculateScore(sampleData);
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
      questionIdElem.innerText = id + 1;
      checkedAnswer.checked = false;
    }

    if (id === sampleData.length - 1) {
      buttonElem.innerText = "Submit";
    }
  });
}

function calculateScore(sampleData) {
  let correctAnswerCounter = 0;
  for (let i = 0; i < answerArray.length; i++) {
    const questionCorrectAnswer = sampleData[i].correct_answer;
    if (questionCorrectAnswer === answerArray[i]) {
      correctAnswerCounter++;
    }
  }
  return correctAnswerCounter;
}

const buttonElem = document.getElementById("submit-btn");
const warningElem = document.getElementById("warning");

const answerArray = [];
let id = 1;
buttonElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (id === 10) {
    const fieldsetElem = document.getElementById("my-fieldset");
    fieldsetElem.style.display = "none";
    const scoreElem = document.getElementById("score");
    scoreElem.style.display = "block";
    return;
  }
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

  if (count === 2) {
    warningElem.innerText = "Please select one option!";
  } else {
    warningElem.innerText = "";
    const question = document.getElementById("question");
    question.innerText = ++id + ". Question";
    checkedAnswer.checked = false;
  }

  if (id === 9) {
    buttonElem.innerText = "Submit";
  }
});

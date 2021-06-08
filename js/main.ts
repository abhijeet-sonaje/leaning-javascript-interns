type Question = {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

type ResponseFromApi = {
  response_code: number,
  results: Question[]
}

const responseFromApi = fetch(
  "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean"
)
  .then((res: Response) => res.json())
  .then((data: ResponseFromApi) => {
    if (data.response_code === 0) {
      const sampleData: Question[] = data.results;
      main(sampleData);
    }
  })
  .catch((err: any) => {
    alert(err.message || err);
  });

const answerArray: string[] = [];

function main(sampleData: Question[]): void {
  const questionIdElem: HTMLElement = document.getElementById("_id");
  const totalQuestionElem: HTMLElement = document.getElementById("_total");
  totalQuestionElem.innerText = sampleData.length + '';
  const buttonElem: HTMLElement = document.getElementById("submit-btn");
  const warningElem: HTMLElement = document.getElementById("warning");
  const question: HTMLElement = document.getElementById("question");
  const fieldsetElem: HTMLElement = document.getElementById("my-fieldset");
  const scoreElem: HTMLElement = document.getElementById("score");

  let id: number = 0;
  question.innerHTML = `${id + 1}. ${sampleData[id].question}`;
  questionIdElem.innerText = id + 1 + '';

  buttonElem.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    const options: any = document.getElementsByName("option");

    let checkedAnswer: HTMLInputElement = null;
    let count:number = 0;
    for (let opt of options) {
      if (opt.checked) {
        const answer: string = opt.id === "option1" ? "True" : "False";
        answerArray.push(answer);
        checkedAnswer = opt;
      } else {
        count++;
      }
    }

    ++id;
    if (id === sampleData.length) {
      const score:number = calculateScore(sampleData);
      fieldsetElem.style.display = "none";
      (<HTMLElement>scoreElem.children[1]).innerText = `${score} / ${sampleData.length}`;
      scoreElem.style.display = "block";
      return;
    }

    if (count === 2) {
      warningElem.innerText = "Please select one option!";
    } else {
      warningElem.innerText = "";
      question.innerHTML = `${id + 1}. ${sampleData[id].question}`;
      questionIdElem.innerText = id + 1 + '';
      checkedAnswer.checked = false;
    }

    if (id === sampleData.length - 1) {
      buttonElem.innerText = "Submit";
    }
  });
}

function calculateScore(sampleData: Question[]): number {
  let correctAnswerCounter:number = 0;
  for (let i = 0; i < answerArray.length; i++) {
    const questionCorrectAnswer: string = sampleData[i].correct_answer;
    if (questionCorrectAnswer === answerArray[i]) {
      correctAnswerCounter++;
    }
  }
  return correctAnswerCounter;
}

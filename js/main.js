var responseFromApi = fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean")
    .then(function (res) { return res.json(); })
    .then(function (data) {
    if (data.response_code === 0) {
        var sampleData = data.results;
        main(sampleData);
    }
})["catch"](function (err) {
    alert(err.message || err);
});
var answerArray = [];
function main(sampleData) {
    var questionIdElem = document.getElementById("_id");
    var totalQuestionElem = document.getElementById("_total");
    totalQuestionElem.innerText = sampleData.length + '';
    var buttonElem = document.getElementById("submit-btn");
    var warningElem = document.getElementById("warning");
    var question = document.getElementById("question");
    var fieldsetElem = document.getElementById("my-fieldset");
    var scoreElem = document.getElementById("score");
    var id = 0;
    question.innerHTML = id + 1 + ". " + sampleData[id].question;
    questionIdElem.innerText = id + 1 + '';
    buttonElem.addEventListener("click", function (e) {
        e.preventDefault();
        var options = document.getElementsByName("option");
        var checkedAnswer = null;
        var count = 0;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var opt = options_1[_i];
            if (opt.checked) {
                var answer = opt.id === "option1" ? "True" : "False";
                answerArray.push(answer);
                checkedAnswer = opt;
            }
            else {
                count++;
            }
        }
        ++id;
        if (id === sampleData.length) {
            var score = calculateScore(sampleData);
            fieldsetElem.style.display = "none";
            scoreElem.children[1].innerText = score + " / " + sampleData.length;
            scoreElem.style.display = "block";
            return;
        }
        if (count === 2) {
            warningElem.innerText = "Please select one option!";
        }
        else {
            warningElem.innerText = "";
            question.innerHTML = id + 1 + ". " + sampleData[id].question;
            questionIdElem.innerText = id + 1 + '';
            checkedAnswer.checked = false;
        }
        if (id === sampleData.length - 1) {
            buttonElem.innerText = "Submit";
        }
    });
}
function calculateScore(sampleData) {
    var correctAnswerCounter = 0;
    for (var i = 0; i < answerArray.length; i++) {
        var questionCorrectAnswer = sampleData[i].correct_answer;
        if (questionCorrectAnswer === answerArray[i]) {
            correctAnswerCounter++;
        }
    }
    return correctAnswerCounter;
}
//# sourceMappingURL=main.js.map
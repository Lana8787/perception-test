//Start section
let start = document.querySelector("#start");

//Guide section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Test section
let test = document.querySelector("#test");
let time = document.querySelector("#time");

//Question section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple choices of questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//Correct and next button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#points");
let startAgain = document.querySelector("#startAgain");
let message_result = document.querySelector("#message_result");

//Get All 'H4' From Test Section (testQuestions)
let choice_que = document.querySelectorAll(".choice_que");

let index = 0;

//total points
let correct = 0;

//What happen when "Start" button will click
start.addEventListener("click", () => {
  start.style.display = "none";
  guide.style.display = "block";
});

//What happen when "Exit" button will click
exit.addEventListener("click", () => {
  start.style.display = "block";
  guide.style.display = "none";
});

//What happen when "Start again" button will click
startAgain.addEventListener("click", () => {
  result.style.display = "none";
  start.style.display = "block";
  index = 0;
  testQuestions.forEach((item) => {
    item.selected = null;
  });
});

//Count result
function countResult() {
  let choice1Num = 0;
  let choice2Num = 0;
  let choice3Num = 0;
  let choice4Num = 0;

  testQuestions.forEach((item) => {
    if (item.selected === CHOICE1) {
      choice1Num++;
    } else if (item.selected === CHOICE2) {
      choice2Num++;
    } else if (item.selected === CHOICE3) {
      choice3Num++;
    } else if (item.selected === CHOICE4) {
      choice4Num++;
    }
  });

  const maxChoice = Math.max(choice1Num, choice2Num, choice3Num, choice4Num);

  if (maxChoice === choice1Num) {
    return "Кінестет";
  }

  if (maxChoice === choice2Num) {
    return "Аудіал";
  }

  if (maxChoice === choice3Num) {
    return "Візуал";
  }

  if (maxChoice === choice4Num) {
    return "Дигітал";
  }
}

//Clean answers function, when we want do an other choice
let removeSelectedClass = () => {
  option1.classList.remove("selected");
  option2.classList.remove("selected");
  option3.classList.remove("selected");
  option4.classList.remove("selected");
};

let loadData = () => {
  questionNo.innerText = index + 1 + ". ";
  questionText.innerText = testQuestions[index].question;
  option1.innerText = testQuestions[index].choice1;
  option2.innerText = testQuestions[index].choice2;
  option3.innerText = testQuestions[index].choice3;
  option4.innerText = testQuestions[index].choice4;

  //Stole users choices
  option1.addEventListener("click", () => {
    testQuestions[index].selected = CHOICE1;
    removeSelectedClass();
    option1.classList.add("selected");
  });
  option2.addEventListener("click", () => {
    testQuestions[index].selected = CHOICE2;
    removeSelectedClass();
    option2.classList.add("selected");
  });
  option3.addEventListener("click", () => {
    testQuestions[index].selected = CHOICE3;
    removeSelectedClass();
    option3.classList.add("selected");
  });
  option4.addEventListener("click", () => {
    testQuestions[index].selected = CHOICE4;
    removeSelectedClass();
    option4.classList.add("selected");
  });
  console.log(testQuestions);
  //    timer start
  //timer = 0;
};

loadData();
//What happen when "Continue" button will click
continueBtn.addEventListener("click", () => {
  test.style.display = "block";
  guide.style.display = "none";
  console.log(test);

  loadData();

  // Remove all active classes when "continue" button will click
  choice_que.forEach((removeActive) => {
    removeActive.classList.remove("active");
  });
  total_correct.innerHTML = `${index++} Out Of ${
    testQuestions.length
  } Questions`;
});

//What happen when 'Next' button will click
next_question.addEventListener("click", () => {
  //What happen if some choice is not selected
  if (testQuestions[index].selected) {
    removeSelectedClass();
    if (index !== testQuestions.length - 1) {
      index++;
    } else if (index === testQuestions.length - 1) {
      result.style.display = "block";
      test.style.display = "none";
      message_result.innerHTML = `<h6>${countResult()}</h6>`;
    }
    choice_que.forEach((removeActive) => {
      removeActive.classList.remove("correct");
      removeActive.classList.remove("wrong");
    });
    loadData();
  }
});

//Count questions
choice_que.forEach((choices, choiceNo) => {
  choices.addEventListener("click", () => {
    //check answer
    if (choiceNo === testQuestions[index].selected) {
      correct++;
    } else {
      correct += 0;
    }
    loadData();
  });
});

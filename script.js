
//shuffled selected questions are in an empty array
let shuffledQuestions = []

//shuffle and push 10 questions to shuffledQuestions array
function handleQuestions() {
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)]
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random)
    }
  }
}

//set variables 
let questionNumber = 1
let userScore = 0
let wrongAttempt = 0
let indexNumber = 0

//function to show next question in the array
function NextQuestion(index) {
  handleQuestions()
  const currentQuestion = shuffledQuestions[index]
  document.getElementById("question-number").innerHTML = questionNumber
  document.getElementById("user-score").innerHTML = userScore
  document.getElementById("show-question").innerHTML = currentQuestion.question;
  document.getElementById("choice-one-label").innerHTML = currentQuestion.choiceA;
  document.getElementById("choice-two-label").innerHTML = currentQuestion.choiceB;
  document.getElementById("choice-three-label").innerHTML = currentQuestion.choiceC;
  document.getElementById("choice-four-label").innerHTML = currentQuestion.choiceD;

}

//function to check for answers
function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber] //get the current question 
  const currentQuestionAnswer = currentQuestion.correctChoice //get the answer for the current question
  const options = document.getElementsByName("option"); //get option elements in the dom found in radio inputs
  let correctChoice = null

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get correct radio input with correct answer
      correctChoice = option.labels[0].id
    }
  })

  //ensure that radio input has been checked or a choice has been selected
  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    document.getElementById('choice-modal').style.display = "flex"
  }

  //check if the selected radio button corresponds to the right answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctChoice).style.backgroundColor = "green"
      userScore++
      indexNumber++
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++
      }, 1000)
    }

    else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id
      document.getElementById(wrongLabelId).style.backgroundColor = "red"
      document.getElementById(correctChoice).style.backgroundColor = "green"
      wrongAttempt++
      indexNumber++
      //set time delay to question number until the next question loads
      setTimeout(() => {
        questionNumber++
      }, 1000)
    }
  })
}



//function when the next question is called
function handleNextQuestion() {
  checkForAnswer()
  unCheckRadioButtons()
  //set time delay on next question showing for a second
  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber)
    }
    else {
      handleEndGame()
    }
    resetOptionBackground()
  }, 1000);
}

//resets background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}

//unselect all radio buttons and resets for the next question
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

//function when the quiz is finished and questions are answered
function handleEndGame() {
  let comment = null
  let commentColor = null

  //comment on user results 
  if (userScore <= 3) {
    comment = "Unsatisfactory, keep learning!"
    commentColor = "red"
  }
  else if (userScore >= 4 && userScore < 7) {
    comment = "Acceptable but improvement is needed!"
    commentColor = "orange"
  }
  else if (userScore >= 7) {
    comment = "Awesome, keep up the good work!"
    commentColor = "green"
  }
  const playerGrade = (userScore / 10) * 100

  //display results
  document.getElementById('comments').innerHTML = comment
  document.getElementById('comments').style.color = commentColor
  document.getElementById('result-percentage').innerHTML = playerGrade
  document.getElementById('wrong-answers').innerHTML = wrongAttempt
  document.getElementById('right-answers').innerHTML = userScore
  document.getElementById('score-modal').style.display = "flex"

}

//closes result popup and resets game
function closeScoreModal() {
  questionNumber = 1
  userScore = 0
  wrongAttempt = 0
  indexNumber = 0
  shuffledQuestions = []
  NextQuestion(indexNumber)
  document.getElementById('score-modal').style.display = "none"
}

//close warning popup
function closeChoiceModal() {
  document.getElementById('choice-modal').style.display = "none"
}

//set questions
const questions = [
  {
    question: "In which country would you be if you were visiting Taj Mahal?",
    choiceA: "Sri Lanka",
    choiceB: "Nepal",
    choiceC: "Pakistan",
    choiceD: "India",
    correctChoice: "choiceD"
  },

  {
    question: "In which Scandinavian country would you find fjords?",
    choiceA: "Sweden",
    choiceB: "Norway",
    choiceC: "Iceland",
    choiceD: "Finland",
    correctChoice: "choiceB"
  },

  {
    question: "Baku is the capital city of which eastern European country?",
    choiceA: "Georgia",
    choiceB: "Armenia",
    choiceC: "Azerbaijan",
    choiceD: "Serbia",
    correctChoice: "choiceC"
  },

  {
    question: "In which country would you find Lake Bled?",
    choiceA: "Montenegro",
    choiceB: "Slovenia",
    choiceC: "Croatia",
    choiceD: "Hungary",
    correctChoice: "choiceB"
  },

  {
    question: "Which is the smallest country in the world?",
    choiceA: "Andorra",
    choiceB: "San Marino",
    choiceC: "Ibiza",
    choiceD: "Vatican City",
    correctChoice: "choiceD"
  },

  {
    question: "Machu Picchu can be found in which country?",
    choiceA: "Peru",
    choiceB: "Bolivia",
    choiceC: "Japan",
    choiceD: "Taiwan",
    correctChoice: "choiceA"
  },

  {
    question: "Which city would you visit to see the architecture of Gaudi?",
    choiceA: "Milan",
    choiceB: "Lisbon",
    choiceC: "Barcelona",
    choiceD: "Nizza",
    correctChoice: "choiceC"
  },

  {
    question: "Which country is the largest in the world?",
    choiceA: "Russia",
    choiceB: "Canada",
    choiceC: "Africa",
    choiceD: "Egypt",
    correctChoice: "choiceA"
  },

  {
    question: "What is the unit currency of Poland?",
    choiceA: "Forint",
    choiceB: "Euro",
    choiceC: "Lira",
    choiceD: "Zloty",
    correctChoice: "choiceD"
  },

  {
    question: "What is the capital of Malta",
    choiceA: "Nizza",
    choiceB: "La Palma",
    choiceC: "Porto",
    choiceD: "Valetta",
    correctChoice: "choiceD"
  },

  {
    question: "Where is the world tallest building located?",
    choiceA: "Africa",
    choiceB: "California",
    choiceC: "Dubai",
    choiceD: "Italy",
    correctChoice: "choiceC"
  },

  {
    question: "The longest river in the United Kingdom is?",
    choiceA: "River Severn",
    choiceB: "River Mersey",
    choiceC: "River Trent",
    choiceD: "River Tweed",
    correctChoice: "choiceA"
  },


  {
    question: "What country has the longest coastline in the world?",
    choiceA: "USA",
    choiceB: "Canada",
    choiceC: "Russia",
    choiceD: "China",
    correctChoice: "choiceB"
  },

  {
    question: "If you travelled to the city of Volgograd, which country would be in?",
    choiceA: "Mongolia",
    choiceB: "Belarus",
    choiceC: "Ukraine",
    choiceD: "Russia",
    correctChoice: "choiceD"
  },

  {
    question: "Mount Vesuvius overlooks which present-day Italian city",
    choiceA: "Naples",
    choiceB: "Florence",
    choiceC: "Milan",
    choiceD: "Rome",
    correctChoice: "choiceA"
  },

  {
    question: "Dracula famously lived in the historical region of Transylvania, but in what country would you now find his castle?",
    choiceA: "Bulgaria",
    choiceB: "Slovenia",
    choiceC: "Romania",
    choiceD: "Serbia",
    correctChoice: "choiceC"
  },

  {
    question: "Where is Stellenbosch?",
    choiceA: "South Africa",
    choiceB: "Germany",
    choiceC: "Netherlands",
    choiceD: "Belgium",
    correctChoice: "choiceA"
  },

  {
    question: "Which city is also known as the Big Apple?",
    choiceA: "Las Vegas",
    choiceB: "Texas",
    choiceC: "New York",
    choiceD: "California",
    correctChoice: "choiceC"
  },

  {
    question: "What is the capital of Switzerland?",
    choiceA: "Zurich",
    choiceB: "Geneva",
    choiceC: "Lucerne",
    choiceD: "Bern",
    correctChoice: "choiceD"
  },

  {
    question: "What is the capital of Turkey?",
    choiceA: "Ankara",
    choiceB: "Istanbul",
    choiceC: "Antalya",
    choiceD: "Bursa",
    correctChoice: "choiceA"
  },

  {
    question: "Which city is not part of Austrlia?",
    choiceA: "Melbourne",
    choiceB: "Sydney",
    choiceC: "Brisbane",
    choiceD: "Wellington",
    correctChoice: "choiceD"
  },

  {
    question: "Which country is not border to Germany?",
    choiceA: "France",
    choiceB: "Hungary",
    choiceC: "Austria",
    choiceD: "Switzerland",
    correctChoice: "choiceB"
  },

  {
    question: "Which is the highest mountain in Switzerland?",
    choiceA: "Jungfrau",
    choiceB: "Monte Rosa",
    choiceC: "Matterhorn",
    choiceD: "Eiger",
    correctChoice: "choiceB"
  },

  {
    question: "In which country is Pokhara",
    choiceA: "Japan",
    choiceB: "Korea",
    choiceC: "Nepal",
    choiceD: "India",
    correctChoice: "choiceC"
  },

  {
    question: "Where is the Gobi desert?",
    choiceA: "China",
    choiceB: "Russia",
    choiceC: "Mongolia",
    choiceD: "India",
    correctChoice: "choiceC"
  }

]

function changeMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}

let factsList = [
  {
    fact: "Trees make oxygen that we need to breathe.",
    false_fact: "Trees make poisonous gas that we should not breathe.",
    img: "oxygen.gif",
  },
  {
    fact: "A group of cows is called a herd.",
    false_fact: "A group of cows is called a flock.",
    img: "cows.jpg",
  },
  {
    fact: "The Earth is a giant ball that we live on.",
    false_fact: "The Earth is flat like a pancake.",
    img: "earth_ball.webp",
  },
  {
    fact: "A butterfly starts as a caterpillar and turns into a butterfly after it goes into a cocoon.",
    false_fact:
      "A butterfly starts as a bird and turns into a butterfly after it hatches from an egg.",
    img: "caterpillar.avif",
  },
  {
    fact: "There are seven colors in a rainbow: red, orange, yellow, green, blue, indigo, and violet.",
    false_fact:
      "There are five colors in a rainbow: red, yellow, green, blue, and purple.",
    img: "rainbow.jpg",
  },
  {
    fact: "A baby kangaroo is called a joey and lives in its mother's pouch.",
    false_fact: "A baby kangaroo is called a puppy and lives in a doghouse.",
    img: "kangaroo.jpg",
  },
  {
    fact: "Birds lay eggs to have babies, just like chickens.",
    false_fact: "Birds lay eggs to make pancakes, just like people.",
    img: "birdsneggs.jpg",
  },
  {
    fact: "The sun rises in the east and sets in the west.",
    false_fact: "The sun rises in the west and sets in the east.",
    img: "sunrise.jpg",
  },
  {
    fact: "A full moon is a circle, but a crescent moon looks like a banana.",
    false_fact:
      "A full moon is a square, but a crescent moon looks like a star.",
    img: "banana.webp",
  },
  {
    fact: "Cars need gas to go, just like people need food to have energy.",
    false_fact: "Cars run on magic and do not need gas to go.",
    img: "cars.jpg",
  },
];

// ---------------------------------------------- For the learning page ---------------------------------------------- //
fact_counter = 0; // this variable keeps track of the number of facts the user has learned
fact_learn_history = []; // this array keeps track of the facts the user has learned. Used to switch between facts.

// as the name suggests, this function generates a random number between the start and end values. The +1 is to include the end value in the range.
function randomGenerator(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

// this function is called when the page is loaded
function reloadPage() {
  let history = localStorage.getItem("fact_learn_history");
  let counter = localStorage.getItem("fact_counter");

  if (history != null) {
    fact_learn_history = JSON.parse(history);
  }
  if (counter != null) {
    fact_counter = parseInt(counter);
  }
  if (fact_counter > 0) {
    let fact_no = fact_learn_history[fact_counter - 1];
    let fact_text = factsList[fact_no].fact;
    document.getElementById("fact_id").innerHTML = fact_counter;
    document.getElementById("fact_text").innerHTML = fact_text;
    document.getElementById("fact_image").src = factsList[fact_no].img;
  } else {
    let fact_no = randomGenerator(0, 9);
    let fact_text = factsList[fact_no].fact;
    document.getElementById("fact_id").innerHTML = fact_counter + 1;
    document.getElementById("fact_text").innerHTML = fact_text;
    document.getElementById("fact_image").src = factsList[fact_no].img;
    fact_learn_history.push(fact_no);
    fact_counter += 1;
  }

  localStorage.setItem(
    "fact_learn_history",
    JSON.stringify(fact_learn_history)
  );
  localStorage.setItem("fact_counter", fact_counter);
}

// this function is called when the user clicks on the "Next Fact" button
function nextFact() {
  // if the user has not learned all the facts, then the next fact is displayed
  if (fact_counter < 10) {
    // this if statement checks if the user has already learned some of the facts and is now somewhere in the middle of the facts list
    if (fact_counter < fact_learn_history.length) {
      let fact_no = fact_learn_history[fact_counter]; // NOTE: fact_counter is one step ahead of the index of the fact_learn_history array
      let fact_text = factsList[fact_no].fact;
      document.getElementById("fact_id").innerHTML = fact_counter + 1;
      document.getElementById("fact_text").innerHTML = fact_text;
      document.getElementById("fact_image").src = factsList[fact_no].img;
      fact_counter += 1;
    }
    // if the user is at the end of the facts list, then a new fact is generated
    else {
      let fact_no = randomGenerator(0, 9);
      while (fact_learn_history.includes(fact_no)) {
        fact_no = randomGenerator(0, 9);
      }
      let fact_text = factsList[fact_no].fact;
      document.getElementById("fact_id").innerHTML = fact_counter + 1;
      document.getElementById("fact_text").innerHTML = fact_text;
      document.getElementById("fact_image").src = factsList[fact_no].img;
      fact_counter += 1;
      fact_learn_history.push(fact_no);
    }
    localStorage.setItem(
      "fact_learn_history",
      JSON.stringify(fact_learn_history)
    );
    localStorage.setItem("fact_counter", fact_counter);
  }
  // if the user has learned all the facts, then an alert is displayed
  else {
    alert("You have learned all the facts!");
  }
}

// this function is called when the user clicks on the "Previous Fact" button
function prevFact() {
  // if the user is not at the first fact, then the previous fact is displayed.
  // when the first fact is displayed, fact_counter = 1, so the user cannot go back to the previous fact
  if (fact_counter > 1) {
    fact_counter -= 1;
    let fact_no = fact_learn_history[fact_counter - 1];
    let fact_text = factsList[fact_no].fact;
    document.getElementById("fact_id").innerHTML = fact_counter;
    document.getElementById("fact_text").innerHTML = fact_text;
    document.getElementById("fact_image").src = factsList[fact_no].img;
    localStorage.setItem(
      "fact_learn_history",
      JSON.stringify(fact_learn_history)
    );
    localStorage.setItem("fact_counter", fact_counter);
  } else {
    alert("You have reached the first fact!");
  }
}

// ----------------------------------- For the quiz page ------------------------------------ //

question_counter = 0; // this variable keeps track of the number of questions the user has answered
question_answer_history = []; // this array keeps track of the questions the user has answered. Used to switch between questions.
answer_history = []; // keep track of answers
question_text = [];

function questTextGetter(index) {
  let roullete = randomGenerator(0, 1);
  // console.log(roullete);
  if (roullete == 1) {
    return factsList[index].fact;
  } else {
    return factsList[index].false_fact;
  }
}

// this function is called when the user loads the page
function quizPageLoad() {
  let history = localStorage.getItem("question_answer_history");
  let counter = localStorage.getItem("question_counter");
  let answer = localStorage.getItem("answer_history");
  let text = localStorage.getItem("question_text");

  if (history != null) {
    question_answer_history = JSON.parse(history);
  }
  if (counter != null) {
    question_counter = parseInt(counter);
  }
  if (answer != null) {
    answer_history = JSON.parse(answer);
  }
  if (text != null) {
    question_text = JSON.parse(text);
  }

  if (question_counter > 0) {
    if (question_counter === 5) {
      // console.log("here");
      document.getElementById("next_question").innerHTML = "Submit";
    }
    let question_no = question_answer_history[question_counter - 1];
    let quest_text = question_text[question_counter - 1];

    // localStorage.setItem("question_text", JSON.stringify(question_text));
    document.getElementById("quest_id").innerHTML = question_counter;
    document.getElementById("quest_text").innerHTML = quest_text;
    document.getElementById("fact_image").src = factsList[question_no].img;
    document.getElementById(
      "choice"
    ).innerHTML = `<label><input type="radio" name="answer" value="true">True</label>
        <label><input type="radio" name="answer" value="false">False</label>`;
  } else {
    let question_no = randomGenerator(0, 9);
    let quest_text = questTextGetter(question_no);
    question_text.push(quest_text);
    document.getElementById("quest_id").innerHTML = question_counter + 1;
    document.getElementById("quest_text").innerHTML = quest_text;
    document.getElementById("fact_image").src = factsList[question_no].img;

    document.getElementById(
      "choice"
    ).innerHTML = `<label><input type="radio" name="answer" value="true">True</label>
    <label><input type="radio" name="answer" value="false">False</label>`;
    question_answer_history.push(question_no);
    question_counter += 1;
    localStorage.setItem(
      "question_answer_history",
      JSON.stringify(question_answer_history)
    );
    localStorage.setItem("question_counter", question_counter);
    localStorage.setItem("answer_history", JSON.stringify(answer_history));
    localStorage.setItem("question_text", JSON.stringify(question_text));
  }
}

// score calculator

function calculate_score() {
  let score = 0;

  let questions = localStorage.getItem("question_answer_history");
  let answers = localStorage.getItem("answer_history");
  let question_text = localStorage.getItem("question_text");

  if (questions != null) {
    question_answer_history = JSON.parse(questions);
  }
  if (answers != null) {
    answer_history = JSON.parse(answers);
  }
  if (question_text != null) {
    question_text = JSON.parse(question_text);
  }

  console.log(question_answer_history);
  console.log(answer_history);
  console.log(question_text);

  for (let i = 0; i < 5; i++) {
    let question_no = question_answer_history[i];
    let answer = answer_history[i];
    let question = question_text[i];

    // console.log(question_no);
    // console.log(answer);

    if (answer == "true") {
      // console.log(factsList[question_no].fact);
      if (factsList[question_no].fact === question) {
        console.log("true");
        score += 10;
      }
    } else {
      // console.log(factsList[question_no].false_fact);
      if (factsList[question_no].false_fact === question) {
        score += 10;
      }
    }
  }
  // console.log(score);
  return score;
}

// this function is called when the user clicks on the "Next Question" button
function nextQuest() {
  let choice = document.getElementsByName("answer");

  // noted dow the users answer in local storeage
  if (choice[0].checked == true) {
    console.log("true");
    answer_history.push("true");
  } else if (choice[1].checked == true) {
    console.log("false");
    answer_history.push("false");
  } else {
    alert("Please select an answer!");
    return;
  }

  localStorage.setItem("answer_history", JSON.stringify(answer_history));

  // if the user has not answered all the questions, then the next question is displayed
  if (question_counter < 5) {
    if (question_counter === 4) {
      document.getElementById("next_question").innerHTML = "Submit";
    }
    // this if statement checks if the user has already answered some of the questions and is now somewhere in the middle of the questions list
    if (question_counter < question_answer_history.length) {
      let question_no = question_answer_history[question_counter]; // NOTE: question_counter is one step ahead of the index of the question_answer_history array
      let quest_text = questTextGetter(question_no);
      question_text.push(quest_text);

      document.getElementById("quest_id").innerHTML = question_counter + 1;
      document.getElementById("quest_text").innerHTML = quest_text;
      document.getElementById("fact_image").src = factsList[question_no].img;

      document.getElementById(
        "choice"
      ).innerHTML = `<label class="radio"><input type="radio" name="answer" value="true"> True</label>
    <label class="radio"><input type="radio" name="answer" value="false"> False</label>`;
      question_counter += 1;
      return;
    }
    // if the user is at the end of the questions list, then a new question is generated
    else {
      let question_no = randomGenerator(0, 9);
      while (question_answer_history.includes(question_no)) {
        question_no = randomGenerator(0, 9);
      }
      let quest_text = questTextGetter(question_no);
      question_text.push(quest_text);

      document.getElementById("quest_id").innerHTML = question_counter + 1;
      document.getElementById("quest_text").innerHTML = quest_text;

      document.getElementById("fact_image").src = factsList[question_no].img;

      document.getElementById(
        "choice"
      ).innerHTML = `<label class="radio"><input type="radio" name="answer" value="true"> True</label>
    <label class="radio"><input type="radio" name="answer" value="false"> False</label>`;
      question_counter += 1;
      question_answer_history.push(question_no);
    }
    localStorage.setItem(
      "question_answer_history",
      JSON.stringify(question_answer_history)
    );
    localStorage.setItem("question_counter", question_counter);
    localStorage.setItem("answer_history", JSON.stringify(answer_history));
    localStorage.setItem("question_text", JSON.stringify(question_text));
  }
  // if the user has answered all the questions, then an alert is displayed
  else {
    // alert("all questions answered");
    // now all answers are stored in the answer_history array so now i have to calculate the score
    // and display it on the sam e page using a sibling div element that is hidden by default
    // and only displayed when the user clicks on the "Submit" button

    // console.log(calculate_score());
    let score = calculate_score();
    let scoreCard = document.getElementById("result");
    let backgroud = document.getElementById("sibling");

    backgroud.style.filter = "blur(5px)";
    scoreCard.style.visibility = "visible";
    if (score >= 30) {
      document.getElementById(
        "reaction_text"
      ).innerHTML = `<span style="color:green">Success</span>Congratulations! You have passed the test!`;
      document.getElementById("my_honest_reaction").src = "success.gif";
    } else {
      document.getElementById(
        "reaction_text"
      ).innerHTML = `<span style="color:red">FAILURE</span>Better Luck Next Time, Kiddo!`;
      document.getElementById("my_honest_reaction").src = "u_lose.gif";
    }

    document.getElementById("score").innerHTML = score;
  }
}

function clearLocal() {
  localStorage.clear();
}

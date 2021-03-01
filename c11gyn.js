const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
	question: "Q1. Which of the following statements is NOT true about adult granulosa cell tumours of the ovary?",
    choice1: "The majority of the tumours are unilateral, with only a small number of cases presenting as bilateral ovarian masses",
    choice2: "The FOXL2 mutation is characteristic of adult granulosa cell tumour of the ovary",
    choice3: "Positive FOXL2 immunohistochemistry can be used to distinguish adult granulosa cell tumour from other ovarian sex cord-stromal tumours",
    choice4: "Reticulin is useful in distinguishing between granulosa cell tumours and thecomas",
    answer: 3
  },
  {
    question: "Q2. Ovarian low grade serous carcinoma (LGSC) and high grade serous carcinoma (HGSC) differ in which of the following?",
    choice1: "HGSC has more solid areas within the tumour than LGSC",
    choice2: "Mitotic rate is typically higher in HGSC than in LGSC",
    choice3: "Total absence of P53 immunohistochemistry is usually seen with HGSC but not LGSC",
    choice4: "Both B and C",
    answer: 4
  },
  {
    question: "Q3. A 36-year-old woman has recently had her intrauterine device (IUD) removed. The endometrial biopsy specimen shows lymphoid follicles with increased numbers of plasma cells. Which of the following statements is true?",
    choice1: "The likely diagnosis is acute endometritis",
    choice2: "Acute salpingitis is often associated with this condition",
    choice3: "The etiology for this condition is usually non-infectious",
    choice4: "Plasma cells are not seen in normal menstrual endometrium",
    answer: 2
  },
  {
    question: "Q4. When examining a hysterectomy specimen labeled 'fibroid uterus' a single lesion in the myometrium is identified. A diagnosis of uterine perivascular epithelioid cell tumour (PEComa) is made. Which of the following statements is NOT true?",
    choice1: "PEComa is morphologically and immunohistochemically similar to epithelioid angiomyolipoma, lymphangioleiomyoma and celar cell 'sugar' tumours",
    choice2: "Patchy HMB-45 positivity is usualyl seen in PEComa",
    choice3: "PEComa can be positive for muscle markers such as smooth muscle actin",
    choice4: "All PEComas are considered malignant neoplasms",
    answer: 4
  },
  {
    question: "Q5. Which of the following immunohistochemical markers is NOT useful to distinguish serous carcinoma from mesothelioma?",
    choice1: "WT1",
    choice2: "PAX8",
    choice3: "Estrogen receptor (ER)",
    choice4: "Calretinin",
    answer: 1
  },
  {
    question: "Q6. The following diagnoses can be reliably made on endometrial curettage except?",
    choice1: "Endometrial carcinosarcoma",
    choice2: "Atypical endometrial hyperplasia",
    choice3: "Adenosarcoma",
    choice4: "Endometrial stromal nodule",
    answer: 4
  },
  {
    question: "Q7. Some gynecological tumours are known to be associated with specific mutations. The following tumour mutations can be seen as germline mutations with the exception of?",
    choice1: "FOXL2 and adult granulosa cell tumour",
    choice2: "BRCA1 and high grade ovarian serous carcinoma",
    choice3: "SMARCA4 and ovarian small cell carcinoma, hypercalcemic type",
    choice4: "DICER1 and Sertoli-Leydig cell tumour",
    answer: 1
  },
  {
    question: "Q8. A patient with which of the following conditions present with an elevated serum human chorionic gonadotropin (B-hcg)?",
    choice1: "Choriocarcinoma",
    choice2: "Molar pregnancy",
    choice3: "Germ cell tumour",
    choice4: "All of the above",
    answer: 4
  },
  {
    question: "Q9. Which of the following gynecological tumours are not known to be associated with Peutz-Jeghers syndrome?",
    choice1: "Endocervical gastric type adenocarcinoma",
    choice2: "Bilateral ovarian fibromas",
    choice3: "Adnexal mucinous neoplasms",
    choice4: "Sex cord tumour with annular tubules",
    answer: 2
  },
  {
    question: "Q10. Which of these features are not seen with uterine adenosarcoma?",
    choice1: "Leaflike architecture",
    choice2: "Sarcomatous overgrowth",
    choice3: "Rhabdomyoblastic differentiation",
    choice4: "Malignant glandular epithelium",
    answer: 4
  },
  {
    question: "Q11. Which of the following statements is true regarding uterine adenosarcoma?",
    choice1: "Its clinical behaviour is similar to carcinosarcoma",
    choice2: "Deep myometrial invasion is an adverse prognostic factor",
    choice3: "It is staged in the same way as endometrial stromal sarcoma",
    choice4: "The presence of sex cord-like elements is an edverse prognostic factor",
    answer: 2
  },
  {
    question: "Q12. An 18-year-old woman has been diagnosed with a low grade squamous intraepithelial lesion. Which of the following statements is NOT true?",
    choice1: "Human papillomavirus (HPV) types 6 or 11 may be responsible for the lesion",
    choice2: "HPV types 16 or 18 may be responsible for the lesion",
    choice3: "As this is a presursor lesion to squamous cell carcinoma, the patient requires cone biopsy as the next step of management",
    choice4: "The presence of koilocytic change is seen with this diagnosis",
    answer: 3
  },
  {
    question: "Q13. Which feature is useful in distinguishing low grade endometrial stromal sarcoma from endometrial stromal nodule?",
    choice1: "Presence of smooth muscle differentiation",
    choice2: "Mitotic rate",
    choice3: "Infiltrative border",
    choice4: "Positive for estrogen-receptor immunohistochemistry",
    answer: 3
  },
  {
    question: "Q14. Which of the following statements regarding differentiated vulvar intraepithelial neoplasm (dVIN) is NOT true?",
    choice1: "It is associated with high risk HPV infection",
    choice2: "P53 expression is believed to be abnormal in dVIN however it is difficult to interpret as a diagnostic immunohistochemical marker",
    choice3: "dVIN usually occurs in older patients compared usual VIN",
    choice4: "dVIN is more likely than uVIN to progress to invasive carcinoma",
    answer: 1
  },
  {
    question: "Q15. For uterine smooth muscle tumours, which of the following statements is true?",
    choice1: "Infiltrative border is a required diagnostic criterion for leiomyosarcoma",
    choice2: "Increased mitotic rate >10/10 high powered fields (HPF) is on its own, sufficient to diagnose smooth muscle tumour with uncertain malignant potential",
    choice3: "Benign leiomyoma should not have tumour cell necrosis",
    choice4: "A combination of CD10 and desmin can reliably distinguish smooth muscle tumour from endometrial stromal neoplasm",
    answer: 3
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  questionIndex = 0;
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("c11gynend.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

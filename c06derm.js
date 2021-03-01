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
	question: "Q1. All of the following are found in mycosis fungoides except?",
    choice1: "Pautrier microabscesses",
    choice2: "Munro microabscesses",
    choice3: "Papillary dermal fibroplasia (chicken wire pattern)",
    choice4: "Epidermotropism of lymphocytes",
	choice5: "Usually a predominance of CD4-positive over CD8-positive lymphocytes",
    answer: 2
  },
  {
    question: "Q2. Net-like or intercellular immunofluoresence is seen in what inflammatory skin disease?",
    choice1: "Lichen planus",
    choice2: "Bullous pemphigoid",
    choice3: "Linear IgA bullous dermatosis",
    choice4: "Pemphigus vulgaris",
	choice5: "Dermatitis herpetiformis",
    answer: 4
  },
  {
    question: "Q3. All of the following are true about lichen planus except?",
    choice1: "Pruritic flat-topped erythematous or violaceous papules are typical",
    choice2: "Wickham striae may be observed",
    choice3: "Wrists and ankles are common sites of involvement",
    choice4: "It may be associated with scarring or alopecia",
	choice5: "Arthritis is a common association",
    answer: 5
  },
  {
    question: "Q4. All of the following present with subepidermal blister except?",
    choice1: "Dermatitis herpetiformis",
    choice2: "Linear IgA bullous dermatosis",
    choice3: "Pemphigus gestationis",
    choice4: "IgA pemphigus",
	choice5: "Porphyria cutanea tarda",
    answer: 4
  },
  {
    question: "Q5. Which of the following is a fungal infection of the skin?",
    choice1: "Pityriasis lichenoides et varioliformis acuta",
    choice2: "Pityriasis rosea",
    choice3: "Pityriasis versicolor",
    choice4: "Pityriasis rubra pilaris",
	choice5: "Pityriasis alba",
    answer: 3
  },
  {
    question: "Q6. Which of the following is the most likely clinical scenario for Merkel cell carcinoma?",
    choice1: "An 8-year-old with a raised nodule on the cheek",
    choice2: "A 19-year-old with a pigmented lesion on the calf",
    choice3: "A 45-year-old with a pearly papule on the forehead",
    choice4: "A 60-year-old with a flat, roughened lesion on the face",
	choice5: "A 75-year old with a nodular lesion on the scalp",
    answer: 5
  },
  {
    question: "Q7. All of the following stains are positive in Merkel cell carcinoma except?",
    choice1: "CK20",
    choice2: "Synaptophysin",
    choice3: "Neurofilament",
    choice4: "Monokeratin",
	choice5: "TTF-1",
    answer: 5
  },
  {
    question: "Q8. All of the following paired vesiculobullous disorders show similar or almost identical histopathological features except?",
    choice1: "Porphyria cutanea tarda and pseudoporphyria",
    choice2: "Bullous pemphigoid and pemphigoid gestationis",
    choice3: "Bullous pemphigoid and epidermolysis bullosa acquisita",
    choice4: "Dermatitis herpetiformis and linear IgA dermatosis",
	choice5: "Pemphigus vulgaris and bullous lichen planus",
    answer: 5
  },
  {
    question: "Q9. Which of the following is a genodermatosis?",
    choice1: "Lichen planus",
    choice2: "Dermatitis herpetiformis",
    choice3: "Hailey-Hailey disease",
    choice4: "Grover disease",
	choice5: "Bowen disease",
    answer: 3
  },
  {
    question: "Q10. Which of the following is not a feature of tuberous sclerosis?",
    choice1: "Cortical tubers",
    choice2: "Lisch nodules",
    choice3: "Angiofibromas",
    choice4: "Shagreen patch",
	choice5: "Cardiac rhabdomyomas",
    answer: 2
  },
  {
    question: "Q11. All of the following disorders typically present with annular skin lesions except?",
    choice1: "Erythema multiforme",
    choice2: "Nummular eczema",
    choice3: "Granuloma annulare",
    choice4: "Subacute cutaneous lupus erythematosus",
	choice5: "Pretibial myxedema",
    answer: 5
  },
  {
    question: "Q12. What is the most common antigen in pemphigus vulgaris?",
    choice1: "Desmoplakin",
    choice2: "Desmoglein 1",
    choice3: "Desmoglein 3",
    choice4: "Desmoglein 4",
	choice5: "BpAg1",
    answer: 3
  },
  {
    question: "Q13. Which of the following stains will not highlight mast cells?",
    choice1: "Gomori methenamine silver (GMS)",
    choice2: "C-kit (CD117)",
    choice3: "Leder stain",
    choice4: "Giemsa",
	choice5: "Tryptase",
    answer: 1
  },
  {
    question: "Q14. A patient is diagnosed with Muir-Torre syndrome. Which of the following malignancies is linked with this syndrome?",
    choice1: "Merkel cell carcinoma",
    choice2: "Sebaceous carcinoma",
    choice3: "Microcystic adnexal carcinoma",
    choice4: "Malignant melanoma",
	choice5: "Basal cell carcinoma",
    answer: 2
  },
  {
    question: "Q15. Which of the following lesions does not show granulomatous inflammation in the skin?",
    choice1: "Sarcoidosis",
    choice2: "Drug reaction",
    choice3: "Granuloma annulare",
    choice4: "Granuloma faciale",
	choice5: "Tuberculosis",
    answer: 4
  },
  {
    question: "Q16. A patient develops a lesion on the arm after taking a certain drug. The lesion resolves but remains hyperpigmented.  When the patient is exposed to the drug again, the lesion recurs in the same location. This history is most compatible with which diagnosis?",
    choice1: "Fixed drug eruption",
    choice2: "Lichenoid drug eruption",
    choice3: "Drug induced lupus",
    choice4: "Interstitial granulomatous dermatitis",
	choice5: "Bullous drug reaction",
    answer: 1
  },
  {
    question: "Q17. All of the following conditions may resemble lichen planus histopathologically except?",
    choice1: "Lichenoid drug eruption",
    choice2: "Lichen simplex chronicus",
    choice3: "Lichenoid graft-versus-host disease (GVHD)",
    choice4: "Mycosis fungoides",
	choice5: "Lichen planus-like keratosis",
    answer: 2
  },
  {
    question: "Q18. A 45-year old HIV-positive patient presents with a generalized eruption of erythematous macules and papules with palmoplantar involvement and flu-like symptoms. The skin biopsy shows a psoriasiform and lichenoid dermatitis with plasma cells. Which of the following investigations ifs most pertinent in this setting?",
    choice1: "Human herpesvirus 8 (HHV-8) immunohistochemistry",
    choice2: "Cytomegalovirus immunohistochemistry",
    choice3: "Human papillomavirus immunohistochemistry",
    choice4: "Periodic acid-Schiff (PAS)-diastase and herpes simplex virus (HSV) immunohistochemistry",
	choice5: "Silver stain and/or Treponema pallidum immunohistochemistry",
    answer: 5
  },
  {
    question: "Q19. Clear cells can be observed in all the following except?",
    choice1: "Clear cell carcinoma",
    choice2: "Trichilemmoma",
    choice3: "Gout",
    choice4: "Sebaceous carcinoma",
	choice5: "Metastatic renal cell carcinoma",
    answer: 3
  },
  {
    question: "Q20. All of the following are true regarding epithelioid sarcoma except?",
    choice1: "It is a variant of angiosarcoma",
    choice2: "It typically affects young patients",
    choice3: "It may present as a painless nodule on the distal extremities",
    choice4: "It may mimic a palisading granulomaotus dermatitis on light microscopy",
	choice5: "It usually demonstrates an aggressive course",
    answer: 1
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;

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
    return window.location.assign("c06dermend.html");
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

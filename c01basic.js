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
	question: "Q1. Which of the following syndromes does not have an autosomal dominant inhertance pattern?",
    choice1: "Huntington disease",
    choice2: "Marfan syndrome",
    choice3: "Familial hypercholesterolemia",
    choice4: "Ehlers-Danlos syndrome",
	choice5: "Achondroplasia",
    answer: 4
  },
  {
    question: "Q2. What does serum transferrin measure?",
    choice1: "Iron stores",
    choice2: "Iron absorption",
    choice3: "Reticuloendothelial iron content",
    choice4: "Total body iron",
	choice5: "Total iron in the blood",
    answer: 2
  },
  {
    question: "Q3. What type of organisms are Nocardia species?",
    choice1: "Gram positive bacteria",
    choice2: "Gram negative bacteria",
    choice3: "Filamentous fungus",
    choice4: "Spore forming bacteria",
	choice5: "Mycobacteria",
    answer: 1
  },
   {
    question: "Q4. Disseminated intravascular coagulation (DIC) depletes all factors except?",
    choice1: "Platelets",
    choice2: "Fibrinogen",
    choice3: "Fibrin split products",
    choice4: "Antithrombin 3",
	choice5: "Factor 8",
    answer: 3
  },
  {
    question: "Q5. Which inheritable genetic condition exhibits anticipation?",
    choice1: "Huntington disease",
    choice2: "Down syndrome",
    choice3: "Gaucher disease",
    choice4: "Klinefelter syndrome",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q6. JAK2 mutations are associated with which condition?",
    choice1: "Polycythemia vera",
    choice2: "Crohn disease",
    choice3: "Ulcerative colitis",
    choice4: "Burkitt Lymphoma",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q7. Which protein is anti-apoptotic?",
    choice1: "BAX",
    choice2: "Caspase 9",
    choice3: "Caspase 3",
    choice4: "BCL-2",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q8. Pediatric cardiac rhabdomyomas are associated with which condition?",
    choice1: "Prader-Willi syndrome",
    choice2: "Tuberous sclerosis",
    choice3: "Niemann-Pick disease",
    choice4: "Down syndrome",
	choice5: "All of the above",
    answer: 2
  },
  {
    question: "Q9. Which is not a feature of apoptosis?",
    choice1: "Nuclear shrinkage",
    choice2: "DNA laddering",
    choice3: "Associated inflammation",
    choice4: "Membrane blebbing",
	choice5: "None of the above",
    answer: 3
  },
   {
    question: "Q10. Which cellular process is associated with cytochrome C release from mitochondria?",
    choice1: "Intrinsic pathway apoptosis",
    choice2: "Necrosis",
    choice3: "Extrinsic pathway apoptosis",
    choice4: "Autophagy",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q11. Patau syndrome is associated with which trisomy?",
    choice1: "13",
    choice2: "21",
    choice3: "18",
    choice4: "12",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q12. Which disease is associated with HLA-DR3?",
    choice1: "Diabetes",
    choice2: "Celiac disease",
    choice3: "Ankylosing spondylitis",
    choice4: "Crohn disease",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q13. Which disease is associated a t(8;14) translocation?",
    choice1: "Gastrointestinal stromal tumour",
    choice2: "Diffuse large B cell lymphoma",
    choice3: "Chronic myelogenous leukemia",
    choice4: "Burkitt lymphoma",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q14. What is not a function of normal p53?",
    choice1: "Apoptosis",
    choice2: "Glucose metabolism",
    choice3: "Cell cycle arrest",
    choice4: "Response to DNA damage",
	choice5: "All of the above",
    answer: 2
  },
  {
    question: "Q15. Which tumour is associated with SYT-SSX translocation?",
    choice1: "Diffuse large B cell lymphoma",
    choice2: "Gastrointestinal stromal tumour",
    choice3: "Synovial sarcoma",
    choice4: "Ewing sarcoma",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q16. Kimmelstiel-Wilson (KW) bodies are seen in which disease?",
    choice1: "Churg-Strauss syndrome",
    choice2: "Diabetic nephropathy",
    choice3: "Scleroderma",
    choice4: "Hashimoto thyroiditis",
	choice5: "All of the above",
    answer: 2
  },
  {
    question: "Q17. Which kidney disease is associated with full house immunofluorescence staining?",
    choice1: "Lupus nephritis",
    choice2: "Goodpasture syndrome",
    choice3: "IgA nephropathy",
    choice4: "Focal segmental glomerulosclerosis",
	choice5: "All of the above",
    answer: 1
  },
  {
    question: "Q18. Which of the following proteins is a proto-oncogene?",
    choice1: "p53",
    choice2: "p16",
    choice3: "Retinoblastoma",
    choice4: "K-ras",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q19. What virus has been implicated in Kaposi sarcoma?",
    choice1: "Coxsackie B",
    choice2: "Human T cell lymphotropic virus (HTLV)",
    choice3: "Human herpesvirus 8 (HHV-8)",
    choice4: "Herpes simplex virus 1 (HSV-1)",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q20. What condition is associated with abnormal genomic imprinting?",
    choice1: "Down syndrome",
    choice2: "Huntington disease",
    choice3: "Prader-Willi syndrome",
    choice4: "Beckwith-Wiedemann syndrome",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q21. What is the most common type of epidermal growth factor (EGFR) mutation that occurs in lung adenocarcinoma?",
    choice1: "Point mutation",
    choice2: "Inversion",
    choice3: "Deletion",
    choice4: "Insertion",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q22. Which EGFR mutation does not confer sensitivity to tyrosine kinase inhibitors?",
    choice1: "Exon 19 deletions",
    choice2: "L858R mutation",
    choice3: "T790M mutation",
    choice4: "Exon 19 insertion",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q23. What is the most common type of mutation that occurs in melanoma?",
    choice1: "Point mutation",
    choice2: "Inversion",
    choice3: "Deletion",
    choice4: "Insertion",
	choice5: "All of the above",
    answer: 1
  },
    {
    question: "Q24. Calreticulin mutations are associated with which disease?",
    choice1: "Chronic eosinophilic leukemia (CEL)",
    choice2: "Primary myelofibrosis (PMF)",
    choice3: "Chronic myelogenous leukemia",
    choice4: "Polycythemia rubra vera (PV)",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q25. What type of mutation is seen in calreticulin in PMF?",
    choice1: "Point mutation",
    choice2: "Inversion",
    choice3: "Deletion",
    choice4: "All of the above",
	choice5: "x",
    answer: 3
  }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 25;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("c01basicend.html");
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

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
	question: "Q1. What is the most common primary malignancy of bone?",
    choice1: "Chondrosarcoma",
    choice2: "Multiple myeloma",
    choice3: "Osteosarcoma",
    choice4: "Metastatic carcinoma",
    answer: 2
  },
  {
    question: "Q2. Which of the following is NOT true regarding aneurysmal bone cyst?",
    choice1: "It can affect any bone",
    choice2: "It is considered a reactive phenomenon",
    choice3: "It can produce blow out appearance on X-ray",
    choice4: "Local recurrence is common",
    answer: 2
  },
  {
    question: "Q3. Causes of osteomalacia include all the following except?",
    choice1: "Hyperphosphatemia",
    choice2: "Vitamin D deficiency",
    choice3: "X-linked hypophosphatemia",
    choice4: "Malabsorption",
    answer: 1
  },
   {
    question: "Q4. The most common type of collagen found in bone is?",
    choice1: "Type X collagen",
    choice2: "Type II collagen",
    choice3: "Type I collagen",
    choice4: "Type V collagen",
    answer: 3
  },
  {
    question: "Q5. All of the following fractures are classic for nonaccidental injury in a child (i.e. child abuse) except?",
    choice1: "A 'bucket handle' fracture of the proximal tibial metaphysis",
    choice2: "Complex skull fractures",
    choice3: "'Greenstick' fractures of the bones in the forearm",
    choice4: "'String of pearls' rib fractures in paravertberal gutters",
    answer: 3
  },
  {
    question: "Q6. What is the prognosis for a patient with a granular cell tumour?",
    choice1: "Excellent",
    choice2: "Intermediate, because local recurrences are common",
    choice3: "Late metastases may occur",
    choice4: "Good, but risk of malignant transformation is about 5%",
    answer: 1
  },
  {
    question: "Q7. Which combination of immunohistochemical stains is expected in chordoma?",
    choice1: "Cytokeratin AE1:3+, EMA+, S100-",
    choice2: "S100+, EMA+, Cytokeratin AE1:3-",
    choice3: "Brachyury+, S100+, vimentin+",
    choice4: "Brachyury-, vimentin+, Cytokeratin AE1:3+",
    answer: 3
  },
  {
    question: "Q8. Which of the following statements does NOT describe chondromyxoid fibroma of the bone?",
    choice1: "It is a locally aggressive tumour",
    choice2: "It occurs most often in diaphysis",
    choice3: "Chromosome 6 abnormalities are frequent",
    choice4: "It is SOX9 positive",
    answer: 2
  },
  {
    question: "Q9. The most common causative organism of osteomyelitis in children older than 1 year is?",
    choice1: "Staphylococcus aureus",
    choice2: "Anaerobic bacteria",
    choice3: "Hemophilus influenza",
    choice4: "Gram-negative organisms",
    answer: 1
  },
   {
    question: "Q10. Risk factors for/associations with rheumatoid arthritis include all the following except?",
    choice1: "Major histocompatibility complex (MHC) Class II antigens (DR)",
    choice2: "Higher incidence in those of Blackfoot and Pima descent",
    choice3: "Female gender",
    choice4: "MHC Class I Antigens",
    answer: 4
  },
  {
    question: "Q11. High grade bone sarcomas metastasize most commonly to which site?",
    choice1: "Lymph nodes",
    choice2: "Liver",
    choice3: "Lung",
    choice4: "They do not commonly metastasize to distant sites (local recurrence only)",
    answer: 3
  },
  {
    question: "Q12. Approximately how much bone mass must be lost before a routine X-ray will show signs of osteopenia",
    choice1: "80%",
    choice2: "10%",
    choice3: "40%",
    choice4: "20%",
    answer: 3
  },
  {
    question: "Q13. Ochronosis (alkaptonuria) may result in all the following findings at post-mortem except?",
    choice1: "Chondromalacia patella",
    choice2: "Black discolouration of the tracheal rings",
    choice3: "Nephrolithiasis",
    choice4: "Vertebral ankylosis",
    answer: 1
  },
  {
    question: "Q14. What is the most common cause of prosthetic joint failure?",
    choice1: "Aseptic loosening",
    choice2: "Infection",
    choice3: "Hypersensitivity (allergy) to materials",
    choice4: "Breakage/failure of implant",
    answer: 1
  },
  {
    question: "Q15. In the 2013 WHO classification of tumours of Bone, which of the following tumours does not belong in the 'miscellaneous' category?",
    choice1: "Adamantinoma",
    choice2: "Undifferentiated high grade pleomorphic sarcoma of bone",
    choice3: "Chondromesenchymal hamartoma",
    choice4: "Ewing sarcoma",
    answer: 3
  },
  {
    question: "Q16. What is the most common site for Langerhans cell histiocytosis (eosinophilic granuloma) of bone?",
    choice1: "Spine",
    choice2: "Skull (calvarium)",
    choice3: "Humerus",
    choice4: "Pelvis",
    answer: 2
  },
  {
    question: "Q17. Which cytogenic abnormality typifies low grade fibromyxoid sarcoma?",
    choice1: "t(12;16)",
    choice2: "t(X;18)",
    choice3: "t(9;22)",
    choice4: "t(7;16)",
    answer: 4
  },
  {
    question: "Q18. Which clinical finding is not associated with nodular fasciitis?",
    choice1: "It occurs commonly in children",
    choice2: "Rapid growth is often seen",
    choice3: "It is found in the subcutaneous tissue",
    choice4: "It may be related to trauma",
    answer: 1
  },
  {
    question: "Q19. The FNCLCC (Federation Nationale des Centres de Lutte Contre le Cancer) grading system for soft tissue sarcoma?",
    choice1: "Includes tumour size as a parameter",
    choice2: "Predicts local recurrence rate",
    choice3: "Predicts likelihood of distant metastasis",
    choice4: "Provides information on tumour extent",
    answer: 3
  },
  {
    question: "Q20. Alveolar soft-part sarcoma demonstrates which of the following ultrastructural features?",
    choice1: "Weibel-Palade bodies",
    choice2: "Rhomboidal crystals",
    choice3: "Birbeck granules",
    choice4: "Paranuclear aggregates of intermediate filaments",
    answer: 2
  },
  {
    question: "Q21. Desmoid tumours (deep or aggressive fibromatosis) are associated with an abnormality in which cellular pathway?",
    choice1: "ERBB2 (formerly Her2/neu)",
    choice2: "Fibroblast growth factor receptor (FGFR)",
    choice3: "c-KIT signalling",
    choice4: "Adenomatosis polyposis (APC)/beta-catenin",
    answer: 4
  },
  {
    question: "Q22. Which of the following combinations of immunohistochemical markers might be positive in a leiomyosarcoma?",
    choice1: "Desmin, actin, pooled cytokeratin",
    choice2: "Desmin, c-KIT, caldesmon",
    choice3: "Caldesmon, actin, S200 protein",
    choice4: "Epithelial membrane antigen (EMA), desmin, actin",
    answer: 1
  },
  {
    question: "Q23. What is the appropriate treatment for an atypical neurofibroma?",
    choice1: "Radiation followed by wide excision",
    choice2: "Curettage",
    choice3: "Chemotherapy, radiotherapy and wide excision",
    choice4: "Local excision with a thin margin",
    answer: 4
  },
    {
    question: "Q24. A pallisading granuloma with central mucin deposition is most characteristic of?",
    choice1: "Necrobiosis lipoidica",
    choice2: "Fungal infection",
    choice3: "Granuloma annulare",
    choice4: "Rheumatoid nodule",
    answer: 3
  },
  {
    question: "Q25. Lyme disease is associated with all of the following except",
    choice1: "Erythema nodosum",
    choice2: "Borrelia burgdorferi",
    choice3: "Transmission via arthropods",
    choice4: "Synovitis",
	choice5: "x",
    answer: 1
  },
  {
    question: "Q26. The Carney complex includes all of the following except?",
    choice1: "Superficial angiomyxomas",
    choice2: "Involvement of the Rb locus on chromosome 17",
    choice3: "Spotty pigment of the skin",
    choice4: "Endocrine overactivity",
    answer: 2
  },
    {
    question: "Q27. The most common site of (extramammary) myofibroblastoma is?",
    choice1: "Paratesticular origin",
    choice2: "Lymph nodes",
    choice3: "Kidney",
    choice4: "Inguinal region",
    answer: 4
  },
  {
    question: "Q28. All of the following are subtypes of rhabdomyoma except:",
    choice1: "Embryonal type",
    choice2: "Adult type",
    choice3: "Genital type",
    choice4: "Fetal type",
    answer: 1
  },
  {
    question: "Q29. Which of the following abnormalities characterizes dermatofibroma protuberans (DFSP)?",
    choice1: "t(11;22)",
    choice2: "t(11;17)",
    choice3: "Supernumerary ring chromosomes",
    choice4: "Trisomy 12",
    answer: 3
  },
    {
    question: "Q30. Which type of rhabdomyosarcoma has the best prognosis?",
    choice1: "Pleomorphic",
    choice2: "Embryonal",
    choice3: "Alveolar",
    choice4: "Myxoid",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 30;

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
    return window.location.assign("c02bstend.html");
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

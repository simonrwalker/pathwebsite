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
	question: "Q1. Which of the following statements regarding Histoplasma capsulatum is true?",
    choice1: "Grocott-Gomori methenamine-silver stain (GMS stain) is positive for yeast organisms 5-10 um in diameter",
    choice2: "Yeasts exhibit broad based budding",
    choice3: "Mucicarmine staining shows large capsules",
    choice4: "The organism is positive with Romanowsky/Giemsa stain",
	choice5: "Associated granulomatous inflammation is typical",
    answer: 4
  },
  {
    question: "Q2. Postmortem lung samples from a patient who died of acute community acquired pneumonia reveal acute necrotizing bronchopneumonia. Gram stains are negative for organisms, but silver staining shows coccobacilli. The most likely etiologic agent is?",
    choice1: "Panton-Valentine toxin positive S. aureus infection",
    choice2: "Streptococcus pneumoniae",
    choice3: "Legionella pneumophila serogroup 1",
    choice4: "Hemophilus influenzae serotype B 2a",
	choice5: "Bartonella henselae",
    answer: 2
  },
  {
    question: "Q3. Poststreptococcal kidney failure usually shows which pattern of injury in a kidney biopsy specimen?",
    choice1: "Acute tubular necrosis",
    choice2: "Diffuse proliferative glomerulonephritis",
    choice3: "Membranoproliferative glomerulonephritis",
    choice4: "Focal segmental glomerulosclerosis",
	choice5: "Gram positive cocci in chains",
    answer: 2
  },
  {
    question: "Q4. Which viral infection below does not cause interstitial nephritis?",
    choice1: "Herpes simplex virus (HSV)",
    choice2: "Cytomegalovirus (CMV)",
    choice3: "Epstein-Barr Virus (EBV)",
    choice4: "BK Virus",
	choice5: "Hantavirus",
    answer: 1
  },
  {
    question: "Q5. Which of the following statements regarding cysticercosis in humans?",
    choice1: "Sheep are the host of the tapeworm stage of the life cycle",
    choice2: "Lesions are most commonly seen in in the liver",
    choice3: "Stool examination is usually positive for tapeworm eggs",
    choice4: "Cysts are typically 10-15 cm in size",
	choice5: "It is uncommon in the Middle East",
    answer: 5
  },
  {
    question: "Q6. Which of the following organisms does not stain positive with a modified acid fast stain?",
    choice1: "Nocardia asteroides",
    choice2: "Mycobacterium marinum",
    choice3: "Actinomyces isrealii",
    choice4: "Legionella micdadei",
	choice5: "Rhodococcus",
    answer: 3
  },
  {
    question: "Q7. Catscratch associated lymphadenitis is caused by?",
    choice1: "Streptococcus pyogenes",
    choice2: "Ricketsia cattii",
    choice3: "Tropheryma whippelii",
    choice4: "Bartonella henselae",
	choice5: "Toxoplasma gondii",
    answer: 4
  },
  {
    question: "Q8. Brain tissue from an HIV patient with a CD4 count of 50 and a ring enhancing lesion would most commonly be positive for?",
    choice1: "Pneumocystic jiroveci",
    choice2: "Primary central nervous system (CNS) lymphoma",
    choice3: "Toxoplasma gondii",
    choice4: "CMV",
	choice5: "HSV",
    answer: 3
  },
  {
    question: "Q9. Dimorphic fungi in histology samples appear as?",
    choice1: "Yeast structures only",
    choice2: "Yeast with occasional pseudohyphae",
    choice3: "Yeast and hyphal elements",
    choice4: "Hyphae with conidia formation",
	choice5: "Periodic acid-Schiff (PAS) positive intracellular inclusions",
    answer: 1
  },
  {
    question: "Q10. Negri bodies are seen in?",
    choice1: "HIV encephalitis",
    choice2: "CMV encephalitis",
    choice3: "HSV encephalitis",
    choice4: "West Nile encephalitis",
	choice5: "Rabies encephalitis",
    answer: 5
  },
  {
    question: "Q11. Which disease has no proven association with human herpesvirus 8 (HHV-8)?",
    choice1: "Acute myelogenous leukemia",
	choice2: "Kaposi sarcoma",
    choice3: "Multicentric Castleman disease",
    choice4: "Primary effusion lymphoma",
	choice5: "All of the above have an association with HHV-8",
    answer: 1
  },
  {
    question: "Q12. Which virus does not cause hemorrhagic fevers?",
    choice1: "Lassa virus",
    choice2: "Ebola virus",
    choice3: "Corona virus",
    choice4: "Marburg virus",
	choice5: "Machupo virus",
    answer: 3
  },
  {
    question: "Q13. Which of the following is a finding in colon biopsy specimens from patients infected by Shigella organisms?",
    choice1: "Extensive eosinophilia of the lamina propria",
    choice2: "Multiple cytoplasmic inclusions in the colonic enterocytes",
    choice3: "Granulomas throughout the mucosa of the colon",
    choice4: "Cryptitis, crypt abscess and pseudomembranes",
	choice5: "Crypt distortion, branchin and hypertrophy",
    answer: 4
  },
  {
    question: "Q14. Which is a finding in pseudomonas infection?",
    choice1: "Laryngotracheobronchitis",
    choice2: "Necrotizing pneumonia",
    choice3: "Chronic renal disease",
    choice4: "Multiple hemorrhagic foci in the mediastinum",
	choice5: "Extensive rash of the body",
    answer: 2
  },
  {
    question: "Q15. Which of the following is NOT a category A disease/agent of bioterrorism, as categorized by the Centers for Disease Control and Prevention (CDC)?",
    choice1: "Bacillus anthracis",
    choice2: "Yersinia pestis",
    choice3: "Clostridium botulinum toxin",
    choice4: "Variola major virus",
	choice5: "Rickettsia prowazekii",
    answer: 5
  },
  {
    question: "Q16. Which is NOT a feature of syphilis infections?",
    choice1: "Chancre on penis/scrotum/vulva/cervix",
    choice2: "Argyll Robertson pupils",
    choice3: "Endarteritis of proximal aorta",
    choice4: "Gummas of the skin, bone and liver",
	choice5: "Closed angle glaucoma",
    answer: 5
  },
  {
    question: "Q17. What is a cause of elephantiasis?",
    choice1: "Bacterial infection of the cardiac valves, causing heart failure",
    choice2: "Viral infection of the veins, breaking down the venous valves",
    choice3: "Lymphoma destroying the lymph nodes of the lower limbs and inguinal region",
    choice4: "Worms in the lymphatic system causing damage to the lymphatic system",
	choice5: "None of the above",
    answer: 4
  },
  {
    question: "Q18. What statement about fungi is correct?",
    choice1: "Fungi are prokaryotes with cell walls that give them their shape",
    choice2: "Fungi can grow as multicellular filaments called yeasts and single cells or chains of cells called molds",
    choice3: "Candida species infections are the most frequent cause of human fungal infections",
    choice4: "Cryptococcus most commonly presents as meningoencephalitis in otherwise healthy individuals",
	choice5: "Aspergillosis is an opportunistic infection caused by 'bread mold fungi'",
    answer: 3
  },
  {
    question: "Q19. Which statement about organisms that live in or on other organisms is correct?",
    choice1: "Mutualistic symbiotic organisms and their hosts have a mutually advantageous arrangement",
    choice2: "Parasitic organisms do the host no good and no harm",
    choice3: "Commensal organisms thrive while harming the host",
    choice4: "Saprophytic organisms live off internal organs of the host",
	choice5: "Vectors are the infectious microorganisms that have been transmitted into a host by an insect",
    answer: 1
  },
  {
    question: "Q20. Which statement about Whipple disease is false?",
    choice1: "It is caused by the gram positive actinomycete Tropheryma whippelii",
    choice2: "Clinical symptoms are caused by accumulation of organism laden macrophages in the bile ducts",
    choice3: "A histologic feature is dense acumulation of distended foamy macrophages in the small intestinal lamina propria",
    choice4: "Small intestinal histologic findings of Whipple disease can be mistaken for intestinal tuberculosis",
	choice5: "The foamy macrophages contain PAS-positive, diastase-resistant granules, but do not stain positively with acid-fast stain",
    answer: 2
  },
  {
    question: "Q21. A 38-year-old male returns from bear hunting and has eaten undercooked bear meat. He presents with myalgia, fever and periorbital edema. Which of the following organisms is most likely responsible for his illness?",
    choice1: "Trichenella spiralis",
    choice2: "Echinococcus granulosus",
    choice3: "Taenia sollium",
    choice4: "Borrelia burgdorferi",
	choice5: "Echinococus multilocularis",
    answer: 1
  },
  {
    question: "Q22. A young woman presents with genital itch and a foul fishy smell from the genital area. Her Pap smear shows Trichomonas vaginalis and epithelial cells covered by numerous coccobacilli. Which organism is associated with vaginal pH elevation?",
    choice1: "Lactobacillus",
    choice2: "Group B Streptococci spp.",
    choice3: "Gardnerella vaginalis",
    choice4: "Peptostreptococcus anaerobius",
	choice5: "Atopobium vaginae",
    answer: 3
  },
  {
    question: "Q23. A young man presents with fever, sore throat and cervical adenopathy. Monospot test was positive. If a cervical lymph node is submitted for biopsy, which type of immune cell would most likely appear atypical on histologic section?",
    choice1: "CD21+ B cell",
    choice2: "Follicular dendritic cell",
    choice3: "T cell",
    choice4: "Langerhans cell",
	choice5: "Mantle zone B cell",
    answer: 3
  },
  {
    question: "Q24. A resident grossing a partially resected liver hemangioma accidentally cuts his finger. The specimen is from a patient with negative HBV and HCV serology. What should the resident do after reporting the incident to his supervisor?",
    choice1: "Obtain the patient's consent to do an HIV screening test",
    choice2: "Watch and wait to see if the resident develops flu-like symptoms",
    choice3: "Test the resident for HIV using enzyme-linked immunosorbent assay (ELISA)",
    choice4: "Prophylactically give the resident antiviral drugs",
	choice5: "Test the resident for HIV with a Western Blot assay",
    answer: 1
  },
  {
    question: "Q25. A patient with rheumatoid arthritis receiving treatment of antitumour necrosis factor (anti-TNF) agents complains of cough and night sweats. Chest X-ray shows a left apical lung nodule. Biopsy of the nodule reveals a granulomatous lesion, which is negative for microorganisms on Ziehl-Neelsen stain. What is the most appropriate next step you should recommend?",
    choice1: "Culture",
    choice2: "Start treatment with isoniazid and rifampin",
    choice3: "Sputum acid-fast smear",
    choice4: "DNA probes",
	choice5: "Gas-liquid chromatography",
    answer: 2
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
  questionIndex = 0;
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("c14infend.html");
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

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
	question: "Q1. The following statements about the pulmonary immune system and immune response are correct except:",
    choice1: "The lung provides a uniquely large surface for interaction",
    choice2: "The lung is an interface between the body and the environment",
    choice3: "The task of the pulmonary immune system is to reduce damage to the gas exchange surface by promoting antigen elimination",
    choice4: "The lymphoid tissue shows increasing levels of complexity toward the alveolus",
	choice5: "Some people have distal intraparenchyaml lymph nodes",
    answer: 4
  },
  {
    question: "Q2. Which statement is incorrect for asthma?",
    choice1: "The immediate response of an asthmatic attack is mediated by IgA",
    choice2: "Both intrinsic and extrinsic types exist",
    choice3: "The mechanism of the disorder is mainly type 1 hypersensitivity reaction",
    choice4: "The precipitating factors include allergens, chemical agents, fungal organisms and drugs",
	choice5: "Asthma is a chronic relapsing inflammatory disorder",
    answer: 1
  },
  {
	question: "Q3. Which statement is true for desmoplastic small round cell tumours?",
	choice1: "They are a variant of small cell carcinoma",
	choice2: "They most often present as solitary nodules or masses arising from the lung parenchyma",
    choice3: "They are indolent neoplasms with a relatively good prognosis for patients",
	choice4: "The tumour cells are positive for cytokeratin (AE1/AE3) and desmin",
	choice5: "The tumour cells are positive for S100 and/or neuroendocrine markers",
    answer: 4
  },
  {
    question: "Q4. Which statement about the pulmonary immune response to soluble and particulate antigens is correct?",
    choice1: "Soluble antigens elicit a significant increase in the number of phagocytic cells",
    choice2: "Particulate antigens cause rapid increase in antigen presenting cell activities, especially by dendritic cells",
    choice3: "Particulate antigens are associated with immune responses characterized by antigen elimination and immune diversion",
    choice4: "Soluble antigens trigger antigen presenting cell activities only at a high volume of soluble antigens",
	choice5: "Soluble antigens are rapidly ingested by alveolar macrophages",
    answer: 3
  },
  {
    question: "Q5. Which statement is true for hypersensitivity pneumonitis?",
    choice1: "It is a type I hypersensitivity reaction",
    choice2: "One of its features is the presence of poorly formed granuloma",
    choice3: "One of its features is the presence of numerous eosinophils",
    choice4: "It is mainly seen in pediatric patients",
	choice5: "It is an acute disease process",
    answer: 2
  },
  {
    question: "Q6. Which statement is true for diffuse idiopathic pulmonary neuroendocrine cell hyperplasia?",
    choice1: "It is regarded as a preinvasive lesion",
    choice2: "It mainly involves the alveolar wall",
    choice3: "It is a congenital disorder",
    choice4: "It is mainly seen in individuals with a history of smoking",
	choice5: "It is positive for S100",
    answer: 1
  },
  {
    question: "Q7. All of the following statements are correct for pulmonary Langerhans cell histiocytosis except:",
    choice1: "Almost all patients have a history of cigarette smoking",
    choice2: "It is considered a malignant disorder",
    choice3: "The lesional cells have nuclear grooves and slightly eosinophilic cytoplasm",
    choice4: "Positive CD1a is characteristic",
	choice5: "Electron microscopy reveals granules with a pentalaminar configuration and bulbous ends",
    answer: 2
  },
  {
    question: "Q8. Which statement is incorrect for respiratory papilloma?",
    choice1: "It is a papillary lesion covered by squamous epithelium",
    choice2: "Dysplasia can occur but only in the squamous epithelium",
    choice3: "It is associated with human papillomavirus",
    choice4: "It often arises from the alveolar wall",
	choice5: "It presents as an endobronchial lesion",
    answer: 4
  },
  {
    question: "Q9. Which statement is correct for pulmonary hamartoma?",
    choice1: "It is difficult to distinguish from mature teratoma",
    choice2: "In most instances, it is composed predominantly of fibrous tissue",
    choice3: "Myxoid components with spindle or stellate cells are often present at the peripheral region of the tumour",
    choice4: "Lobectomy is the treatment of choice for most cases",
	choice5: "It is considered a premalignant lesion",
    answer: 3
  },
  {
    question: "Q10. Which statement is incorrect for lymphangioleiomyomatosis?",
    choice1: "Stain for estrogen receptor (ER) is often positive",
    choice2: "Almost all patients are female",
    choice3: "Characteristic radiologic changes are multiple small nodular lesions in the lung",
    choice4: "The lesional cells are usually HMB-45 positive",
	choice5: "It could be associated with tuberous sclerosis",
    answer: 3
  },
  {
    question: "Q11. Which statement is correct for asthma?",
    choice1: "Asthma occurs in atopic and nonatopic forms",
    choice2: "It is mainly a type II hypersensitivity reaction",
    choice3: "Macrophages are the main antigen presenting cells",
    choice4: "Formation of Charcot-Leyden crystals is mainly related to alveolar macrophages",
	choice5: "The mediators and cytokines causing asthma attacks are mainly released from eosinophils",
    answer: 1
  },
  {
    question: "Q12. Which statement is correct about the immunopathology of asthma?",
    choice1: "The immediate immune response is mediated by IgG",
    choice2: "Atopy is the strongest risk factor for the development of asthma",
    choice3: "Chronic lymphocytic inflammation is part of the disease process and is predominantly Th1 subset cells",
    choice4: "Only type I hypersensitivity reaction is involved in asthma attack",
	choice5: "IL-2 is the key cytokine involved in IgE synthesis",
    answer: 2
  },
  {
    question: "Q13. All of the following statements are correct for minute meningothelioid nodules except?",
    choice1: "They are usually an incidental finding",
    choice2: "They have no clinical significance",
    choice3: "They are usually located around the venues at the peripheral zones of the lung",
    choice4: "They used to be known as chemodectoma",
	choice5: "The lesional cells are usually positive for neuroendocrine markers",
    answer: 5
  },
  {
    question: "Q14. Which statement is correct for the mutation of epidermal growth factor receptors (EGFRs) in lung cancer?",
    choice1: "It is often related to and/or coexists with KRAS mutation",
    choice2: "It is often seen in patients with EML4-ALK gene rearrangement",
    choice3: "Exon 18 deletion is the most common form of EGFR mutation",
    choice4: "It is most often seen in smokers",
	choice5: "Tyrosine kinase inhibitor is effective as treatment",
    answer: 5
  },
  {
    question: "Q15. All of the following statements are correct of Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis) except;",
    choice1: "Asthma is a common clinical presentation",
    choice2: "It presents with necrotizing granulomatous vasculitis",
    choice3: "It presents with peripheral eosinophilia with eosinophils making up >10% of the white blood cell differential count",
    choice4: "It is usually c-ANCA positive (ANCA; antineutrophil cytoplasmic antibody)",
	choice5: "Bronchalveolar lavage shows a high percentage of eosinophils (often >30%)",
    answer: 4
  },
  {
    question: "Q16. Common pulmonary involvement in Behcet syndrome includes all of the following except:",
    choice1: "Atelectasis",
    choice2: "Aneurysm",
    choice3: "Arteriobronchial fistulas",
    choice4: "Pulmonary infarcts",
	choice5: "Lymphocytic and necrotizing vasculitis",
    answer: 1
  },
  {
    question: "Q17. Diffuse panbronchiolitis has all the following features except",
    choice1: "Chronic sinusitis in the majorit of patients",
    choice2: "Marked elevation of serum cold agglutinins",
    choice3: "Interstitial foamy macrophages",
    choice4: "Japanese heritage in the majority of patients",
	choice5: "Usually elevated immunoglobulin levels",
    answer: 5
  },
  {
    question: "Q18. All of the following statements are correct for pulmonary botryomycosis except:",
    choice1: "It is an infection caused by non-filamentous bacteria",
    choice2: "Most cases occur in immunocompromised individuals",
    choice3: "Sulfur granules are present",
    choice4: "It is diagnosed based on the presence of granules that consist of gram positive cocci or gram negative bacteria",
	choice5: "It can take the form of endobronchial infectious, tumour-like lesions and diffuse pneumonia",
    answer: 2
  },
  {
    question: "Q19. All of the following pathologic lesions/disorders are related to silica dust exposure except:",
    choice1: "Pulmonary alveolar proteinosis",
    choice2: "Caplan syndrome",
    choice3: "Lung cancer or mesothelioma",
    choice4: "Mixed dust pneumoconiosis",
	choice5: "Progressive massive fibrosis",
    answer: 3
  },
  {
    question: "Q20. Which statement is incorrect for rounded atelectasis?",
    choice1: "It is caused by localized obstruction of small airway",
    choice2: "It is a pleural based lesion",
    choice3: "It is related to asbestos exposure",
    choice4: "It is accompanied by marked pleural and septal fibrosis",
	choice5: "Most patients are asymptomatic",
    answer: 1
  },
  {
    question: "Q21. Which of the following features does NOT describe invasion in an adenocarcinoma?",
    choice1: "An acinar pattern",
    choice2: "Tumour cells infiltrating myofibroblastic stroma",
    choice3: "Tumour cells spreading through air spaces",
    choice4: "A colloid pattern",
	choice5: "Nuclear pleomorphism and mitosis",
    answer: 5
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 21;

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

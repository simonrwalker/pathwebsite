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
	question: "Q1. The cell type that is not commonly found in the brain is?",
    choice1: "Neuron",
    choice2: "Astrocyte",
    choice3: "Lymphocyte",
    choice4: "Microglia",
	choice5: "Ependymal cell",
    answer: 3
  },
  {
    question: "Q2. The pencil fibers of Wilson are a feature of which structure?",
    choice1: "Substantia nigra",
    choice2: "Inferior olivary nucleus",
    choice3: "Red nucleus",
    choice4: "Putamen",
	choice5: "Hippocampus",
    answer: 4
  },
  {
    question: "Q3. Which of the following immunostains is a useful marker for neurons?",
    choice1: "Glial fibrillary ascid protein (GFAP)",
    choice2: "Vimentin",
    choice3: "Cytokeratin",
    choice4: "APP",
	choice5: "NeuN",
    answer: 5
  },
  {
    question: "Q4. Which of the following is a likely associated finding or presentation of Chiari II malformation?",
    choice1: "Tuberous sclerosis",
    choice2: "Germinal matrix hemorrhage",
    choice3: "Periventricular leukomalacia",
    choice4: "Ventricular enlargement",
	choice5: "Heterotopia",
    answer: 4
  },
  {
    question: "Q5. Which structure features neuromelanin pigmented neurons?",
    choice1: "Dentate nucleus",
    choice2: "Substantia nigra",
    choice3: "Caudate nucleus",
    choice4: "Amygdala",
	choice5: "Lateral geniculate body",
    answer: 2
  },
  {
    question: "Q6. Which of the following is NOT associated with fetal hypoxia or ischemic injury",
    choice1: "Germinal matrix hemorrhage",
    choice2: "Anencephaly",
    choice3: "Periventricular leukomalacia",
    choice4: "Schizencephaly-porencephaly",
	choice5: "Subarachnoid hemorrhage",
    answer: 2
  },
  {
    question: "Q7. A 32-year-old man involved in a motorcycle accident has 'racoon eyes'. Which is the most likely diagnosis?",
    choice1: "Subarachnoid hemorrhage",
    choice2: "Basilar skull fracture",
    choice3: "Diastatic fracture",
    choice4: "Frontal depressed skull fracture",
	choice5: "Tonsillar herniation",
    answer: 2
  },
  {
    question: "Q8. Which vascular malformation is characterized by arterialized veins?",
    choice1: "Arteriovenous malformation (AVM)",
    choice2: "Venous angioma",
    choice3: "Cavernous angioma",
    choice4: "Capillary telangectasia",
	choice5: "None of the above",
    answer: 1
  },
  {
    question: "Q9. Which of the following statements concerning central pontine myelinolysis is NOT correct?",
    choice1: "Rapid correction of hyponatremia is the cause",
    choice2: "It is usually located in the center of the pntine base",
    choice3: "It is associated with expanding mass lesions",
    choice4: "Similar lesions may occur outside the pons",
	choice5: "It has been associated with malnourished chronic alcoholics",
    answer: 3
  },
  {
    question: "Q10. Which of the following would be the best stain to exclude amyloid angiopathy as a differential diagnostic consideration?",
    choice1: "PAS",
    choice2: "Oil red O",
    choice3: "Luxol fast blue",
    choice4: "Collagen IV",
	choice5: "Congo red",
    answer: 5
  },
  {
    question: "Q11. Which characteristic antibody is the marker for Langerhans cell histiocytosis?",
    choice1: "CD1a",
    choice2: "CD1b",
    choice3: "CD3",
    choice4: "CD8",
	choice5: "CD45",
    answer: 1
  },
  {
    question: "Q12. Which of the following individuals are most likely to develop meningitis due to Streptococcus pneumonia?",
    choice1: "A premature infant boy",
    choice2: "A 1-month-old baby girl",
    choice3: "An 18-year-old man",
    choice4: "A 60-year-old man",
	choice5: "None of the above",
    answer: 4
  },
  {
    question: "Q13. Which is the most likely causative organisms in rhombencephalitis?",
    choice1: "Cytomegalovirus",
    choice2: "Rabies",
    choice3: "Herpes simplex virus, type 1 (HSV-1)",
    choice4: "Human immunodeficiency virus (HIV)",
	choice5: "West Nile virus",
    answer: 3
  },
  {
    question: "Q14. A 42-year-old man with a history of renal transplant has developed multiple white matter lesions in both the brain and brain stem. The most likely diagnosis is?",
    choice1: "Acute disseminated encephalomyelitis (ADEM)",
    choice2: "Progressive multifocal leukoencephalopathy (PML)",
    choice3: "Multiple sclerosis",
    choice4: "HIV leukoencephalopathy",
	choice5: "Subacute sclerosing panencephalitis (SSPE)",
    answer: 2
  },
  {
    question: "Q15. A 32-year-old man has multiple white matter lesions, many located periventricular. What is the most likely diagnosis?",
    choice1: "Multiple sclerosis",
    choice2: "Cerebral autosomal dominant arteriopathy with subcortical infarcts and leukoencephalopathy (CADASIL)",
    choice3: "Vasculitis",
    choice4: "Viral encephalitis",
	choice5: "Storage disease",
    answer: 1
  },
  {
    question: "Q16. In a patient with Multiple sclerosis with white matter lesions, LFB staining shows large cells with staining of intracytoplasmic vacuoles in some of the periventricular white matter lesions. Which are the most likely cells?",
    choice1: "Reactive astrocytes",
    choice2: "Macrophages",
    choice3: "Neutrophils",
    choice4: "Lymphocytes",
	choice5: "Eosinophils",
    answer: 2
  },
  {
    question: "Q17. What is the most appropriate diagnosis for a 55-year-old man with rapidly progressive dementia and widespread spongiform cortical degeneration?",
    choice1: "Creutzfeldt-Jakob disease",
    choice2: "Alzheimer disease",
    choice3: "Lewy body disease",
    choice4: "Gerstmann-Straussler-Scheinker disease",
	choice5: "New variant Creutzfeldt-Jakob disease",
    answer: 1
  },
  {
    question: "Q18. The most likely diagnosis of a slowly growing tumour typically arising in the wall of the lateral ventricles in an 8-year-old girl with tuberous sclerosis is?",
    choice1: "Cortical tuber",
    choice2: "Cortical dysplasia",
    choice3: "Subependymal giant cell astrocytoma",
    choice4: "Metastatic germ cell tumour",
	choice5: "Pilocytic astrocytoma",
    answer: 3
  },
  {
    question: "Q19. The most likely location for a craniopharyngioma in a 12-year-old is?",
    choice1: "Frontal lobe",
    choice2: "Fourth ventricle",
    choice3: "Cerebellum",
    choice4: "Suprasellar",
	choice5: "Pons",
    answer: 4
  },
  {
    question: "Q20. Using the WHO schema for an ependymoma, what is the most appropriate grade designation?",
    choice1: "Grade I",
    choice2: "Grade II",
    choice3: "Grade III",
    choice4: "Grade IV",
	choice5: "This tumour does not have a grade",
    answer: 2
  },
  {
    question: "Q21. How do you refer to structures found in pilocytic astrocytoma that contain multiple brightly eosinophilic inclusions?",
    choice1: "Lewy bodies",
    choice2: "Corpora amylacea",
    choice3: "Marinesco bodies",
    choice4: "Granular bodies",
	choice5: "Rosenthal fibers",
    answer: 4
  },
  {
    question: "Q22. Immunoreactivity with which antibody is most characteristic in glioblastoma multiforme (GBM)?",
    choice1: "Glial fibrillary acid protein (GFAP)",
    choice2: "S100 protein",
    choice3: "Vimentin",
    choice4: "Cytokeratin",
	choice5: "Epithelial membrane antigen (EMA)",
    answer: 1
  },
  {
    question: "Q23. The intermediate staining pattern on adenosine triphosphate (ATPase) stained muscle section at pH 4.7 are...?",
    choice1: "Type 1",
    choice2: "Type 2A",
    choice3: "Type 2B",
    choice4: "Type 2C",
	choice5: "Type 3",
    answer: 3
  },
  {
    question: "Q24. The presence in a peripheral nerve of randomly oriented small bundles of axons surrounded by organized layers containing Schwann cells, fibroblasts and perineural cells is most likely to be encountered in the setting of:",
    choice1: "Traumatic neuroma",
    choice2: "Amyloid neuropathy",
    choice3: "Vasculitic neuropathy",
    choice4: "Diabetic neuropathy",
	choice5: "Thiamine deficiency neuropathy",
    answer: 1
  },
  {
    question: "Q25. A 32-year-old woman has a heliotropic rash and proximal muscle weakness. Which is the most likely diagnosis if the muscle showed the presence of perifascicular atrophy on biopsy?",
    choice1: "Dermatomyositis",
    choice2: "Neurogenic atrophy",
    choice3: "Muscular dystrophy",
    choice4: "Inclusion body myositis",
	choice5: "Gaucher disease",
    answer: 1
  },
  {
    question: "Q26. Which of the following metazoan parasites is not associated with nervous system disease?",
    choice1: "Taenia solium",
    choice2: "Taenia saginata",
    choice3: "Schistosoma species",
    choice4: "Trichenella spiralis",
	choice5: "Echinococcus granulosus",
    answer: 2
  },
  {
    question: "Q27. Which of the following structures is most characteristic of embryonal tumour with abundant neuropil and true rosettes (ETANTR) and embryonal tumour with multilayered rosettes?",
    choice1: "Homer-Wright rosettes",
    choice2: "Ependymal rosette",
    choice3: "Ependymoblastoma rosette",
    choice4: "Flexner-Wintersteiner rosette",
	choice5: "Neurocytic rosette",
    answer: 3
  },
  {
    question: "Q28. What feature does NOT distinguish a grade 2 from a grade 3 meningioma?",
    choice1: "Papillary morphology",
    choice2: "Mitotic index >= 20 per 10 HPF",
    choice3: "Rhabdoid morphology",
    choice4: "Frank anaplasia",
	choice5: "Brain invasion",
    answer: 5
  },
  {
    question: "Q29. Which of the following is NOT a typical feature of Parkinson disease?",
    choice1: "Chorea-athetosis",
    choice2: "Stooped posture",
    choice3: "Masked facies or diminished facial expression",
    choice4: "Rigidity",
	choice5: "Tremor ('pill-rolling')",
    answer: 1
  },
  {
    question: "Q30. Which of the following is NOT typical of radiation effects?",
    choice1: "Fibrinoid vascular necrosis",
    choice2: "Nuclear atypia",
    choice3: "Pseudopallisading necrosis",
    choice4: "Geographic necrosis",
	choice5: "Mineralization",
    answer: 3
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
  questionIndex = 0;
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("c16neuroend.html");
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

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
	question: "Q1. What is the cell of origin for adenomatoid tumours?",
    choice1: "Renal tubular epithelial cell",
    choice2: "Interstitial cells of Cajal",
    choice3: "Mesothelial cell",
    choice4: "Hilar cell",
	choice5: "Undifferentiated mesenchymal cell",
    answer: 3
  },
  {
    question: "Q2. Renal papillary necrosis is seen in the following situations except?",
    choice1: "Diabetes mellitus",
    choice2: "Urinary tract obstruction",
    choice3: "Acute pyelonephritis",
    choice4: "Wegener granulomatosis",
	choice5: "Analgesic abuse",
    answer: 4
  },
  {
    question: "Q3. A prostate needle biopsy speciemn contains a conventional prostatic adenocarcinoma with the following Gleason patterns: pattern 4 about 65%, pattern 3 about 30% and pattern 5 about 5%. What is the Gleason score?",
    choice1: "8",
    choice2: "7",
    choice3: "7 with tertiary pattern 5",
    choice4: "9",
	choice5: "12",
    answer: 4
  },
  {
    question: "Q4. In prostate, the basal layer of the epithelium stains for?",
    choice1: "Prostate specific antigen (PSA)",
    choice2: "p63",
    choice3: "Actin",
    choice4: "p53",
	choice5: "Prostatic acid phosphatase (PAP)",
    answer: 2
  },
  {
    question: "Q5. What is the most common malignancy of the spermatic cord of adults?",
    choice1: "Liposarcoma",
    choice2: "Leiomyosarcoma",
    choice3: "Embryonal rhabdomyosarcoma",
    choice4: "Undifferentiated sarcoma",
	choice5: "Angiosarcoma",
    answer: 1
  },
  {
    question: "Q6. What condition is associated with granular IgA, IgG, IgM and C3 within glomeruli?",
    choice1: "Alport disease",
    choice2: "Lupus nephritis",
    choice3: "Antineutrophilic cytoplasmic antibody (ANCA) associated vasculitis",
    choice4: "Postinfectious glomerulonephritis",
	choice5: "Membranous nephropathy",
    answer: 2
  },
  {
    question: "Q7. Which is not a common histologic finding seen in cyclosporine and FK506 nephrotoxicity?",
    choice1: "Tubular isometric vacuolization",
    choice2: "Hyaline arteriopathy",
    choice3: "Acute thrombotic microangiopathy",
    choice4: "Crescentic glomerulonephritis",
	choice5: "Normal histology",
    answer: 4
  },
  {
    question: "Q8. In myeloma cast nephropathy, what causes renal damage?",
    choice1: "Hypercalcemia",
    choice2: "Tissue infiltration by neoplastic cells",
    choice3: "Immunoglobulin light chains",
    choice4: "Infection",
	choice5: "Secondary to chemotherapeutic agents",
    answer: 3
  },
  {
    question: "Q9. In invasive urothelial carcinoma of the bladder, pT2 disease corresponds to?",
    choice1: "Invasion of the lamina propria",
    choice2: "Invasion of the muscularis mucosae",
    choice3: "Invasion of the submucosa",
    choice4: "Invasion of the muscularis propria",
	choice5: "Invasion of the prostate",
    answer: 4
  },
  {
    question: "Q10. Which is considered a premalignant lesion in the prostate?",
    choice1: "High grade prostatic intraepithelial neoplasia",
    choice2: "Prostatic hyperplasia",
    choice3: "High grade preinvasive neoplasm",
    choice4: "Nephrogenic metaplasia",
	choice5: "Columnar cell change",
    answer: 1
  },
  {
    question: "Q11. Which is not a typical morphological feature of balanitis xerotica obliterans?",
    choice1: "Orthokeratotic hyperkeratosis",
    choice2: "Atrophy of the epidermis",
    choice3: "Homogenization of collagen of the upper dermis",
    choice4: "Interstitial hemmorhage and hemosiderin deposition",
	choice5: "Lymphoplasmacytic lichenoid inflammatory infiltrate",
    answer: 4
  },
  {
    question: "Q12. Which stain is typically negative in classic seminoma?",
    choice1: "Cytokeratin (AE1/AE3)",
    choice2: "Placental alkaline phosphatase (PLAP)",
    choice3: "OCT 4",
    choice4: "C-kit",
	choice5: "Periodic acid Schiff (PAS)",
    answer: 1
  },
  {
    question: "Q13. What is the common genetic alteration seen in testicular germ cell tumours in adulthood?",
    choice1: "t(11;22)",
    choice2: "Loss of 3p",
    choice3: "Isochromosome 12p",
    choice4: "t(X;11)",
	choice5: "Gain of 13q",
    answer: 3
  },
  {
    question: "Q14. What condition is not associated with renal cell carcinoma?",
    choice1: "Birt-Hogg-Dube syndrome",
    choice2: "Autosomal dominant polycystic kidney disease",
    choice3: "Tuberous sclerosis",
    choice4: "Von Hippel-Lindau disease",
	choice5: "End stage renal disease",
    answer: 2
  },
  {
    question: "Q15. What is the T stage of a renal cell carcinoma that shows direct growth into the ipsilateral adrenal gland?",
    choice1: "pT2c",
    choice2: "pT3a",
    choice3: "pT3b",
    choice4: "pT3c",
	choice5: "pT4",
    answer: 5
  },
  {
    question: "Q16. What is the characteristic morphologic finding in malakoplakia?",
    choice1: "Cytoplasmic lipid",
    choice2: "Weibel-Palade bodies",
    choice3: "Michaelis-Guttman bodies",
    choice4: "Asteroid bodies",
	choice5: "Giant mitochondria",
    answer: 3
  },
  {
    question: "Q17. Patients with which variant of uturothelial carcinoma below have the best prognosis?",
    choice1: "Sarcomatoid urothelial carcinoma",
    choice2: "Urothelial carcinoma with syncytiotrophoblasts",
    choice3: "Micropapillary urothelial carcinoma",
    choice4: "Nested urothelial carcinoma",
	choice5: "Mixed urothelial and small cell carcinoma",
    answer: 2
  },
  {
    question: "Q18. What is the pT stage of a prostatic adenocarcinoma that invades the base of the seminal vesicle?",
    choice1: "pT2c",
    choice2: "pT3a",
    choice3: "pT3b",
    choice4: "pT3c",
	choice5: "pT4",
    answer: 3
  },
  {
    question: "Q19. Which of the following pattern is not a description of Gleason pattern 4?",
    choice1: "Cribriform glands with central necrosis",
    choice2: "Chains of glands floating in lakes of mucin",
    choice3: "Glandular structures showing glomerulations",
    choice4: "Chains of fused glandular structures",
	choice5: "Poorly formed small glandular structures",
    answer: 1
  },
  {
    question: "Q20. Which is not a mimic of invasive protatic adenocarcinoma?",
    choice1: "Glandular atrophy",
    choice2: "Atypical adenomatous hyperplasia",
    choice3: "Cowper glands",
    choice4: "Granulomaotus prostatitis",
	choice5: "Corpora amylacea",
    answer: 5
  },
  {
    question: "Q21. Which entity is not associated with intratubular germ cell neoplasia?",
    choice1: "Cryptochidism",
    choice2: "Postpubertal mature teratoma",
    choice3: "Embryonal carcinoma",
    choice4: "Spermatocytic seminoma",
	choice5: "Mixed germ cell tumour",
    answer: 4
  },
  {
    question: "Q22. On smear preparations recieved with male fertility biopsy specimens, which 2 patterns would you expect to show spermatozoa?",
    choice1: "Germ cell maturation arrest and hypospermatogenesis",
    choice2: "Sertoli cell only and germ cell maturation arrest",
    choice3: "Hypospermatogenesis and obstruction of sperm excretory ducts",
    choice4: "Testicular atrophy and Sertoli cell only",
	choice5: "Obstruction of sperm excretory ducts and Sertoli cell only with immature Sertoli cells",
    answer: 3
  },
  {
    question: "Q23. Which is not a pattern seen in urothelial carcinoma in situ?",
    choice1: "Clinging/denuding pattern",
    choice2: "Small cell pattern",
    choice3: "Pagetoid pattern",
    choice4: "Undermining pattern",
	choice5: "Microcystic pattern",
    answer: 5
  },
  {
    question: "Q24. Which is the most common genetic alteration in clear cell renal cell carcinoma?",
    choice1: "Loss of 3p",
    choice2: "Isochromosome 12p",
    choice3: "t(X;11)",
    choice4: "Gain of 13q",
	choice5: "t(11;22)",
    answer: 1
  },
  {
    question: "Q25. Which of the following entities does not typically present with nephrotic syndrome?",
    choice1: "Minimal change disease",
    choice2: "Focal segmental glomerulosclerosis",
    choice3: "Membranous glomerulopathy",
    choice4: "Thin basement membrane disease",
	choice5: "Membranoproliferative glomerulonephritis",
    answer: 4
  },
  {
    question: "Q26. Which of the following is associated with fibrin and platelet thrombi within glomeruli?",
    choice1: "Alport syndrome",
    choice2: "Hemolytic uremic syndrome",
    choice3: "Immunotactoid glomerulopathy",
    choice4: "Acute interstitial nephritis",
	choice5: "Acute tubular necrosis",
    answer: 2
  },
  {
    question: "Q27. Which of the following is true regarding immunostaining patterns in testicular neoplasms?",
    choice1: "CD117 stains embryonal carcinoma",
    choice2: "OCT3/4 is positive in teratoma",
    choice3: "Glypican 3 highlights yolk sac tumour",
    choice4: "EMA stains all types of germ cell tumours",
	choice5: "Classic seminoma is positive for CD20",
    answer: 3
  },
  {
    question: "Q28. In addition to clear cell renal cell carcinoma, Von Hippel-Lindau (VHL) syndrome is also associated with which of the following?",
    choice1: "Renal cysts",
    choice2: "Adrenal pheochromocytoma",
    choice3: "Clear cell pancreatic neuroendocrine neoplasm (PEN)",
    choice4: "Papillary cystadenoma of epidydimis or broad ligament",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q29. Which of the following is involved in von Hippel-Lindau syndrome?",
    choice1: "Hamartin",
    choice2: "Hypoxia inducible factor",
    choice3: "Folliculin",
    choice4: "Merlin",
	choice5: "Tuberin",
    answer: 2
  },
  {
    question: "Q30. Inverted urothelial carcinoma of the renal pelvis is associated with which of the following?",
    choice1: "Lynch syndrome",
    choice2: "Tuberous sclerosis",
    choice3: "Birt-Hogg-Dube",
    choice4: "End-stage renal disease",
	choice5: "None of the above",
    answer: 1
  },
  {
    question: "Q31. Sickle cell trait is associated with which of the following?",
    choice1: "Wilms tumour",
    choice2: "Oncocytoma",
    choice3: "Clear cell tubulopapillary renal cell carcinoma",
    choice4: "Renal medullary carcinoma",
	choice5: "None of the above",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 31;

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
    return window.location.assign("c10guend.html");
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

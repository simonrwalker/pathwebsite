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
	question: "Q1. Based on the current literature, the following types of invasive breast cancer, when matched for stage, deliver a better prognosis, except?",
    choice1: "Mucinous carcinoma",
    choice2: "Tubular carcinoma",
    choice3: "Solid papillary carcinoma",
    choice4: "Micropapillary carcinoma",
	choice5: "Encapsulated (intracystic) papillary carcinoma",
    answer: 4
  },
  {
    question: "Q2. The following breast lesions have a similar relative risk of developing invasive cancer except?",
    choice1: "Papilloma",
    choice2: "Radial scar",
    choice3: "Florid hyperplasia",
    choice4: "Sclerosing adenosis",
	choice5: "Apocrine metaplasia",
    answer: 5
  },
  {
    question: "Q3. Pseudoangiomatous stromal hyperplasia (PASH) is a breast lesion produced by which cell type?",
    choice1: "Myoepithelial cells",
    choice2: "Smooth muscle cells",
    choice3: "Fibroblasts",
    choice4: "Myofibroblasts",
	choice5: "Lymphatic endothelial cells",
    answer: 4
  },
   {
    question: "Q4. The cells lining the slit-like spaces in breast PASH are positive for the following stains except?",
    choice1: "CD31",
    choice2: "Vimentin",
    choice3: "Actin",
    choice4: "Estrogen receptor",
	choice5: "CD34",
    answer: 1
  },
  {
    question: "Q5. The following morphologic features of breast cancer have strong independent prognostic value except?",
    choice1: "Grade",
    choice2: "Lymph node status",
    choice3: "Lymphovascular invasion",
    choice4: "Tumour size",
	choice5: "Tumour necrosis",
    answer: 5
  },
  {
    question: "Q6. Based on molecular phenotypes, breast cancer can be classified as the following types except?",
    choice1: "Luminal A",
    choice2: "Luminal B",
    choice3: "ERBB2 (formerly HER2/neu)",
    choice4: "Basal-like",
	choice5: "Medullary",
    answer: 5
  },
  {
    question: "Q7. After surgical excision, adjuvant treatment decisions for breast cancer are heavily based on the following pathologic indices except?",
    choice1: "Tumour size",
    choice2: "MBR grade",
    choice3: "Tumour type",
    choice4: "ERBB2 (formerly HER2/neu) status",
	choice5: "Lymphovascular invasion",
    answer: 3
  },
  {
    question: "Q8. According to the current staging system, which of the following cases qualifies for pN1?",
    choice1: "1 node positive for macrometastases (macromets), 2 nodes positive for micrometastases, 1 node positive for ITC",
    choice2: "2 nodes positive for micromets, 1 node positive for ITCs",
    choice3: "2 nodes positive for macromets, 1 nodes positive for micromets, 1 node positive for ITC",
    choice4: "1 internal mammary sentinel lymph node with a micromet and negative axillary lymph nodes",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q9. The following immunohistochemical markers can be used to highlight myoepithelial cells in breast tissue except?",
    choice1: "Smooth muscle myosin (SMMS)",
    choice2: "Calponin",
    choice3: "Cox2",
    choice4: "p63",
	choice5: "Actin",
    answer: 3
  },
   {
    question: "Q10. The most helpful immunohistochemical stain to distinguish between florid ductal hyperplasia of the usual type and atypical ductal hyperplasia (ADH) is?",
    choice1: "Calponin",
    choice2: "p63",
    choice3: "Gross cystic disease fluid protein (GCDFP)",
    choice4: "CK5/6",
	choice5: "ERBB2 (formerly Her2/neu)",
    answer: 4
  },
  {
    question: "Q11. Current literature recommends excisional biopsy for the following lesions diagnosed on core needle biopsy except?",
    choice1: "Intraductal papilloma",
    choice2: "Mucocele-like lesion",
    choice3: "Florid ductal hyperplasia",
    choice4: "Lobular carcinoma in situ",
	choice5: "Flat epithelial atypia with atypical duct hyperplasia",
    answer: 3
  },
  {
    question: "Q12. The following histologic features may help to distinguish benign from malignant phyllodes tumours except?",
    choice1: "Leaflike structures",
    choice2: "Heterologous elements",
    choice3: "Mitoses",
    choice4: "Margins",
	choice5: "Cellularity",
    answer: 1
  },
  {
    question: "Q13. The following statements are true regarding breast fibromatosis except?",
    choice1: "Proliferation of myofibroblastic cells",
    choice2: "Positive for beta-catenin",
    choice3: "Association with trauma",
    choice4: "Association with Gardner syndrome",
	choice5: "Consistently responds to hormonal therapy",
    answer: 5
  },
  {
    question: "Q14. Granular cell tumour of the breast can be positive for the following stains except?",
    choice1: "Neuron specific enolase (NSE)",
    choice2: "Vimentin",
    choice3: "S100",
    choice4: "Carcinoembryonic antigen (CEA)",
	choice5: "ER",
    answer: 5
  },
  {
    question: "Q15. The neoplastic cells in Paget disease are often positive for the following stains except?",
    choice1: "Epithelial membrane antigen (EMA)",
    choice2: "CEA",
    choice3: "HMB45",
    choice4: "CK7",
	choice5: "CAM5.2",
    answer: 3
  },
  {
    question: "Q16. Current literature suggests that flat epithelial atypia (FEA) is independently associated with an increased incidence of which of the following lesions?",
    choice1: "Atypical ductal hyperplasia (ADH)",
    choice2: "Tubular carcinoma",
    choice3: "Tubular carcinoma",
    choice4: "Metaplastic carcinoma",
	choice5: "Atypical lobular hyperplasia (ALH)",
    answer: 1
  },
  {
    question: "Q17. Compared to high grade ductal carcinoma in situ (high grade DCIS), low grade DCIS is more often positive for the following tests except?",
    choice1: "ER",
    choice2: "Progesterone receptor (PR)",
    choice3: "ERBB2 (formerly Her2/neu)",
    choice4: "Cyclin D1",
	choice5: "Near diploidy",
    answer: 3
  },
  {
    question: "Q18. Which of the following clinical presentations has the highest association with breast carcinoma?",
    choice1: "Mammographic calcification",
    choice2: "Palpable mass",
    choice3: "Lumpiness or asymmetry",
    choice4: "Pain",
	choice5: "Nipple discharge",
    answer: 2
  },
  {
    question: "Q19. The following breast lesions have no increased relative risk of developing into breast carcinoma?",
    choice1: "Apocrine cysts",
    choice2: "Duct ectasia",
    choice3: "Mild hyperplasia",
    choice4: "Adenosis",
	choice5: "Sclerosing adenosis",
    answer: 5
  },
  {
    question: "Q20. Risk factors for the development of breast cancer include all of the following except?",
    choice1: "Breast density",
    choice2: "Ethnicity",
    choice3: "Breast implants",
    choice4: "Hormone replacement therapy",
	choice5: "Alcohol consumption",
    answer: 3
  },
  {
    question: "Q21. Which of the following syndrome corresponds to postmastectomy angiosarcomas?",
    choice1: "Rosen-Finch",
    choice2: "Von Hippel-Lindau",
    choice3: "Stewart-Treves",
    choice4: "Li-Fraumeni",
	choice5: "McCune-Albright",
    answer: 3
  },
  {
    question: "Q22. Which of the following biomarker profiles is common in BRCA1 associated breast cancers?",
    choice1: "ER-, PR-, ERBB2-, CK5/6+",
    choice2: "ER-, PR-, ERBB2+, CK5/6-",
    choice3: "ER+, PR+, ERBB2-, CK5/6-",
    choice4: "ER+, PR+, ERBB2+, CK5/6+",
	choice5: "ER+, PR+, ERBB2-, CK5/6+",
    answer: 1
  },
  {
    question: "Q23. Which of the following is not a histologic features of diabetic mastopathy?",
    choice1: "Keloidal like stromal fibrosis",
    choice2: "Epithelial hyperplasia without atypia",
    choice3: "Lymphocytic ductitis",
    choice4: "Lymphocytic lobulitis",
	choice5: "Lymphocytic vasculitis",
    answer: 2
  },
  {
    question: "Q24. Which of the following favours a diagnosis of ADH over DCIS?",
    choice1: "Associated lymphocytic response",
    choice2: "Overlapping nuclei",
    choice3: "Punched out round spaces within the duct lumen",
    choice4: "'Roman arch' orientation fo cells around spaces",
	choice5: "High grade cytologic atypia",
    answer: 2
  },
  {
    question: "Q25. Which of the following should spark the most concern in interpreting ER/PR immunohistochemistry?",
    choice1: "No immunohistochemical staining noted on the negative control slides",
    choice2: "Nuclear staining of cervix stromal cells noted on the external control slides",
    choice3: "No staining noted in some of the normal internal control duct epithelial cells",
    choice4: "No staining noted in an invasive lobular carcinoma",
	choice5: "Heterogenous staining noted in the tumour",
    answer: 4
  },
  {
    question: "Q26. Extensive intraductal carcinoma positive (EIC+) is defined as?",
    choice1: "DCIS present involving at least 25% of the area of the invasive carcinoma and extending outside the invasive carcinoma mass",
    choice2: "DCIS present involving at least 25% of the specimen",
    choice3: "DCIS present involving at least 25% of the core samples",
    choice4: "DCIS present involving at least one quadrant of the breast",
	choice5: "DCIS present involving at least one segment of the ductal system",
    answer: 1
  },
  {
    question: "Q27. What is the name of the cytologically bland clear cells found in the epidermis of the nipple whtat are CK7+, CD138 negative and ERBB2+?",
    choice1: "Tavassoli cells",
    choice2: "The organ of Chiveitz",
    choice3: "The organ of Zuckerkandl",
    choice4: "The organ of Corti",
	choice5: "Toker cells",
    answer: 5
  },
  {
    question: "Q28. Which of the following, if present, would indicate a better prognosis for patients with breast invasive ductal carcinoma not otherwise specified (NOS)?",
    choice1: "Invasive tumour necrosis",
    choice2: "Perineural invasion",
    choice3: "High Ki67 index",
    choice4: "high Oncotype DX score (50)",
	choice5: "High percentage of tubule formation (>75%)",
    answer: 5
  },
  {
    question: "Q29. Which of the following is true regarding sentinel lymph nodes and breast cancer?",
    choice1: "A single cluster of tumour cells <0.2 mm in size would be classified as isolated tumour cells",
    choice2: "There is no difference in prognosis between patients that have sentinel node micrometastases versus those that have micrometastases",
    choice3: "Frozen section analysis has a sensitivity of 90-100% for detecting micrometastases",
    choice4: "The likelihood of non-sentinel nodes containing macrometastases if the sentinel node is negative is between 10 and 15%",
	choice5: "Immunohistochemitry should be performed routinely on all breast sentinel lymph node biopsies",
    answer: 1
  },
  {
    question: "Q30. Clinical response to herceptin has been shown in trials with cutoff ERBB2/CEP17 ratios as low as?",
    choice1: "1.0",
    choice2: "1.8",
    choice3: "2.0",
    choice4: "2.2",
	choice5: "3.0",
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
    return window.location.assign("c03breastend.html");
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

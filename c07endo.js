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
	question: "Q1. Multinodular goiter (MNG) is characterized by all of the following except?",
    choice1: "It is most often caused by dietary iodine deficiency",
    choice2: "The nodules are both polyclonal and monoclonal",
    choice3: "Plummer syndrome includes MNG and infiltrative opthalmopathy",
    choice4: "Serum T3 and T4 are usually normal",
	choice5: "Histologically, it shows cystic inactive follicles and areas of follicular hyperplasia",
    answer: 3
  },
  {
    question: "Q2. Which is true about subacute thyroiditis (image not included)?",
    choice1: "Thyroid radioactive iodine uptake is increased",
    choice2: "Total thyroidectomy is the treatment of choice",
    choice3: "It is an autoimmune disease",
    choice4: "It has a strong genetic component",
	choice5: "It is a painful condition",
    answer: 5
  },
  {
    question: "Q3. A 60-year-old man with a history of smoking (35 years) is found to have a lung mass on chest X-ray and bilateral adrenal nodules on CT scan. His lab results show hyponatremia. What is the most likely diagnosis?",
    choice1: "Cushing syndrome",
    choice2: "Adrenal cortical carcinoma",
    choice3: "Inappropriate antidiuretic hormone (IADH) secretion",
    choice4: "Conn syndrome",
	choice5: "Pheochromocytoma",
    answer: 3
  },
   {
    question: "Q4. Autoimmune polyendocrinopathy (AP) syndrome type 1 includes all of the following except?",
    choice1: "Hashimoto thyroiditis",
    choice2: "Adrenal cortical insufficiency",
    choice3: "Hypoparathyroidism",
    choice4: "Chronic mucocutaneous candidiasis",
	choice5: "Mutation of AIRE gene",
    answer: 1
  },
  {
    question: "Q5. Which of the following statements is not true about lymphocytic thyroiditis (image not shown)?",
    choice1: "It has a strong genetic component",
    choice2: "It is associated with circulating antithyroglobulin (anti-TGB) and antithyroid peroxidase antibodies",
    choice3: "It is associated with painless enlargement of the thyroid",
    choice4: "Its fibrosing variant typically involves the extrathyroidal structures",
	choice5: "It is associated with an increasing risk of MALT lymphoma",
    answer: 4
  },
  {
    question: "Q6. What is the best description for the thyroid disease shown in the image (image: thyroid tissue with lymphoid follicle)?",
    choice1: "It is a nodular enlargement of the gland",
    choice2: "It may disseminate via lymphatics",
    choice3: "It is an autoimmune disease",
    choice4: "It is associated with an elevated TSH",
	choice5: "It is usually 'cold' on a radioiodine scan",
    answer: 3
  },
  {
    question: "Q7. The following is true about solitary thyroid nodules?",
    choice1: "They affect 1-10% of the adult population",
    choice2: "They are more likely to be neoplastic than multiple nodules",
    choice3: "They are less likely to be neoplastic in younger patients",
    choice4: "Functioning nodules are more likely to be benign",
	choice5: "A history of radiation exposure is associated with increased risk of malignancy",
    answer: 3
  },
  {
    question: "Q8. Which of the following statements about papillary thyroid carcinoma (PTC) is incorrect?",
    choice1: "It represents >85% of thyroid cancers in North America",
    choice2: "Activation of the mitogen-activated protein (MAP) kinase pathway is a feature of most PTCs",
    choice3: "RET/PTC gene rearrangement is present in 20-40% of PTCs",
    choice4: "Most tumours have p53 gene mutations",
	choice5: "Tumours with BRAF mutations are associated with worse prognosis",
    answer: 4
  },
  {
    question: "Q9. Which statement is true about follicular carcinoma?",
    choice1: "It has no relationship to dietary iodine content",
    choice2: "It can be distinguished from follicular adenomas by molecular testing for RAS gene mutations",
    choice3: "Lymphatic spread is the main route of metastatic spread",
    choice4: "Capsular and/or vascular invasion are the diagnostic features of minimally invasive carcinomas",
	choice5: "The neoplastic nuclei have nuclear membrane grooves and fine powdery chromatin",
    answer: 4
  },
   {
    question: "Q10. Which statement is not true about anaplastic thyroid carcinoma (undifferentiated carcinoma)?",
    choice1: "It may arise from well-differentiated carcinoma",
    choice2: "It may harbour activating mutations of beta-catenin",
    choice3: "Inactivation of p53 occurs in anaplastic carcinoma",
    choice4: "Histologically, it may resemble sarcoma",
	choice5: "The 5-year survival rate is approximately 40%",
    answer: 5
  },
  {
    question: "Q11. All of the following statements about medullary thyroid carcinoma are correct except?",
    choice1: "RET proto-oncogene mutations occur in familial and sporadic tumours",
    choice2: "Approximately 70% of cases are sporadic",
    choice3: "Patients with MEN2A associated tumours have a worse prognosis than those with MEN2B associated tumours",
    choice4: "The neoplastic cells show neuroendocrine cytological features and positive immunohistochemical staining for chromogrannin",
	choice5: "Some tumours are associated with abundant amyloid deposition",
    answer: 3
  },
  {
    question: "Q12. The following statements are true about primary hyperparathyroidism except?",
    choice1: "Parathyroid hyperplasia is the most common etiology",
    choice2: "It affects women more than men",
    choice3: "It can be due to decreased sensitivity to calcium",
    choice4: "MEN1 gene mutatons may occur in familial and in sporadic parathyroid adenomas",
	choice5: "It can be associated with osteitis fibrosa cystica",
    answer: 1
  },
  {
    question: "Q13. Which statement is not true about parathyroid carcinoma?",
    choice1: "It can be associated with hyperparathyroidism jaw tumour syndrome",
    choice2: "A palpable neck mass may be present",
    choice3: "The tumour is difficult to separate from the surrounding structures during surgery",
    choice4: "En bloc resection with the ipsilateral thyroid lobe is the recommended treatment",
	choice5: "Positive immunohistochemical staining for parafibromin confirms the diagnosis",
    answer: 5
  },
  {
    question: "Q14. Which statement is true about pancreatic neuroendocrine tumours (pancreatic NETs)?",
    choice1: "They may be associated with MEN1 syndrome",
    choice2: "They may develop in patients with von Hippel Lindau syndrome",
    choice3: "Insulinoma is the most common functioning pancreatic NET",
    choice4: "Mitotic count and Ki67 labelling index are important prognostic parameters",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q15. The most common cause of the endogenous Cushing syndrome is...?",
    choice1: "Adrenal cortical adenoma",
    choice2: "Adrenal cortical carcinoma",
    choice3: "Macronodular hyperplasia",
    choice4: "Pituitary adenoma",
	choice5: "Ectopic corticotophin syndrome",
    answer: 4
  },
  {
    question: "Q16. Conn syndrome is due to...?",
    choice1: "Nodular cortical hyperplasia",
    choice2: "Adrenal cortical adenoma",
    choice3: "Pituitary adenoma",
    choice4: "Adrenal cortical carcinoma",
	choice5: "Activation of the renin-angiotensin syndrome",
    answer: 2
  },
  {
    question: "Q17. MEN1 syndrome may be associated with all of the following except?",
    choice1: "Prolactinoma",
    choice2: "Pancreatic neuroendocrine tumours",
    choice3: "Hypercalcemia",
    choice4: "Adrenal cortical hyperplasia",
	choice5: "RET protooncogene mutation",
    answer: 5
  },
  {
    question: "Q18. The lesion seen in this image of an adrenal gland (image = spironolactone bodies) is likely associated with which of the following?",
    choice1: "Cushing syndrome",
    choice2: "Compensatory hypertrophy of the contralateral gland",
    choice3: "Increased adrenocorticotropic hormone (ACTH) production",
    choice4: "A lung mass",
	choice5: "Hypertension",
    answer: 5
  },
  {
    question: "Q19. To distinguish adrenal cortical adenoma from carcinoma, the least important parameter is?",
    choice1: "Tumour size",
    choice2: "Mitotic count",
    choice3: "Venous invasion",
    choice4: "Necrosis",
	choice5: "Nuclear pleomorphism",
    answer: 5
  },
  {
    question: "Q20. MEN2A syndrome includes all of the following except?",
    choice1: "Parathyroid hyperplasia",
    choice2: "Pancreatic neuroendocrine neoplasia",
    choice3: "Medullary thyroid carcinoma",
    choice4: "Pheochromocytoma",
	choice5: "RET protooncogene mutation",
    answer: 2
  },
  {
    question: "Q21. MEN2B syndrome may include all of the following except?",
    choice1: "Hyperparathyroidism",
    choice2: "Medullary thyroid carcinoma",
    choice3: "Oral mucosal neuroma",
    choice4: "Marfanoid habitus",
	choice5: "Pheochromocytoma",
    answer: 1
  },
  {
    question: "Q22. The condition seen in thyroid glands with high amounts of cells staining with calcitonin may be associated with?",
    choice1: "MEN2 syndrome",
    choice2: "Hyperparathyroidism",
    choice3: "Hashimoto thyroiditis",
    choice4: "Hypergastrinemia",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q23. The most common driver mutation found in Noninvasive follicular thyroid neoplasm with papillary-like nuclear features (NIFT-P) involves which of the following genes?",
    choice1: "BRAF",
    choice2: "P53",
    choice3: "RAS",
    choice4: "PTEN",
	choice5: "None of the above",
    answer: 3
  },
  {
    question: "Q24. Which of the following immunohistochemical stains is of prognostic significance in adrenal cortical carcinoma?",
    choice1: "Ki67",
    choice2: "Phosphohistone H3",
    choice3: "P53",
    choice4: "Steroidogenic factor 1",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q25. NIFT-P is characterized by all of the following except?",
    choice1: "The tumour is encapsulated and has a follicular growth",
    choice2: "The tumour cells have enlarged crowded nuclei with nulcear membrane grooves",
    choice3: "A low mitotic count is present: < 3 mitoses/10 high power field (HPF)",
    choice4: "Occasional psammoma bodies can be present",
	choice5: "No necrosis is present",
    answer: 4
  },
  {
    question: "Q26. Which of the following features is or are used for the diagnosis of adrenal cortical carcinoma?",
    choice1: "High nuclear grade (Fuhrman criteria)",
    choice2: "Clear cell component < 25% of tumour cells",
    choice3: "> 5 mitoses/50 HPF",
    choice4: "Diffuse architecture > 33% of tumour",
	choice5: "All of the above",
    answer: 3
  },
  {
    question: "Q27. Which of the following is true about gastric neuroendocrine tumours?",
    choice1: "Type I enterochromaffin-like (ECL) cell tumours are the most common type",
    choice2: "Type III tumours are usually multiple",
    choice3: "ECL cell tumours are typically identified by immunohistochemical staining for histamine",
    choice4: "Type II tumours occur in a background of atrophic gastritis",
	choice5: "Type III tumours are more common in women",
    answer: 1
  },
  {
    question: "Q28. Riedel thyroiditis is characterized by which of the following?",
    choice1: "It can be associated with other IgG4-related sclerosing diseases",
    choice2: "It can be distinguished from the fibrous variant of Hashimoto thyroiditis by its tendency to involve the perithyroidal soft tissues",
    choice3: "Obliterative vasculitis is usually present",
    choice4: "Granlomas are usually absent",
	choice5: "All of the above",
    answer: 5
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 28;

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
    return window.location.assign("c07endoend.html");
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

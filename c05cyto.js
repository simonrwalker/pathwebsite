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
	question: "Q1. Which cell types may be considered on the cell count for adequacy of a cervical smear, according to the Bethesda system for reporting cervical cytology?",
    choice1: "Mature squamous cells",
    choice2: "Mature squamous and squamous metaplastic cells",
    choice3: "Mature squamous and endocervical cells",
    choice4: "Squamous metaplastic and endocervical cells",
	choice5: "All cells on the smear",
    answer: 2
  },
  {
    question: "Q2. Which of the following should be considered satisfactory for a cervical smear, according to the Bethesda system?",
    choice1: "Liquid based cytology cervical smear with approximately 1000 squamous cells",
    choice2: "Conventional cytology cervical smear with approximately 4000 squamous cells",
    choice3: "Liquid based cytology cervical smear with approximately 5000 mature squamous cells, but without endocervical glandular or squamous metaplastic cells",
    choice4: "Cervical smear approximately 80% of squamous cells obscured by blood or inflammation",
	choice5: "Cervical smear specimen received without patient identification",
    answer: 3
  },
  {
    question: "Q3. According to the Bethesda system, the minimum cellularity adequacy criteria for a cervical smear can be lowered in all the following special circumstances except?",
    choice1: "Radiation to cervix/pelvix region",
    choice2: "Chemotherapy",
    choice3: "Hysterectomy or trachelectomy",
    choice4: "Pregnancy",
	choice5: "Atrophic vaginitis",
    answer: 4
  },
  {
    question: "Q4. What minimum percentage of squamous cells must be obscured by inflammation or blood for an interpretation of 'unsatisfactory' in a cervical smear, according to the Bethesda system?",
    choice1: "25%",
    choice2: "50%",
    choice3: "75%",
    choice4: "100%",
	choice5: "Any percentage",
    answer: 3
  },
  {
    question: "Q5. According to the Bethesda system, which of the following statements best characterizes the minimum criteria for an adequate transformation zone sample?",
    choice1: "Abundant mucus",
    choice2: "No such criteria exist",
    choice3: "At least 5 well-preserved endocervical or squamous metaplastic cells",
    choice4: "At least 10 well-preserved endocervical or squamous metaplastic cells",
	choice5: "At least 20 well-preserved endocervical or squamous metaplastic cells",
    answer: 4
  },
  {
    question: "Q6. A cervical smear from a 40-year-old female contains rare groups of benign-appearing endometrial cell clusters. Which category in the Bethesda system should be used to reflect this finding?",
    choice1: "Negative for squamous intraepithelial lesion of malignancy",
    choice2: "Atypical endometrial glandualr cells, not otherwise specified",
    choice3: "Atypical endometrial glandualr cells, favour neoplastic",
    choice4: "Adenocarcinoma, endometrial",
	choice5: "Other (endometrial cells in a woman >= 40 years of age)",
    answer: 1
  },
  {
    question: "Q7. A cervical smear form a 45-year-old female contains rare groups of benign-appearing endometrial cell clusters. Which category in the Bethesda system should be used to reflect this finding ?",
    choice1: "Negative for squamous intraepithelial lesion of malignancy",
    choice2: "Atypical endometrial glandualr cells, not otherwise specified",
    choice3: "Atypical endometrial glandualr cells, favour neoplastic",
    choice4: "Adenocarcinoma, endometrial",
	choice5: "Other (endometrial cells in a woman >= 45 years of age)",
    answer: 5
  },
  {
    question: "Q8. According to the guidelines of the Canadian Society of Cytopathology, which of the following screened cervical smears in a low risk population can be signed by a cytotechnologist without pathologist review?",
    choice1: "All smears",
    choice2: "All smears with the exception of atypical squamous cells of uncertain significance (ASC-US) or worse findings",
    choice3: "'Negative for squamous intraepithelial lesion or malignancy' smears with the exception of repair",
    choice4: "'Negative for squamous intraepithelial lesion or malignancy' smears including repair",
	choice5: "None",
    answer: 3
  },
  {
    question: "Q9. According to the Bethesda system, atypical repair should be reported in which of the following categories?",
    choice1: "Negative for squamous intraepithelial lesion or malignancy (NILM)",
    choice2: "Atypical squamous cells of undetermined significance (ASC-US)",
    choice3: "Low grade squamous intraepithelial lesion (LSIL)",
    choice4: "High grade squamous intraepithelial lesion (HSIL)",
	choice5: "Atypical squamous cells, cannot rule out HSIL",
    answer: 2
  },
  {
    question: "Q10. According to the Bethesda system, anucleate squamous cells should be reported in which of the following categories?",
    choice1: "Negative for squamous intraepithelial lesion or malignancy (NILM)",
    choice2: "Atypical squamous cells of undetermined significance (ASC-US)",
    choice3: "Atypical squamous cells, cannot rule out HSIL",
    choice4: "Low grade squamous intraepithelial lesion (LSIL)",
	choice5: "Other",
    answer: 1
  },
  {
    question: "Q11. All of the following statements concerning tubal metaplasia in cervical cytology are true except?",
    choice1: "Single ciliated cells in isolation are sufficient for the designation",
    choice2: "It is a pitfall for endocervical adenocarcinoma in situ",
    choice3: "Presence of cilia and/or terminal bars is characteristic",
    choice4: "The correct interpretation is 'negative for intraepithelial lesion or malignancy (NILM)'",
	choice5: "Increased nuclear to cytoplasmic ratio may be present",
    answer: 1
  },
  {
    question: "Q12. All of the following statements concerning lower uterine segment (LUS) sampling in cervical cytology are true except?",
    choice1: "LUS is a cause of false positive diagnosis (for HSIL or atypical glandular cells) in cervical cytology",
    choice2: "LUS typically present as large, flat hyperchromatic groups",
    choice3: "LUS should be reported in the category 'endometrial cells present'",
    choice4: "LUS is due to direct sampling instead of spontaneous exfoliation of endometrial cells",
	choice5: "The correct interpretation of such a finding is 'negative for intraepithelial lesion or malignancy (NILM)'",
    answer: 3
  },
  {
    question: "Q13. All of the following can cause perinuclear halos except?",
    choice1: "Trichomonas infection",
    choice2: "Nonspecific inflammation",
    choice3: "LSIL",
    choice4: "Navicular cells",
	choice5: "Decidual cells",
    answer: 5
  },
  {
    question: "Q14. Which of the following is not a feature of cervical adenocarcinoma in situ on cervical smear?",
    choice1: "Hyperchromasia",
    choice2: "Macronucleoli",
    choice3: "Rosettes",
    choice4: "Feathering",
	choice5: "Mitotic figures",
    answer: 2
  },
  {
    question: "Q15. All of the following are often encountered in cervical smears from patients with an intrauterine device (IUD) except?",
    choice1: "Actinomyces",
    choice2: "ASC-US-like epithelial cells",
    choice3: "ASC-H-like epithelial cells",
    choice4: "AGC, endometrial-like glandular cells",
	choice5: "Prominent nucleoli",
    answer: 2
  },
  {
    question: "Q16. In which phase of the menstrual cycle do you expect to see abundant Lactobacilli with cytolysis?",
    choice1: "Luteal phase",
    choice2: "Follicular phase",
    choice3: "Menstrual phase",
    choice4: "Transitional phase",
	choice5: "Perimenopausal phase",
    answer: 1
  },
  {
    question: "Q17. Strawberry colouring of the cervix and vagina is a classic sign of what infection?",
    choice1: "Bacterial vaginosis",
    choice2: "Trichomonas vaginalis",
    choice3: "Candida albicans",
    choice4: "Leptothrix",
	choice5: "Chlamydia",
    answer: 2
  },
  {
    question: "Q18. An NILM smear from a 30-year-old female is noted to have filamentous microorganism arranged in clumps ('cotton balls'). The underlying source of this finding is?",
    choice1: "Bacterial vaginosis",
    choice2: "Human papillomavirus (HPV) infection",
    choice3: "Foreign body, such as IUD",
    choice4: "Chlamydia",
	choice5: "Trauma",
    answer: 3
  },
  {
    question: "Q19. What is the name of the filamentous organisms that cause 'cotton ball' findings in cervical cytology?",
    choice1: "Actinomyces",
    choice2: "Nocardia",
    choice3: "Candida",
    choice4: "Leptothrix",
	choice5: "Lactobacilli",
    answer: 1
  },
  {
    question: "Q20. The so-called 'blue blobs' that can cause false positive diagnoses are characteristically seen in which of the following contexts?",
    choice1: "LSIL",
    choice2: "HSIL",
    choice3: "Pregnancy",
    choice4: "Follicular cervicitis",
	choice5: "Atrophic vaginitis",
    answer: 5
  },
  {
	question: "Q21. A shift in vaginal flora is associated with all of the following except?",
    choice1: "Clue cells",
    choice2: "Fishy-smelling vaginal discharge",
    choice3: "Pelvic inflammatory disease",
    choice4: "Birth defects",
	choice5: "Postoperative gynecologic infections",
    answer: 4
  },
  {
    question: "Q22. According to the Bethesda system, all of the following options are available for the interpretation of glandular lesions in cervical smears except?",
    choice1: "Atypical endometrial cells, not otherwise specified (NOS)",
    choice2: "Endometrial cells, favour neoplastic",
    choice3: "Atypical endocervical cells, NOS",
    choice4: "Atypical endocervical cells, favour neoplastic",
	choice5: "Endocervical adenocarcinoma in situ",
    answer: 2
  },
  {
    question: "Q23. According to the Bethesda system, the minimum cellularity adequacy criteria for a conventional anal smear is?",
    choice1: "500-1000 nucleated squamous cells",
    choice2: "1000-2000 nucleated squamous cells",
    choice3: "2000-3000 nucleated squamous cells",
    choice4: "4000-5000 nucleated squamous cells",
	choice5: "8000-12000 nucleated squamous cells",
    answer: 3
  },
  {
    question: "Q24. What recommended initial workup following an interpretation of a cervical smear as 'ASC-H'?",
    choice1: "Repeat cervical cytology in 3 months",
    choice2: "Colposcopy",
    choice3: "Reflex HPV testing",
    choice4: "Cytology and HPV testing (co-testing)",
	choice5: "All of the above",
    answer: 2
  },
  {
    question: "Q25. A fine needle aspiration (FNA) lung biopsy specimen contains rigid, septate hyphae with 45-degree branching. Name the most likely pulmonary infection?",
    choice1: "Aspergillus",
    choice2: "Mucormycosis",
    choice3: "Cryptococcus",
    choice4: "Blastomycosis",
	choice5: "Histoplasmosis",
    answer: 1
  },
  {
    question: "Q26. An FNA lung biopsy specimen contains yeasts that are 5-10 micrometeres (um) with narrow-based budding and have thick mucicarmine positive capsule. Name the most likely pulmonary infection?",
    choice1: "Aspergillus",
    choice2: "Mucormycosis",
    choice3: "Cryptococcus",
    choice4: "Blastomycosis",
	choice5: "Histoplasmosis",
    answer: 3
  },
  {
    question: "Q27. An FNA lung biopsy specimen contains yeasts that are 10-20 um with broad-based budding. Name the most likely pulmonary infection?",
    choice1: "Aspergillus",
    choice2: "Mucormycosis",
    choice3: "Cryptococcus",
    choice4: "Blastomycosis",
	choice5: "Histoplasmosis",
    answer: 4
  },
  {
    question: "Q28. An FNA lung biopsy specimen contains yeasts that are 5 um, predominantly within granulomata. Name the most likely pulmonary infection?",
    choice1: "Aspergillus",
    choice2: "Mucormycosis",
    choice3: "Cryptococcus",
    choice4: "Blastomycosis",
	choice5: "Histoplasmosis",
    answer: 5
  },
  {
    question: "Q29. A 64-year-old male with a history of cigarette smoking presents with hypercalcemia and a lung mass on subsequent workup. an FNA biopsy of the lung mass is performed, what is the most likely histologic subtype of this lung mass?",
    choice1: "Pulmonary hamartoma",
    choice2: "Carcinoid tumour",
    choice3: "Small cell carcinoma",
    choice4: "Adenocarcinoma",
	choice5: "Squamous cell carcinoma",
    answer: 5
  },
  {
    question: "Q30. A 61-year-old male with a history of cigarette smoking presents with progressive proximal muscle weakness, diagnosed as Lambert-Eaton myasthenic syndrome. On workup, he is found to have a lung mass. An FNA biopsy of this lung mass is performed. what is most likely histologic subtype of this lung mass?",
    choice1: "Pulmonary hamartoma",
    choice2: "Carcinoid tumour",
    choice3: "Small cell carcinoma",
    choice4: "Adenocarcinoma",
	choice5: "Squamous cell carcinoma",
    answer: 3
  },
  {
    question: "Q31. A 52-year-old female with no history of cigarette smoking or asbestos exposure presents with an incidentally found nodule with a 'ground glass' appearance on CT scan of the chest. An FNA biopsy of this lung mass is performed. what is most likely histologic subtype of this lung mass?",
    choice1: "Small cell carcinoma",
    choice2: "Adenocarcinoma",
    choice3: "Squamous cell carcinoma",
    choice4: "Largecell carcinoma",
	choice5: "Sarcomatoid carcinoma",
    answer: 2
  },
  {
    question: "Q32. What cells must be seen to designate a mediastinal lymph node sample as adequate when obtained by endobronchial ultrasound-guided (EBUS) FNA?",
    choice1: "Endobronchial cells and/or cartilage",
    choice2: "Endobronchial cells and/or pulmonary macrophages",
    choice3: "Lymphocytes and/or malignant cells",
    choice4: "Squamous cells and/or smooth muscle cells",
	choice5: "Squamous cells and/or cartilage",
    answer: 3
  },
  {
    question: "Q33. A 73-year-old male smoker, with a long history of asbestos exposure, presents with a malignant pleural effusion. Which of the following immunohistochemical profiles most strongly suggests primary pulmonary adenocarcinoma?",
    choice1: "Calretinin+, MOC31+, WT-1+, Ber-EP4+, CK5/6+",
    choice2: "Calretinin+, MOC31+, WT-1+, Ber-EP4+, CK5/6+",
    choice3: "Calretinin+, MOC31-, WT-1-, Ber-EP4-, CK5/6+",
    choice4: "Calretinin-, MOC31+, WT-1-, Ber-EP4+, CK5/6-",
	choice5: "Calretinin-, MOC31-, WT-1-, Ber-EP4-, CK5/6-",
    answer: 4
  },
  {
    question: "Q34. Which of the following malignant pleural effusion morphologies is most consistent with metastatic breast ductal adenocarcinoma?",
    choice1: "Large hollow spherical (cannonball) aggregates",
    choice2: "Abundant signet-ring cells",
    choice3: "Picket-fence arrangement of columnar cells",
    choice4: "Papillary fragments of with psammoma bodies",
	choice5: "Small cell clusters floating in mucinous background",
    answer: 1
  },
  {
    question: "Q35. Which of the following is not a limitation of breast FNA?",
    choice1: "Distinguishing invasvie dutal from intraductal carcinoma",
    choice2: "Distinguishing papilloma from low grade papillary tumours",
    choice3: "Distinguishing fibroadenomas from benign phyllodes tumours",
    choice4: "Distinguishing mucocele from colloid carcinoma",
	choice5: "Distinguishing fibrocystic change from fat necrosis",
    answer: 5
  },
  {
    question: "Q36. Which of the following would not be present with spindle cell cytomorphology on breast FNA?",
    choice1: "Medullary breast carcinoma",
    choice2: "Metaplastic breast carcinoma",
    choice3: "Malignant phyllodes tumour",
    choice4: "Fibromatosis",
	choice5: "Angiosarcoma",
    answer: 1
  },
  {
    question: "Q37. All of the following statements are true concerning lactating adenoma except?",
    choice1: "The cytoplasm of the cells is vacuolated",
    choice2: "The nucleoli are inconspicuous",
    choice3: "It constitutes a known cause of false positive diagnosis",
    choice4: "It can have numerous single epithelial cells and/or stripped nuclei",
	choice5: "The cytological features can overlap with those of fibroadenoma",
    answer: 2
  },
  {
    question: "Q38. According to the Bethesda system for reporting thyroid cytopathology, what is the approximate risk of malignancy for a thyroid FNA interpreted as atypia of undetermined significance?",
    choice1: "0-3%",
    choice2: "5-15%",
    choice3: "15-25%",
    choice4: "25-35%",
	choice5: ">35%",
    answer: 2
  },
  {
    question: "Q39. According to the Bethesda system for reporting thyroid cytopathology, what are the adequacy criteria for a solid thyroid nodule sampled by FNA?",
    choice1: "4 groups of well-visualized follicular cells with >=10 cells per group",
    choice2: "4 groups of well-visualized follicular cells with >=20 cells per group",
    choice3: "6 groups of well-visualized follicular cells with >=10 cells per group",
    choice4: "6 groups of well-visualized follicular cells with >=20 cells per group",
	choice5: "10 groups of well-visualized follicular cells with >=10 cells per group",
    answer: 3
  },
  {
    question: "Q40. According to the Bethesda system for reporting thyroid cytopathology, which of the following is the most appropriate management recommendation for a thyroid FNA interpreted as 'atypia of undetermined significance (AUS)'?",
    choice1: "Clinical followup",
    choice2: "Yearly follow-up with ultrasound and FNA",
    choice3: "Repeat FNA in 3-6 months",
    choice4: "Surgical lobectomy",
	choice5: "Near total thyroidectomy",
    answer: 3
  },
  {
	question: "Q41. A 50-year-old male has a cystic parotid gland mass. The cyst has abundant, thick brown (motor-oil-like) contents on FNA biopsy. What is the most likely diagnosis?",
    choice1: "Pleomorphic adenoma",
    choice2: "Warthin tumour",
    choice3: "Lymphoepithelial cyst",
    choice4: "Mucoepidermoid carcinoma",
	choice5: "Cystic squamous cell carcinoma",
    answer: 2
  },
  {
    question: "Q42. A 70-year-old male with a solid well-circumscribed neck mass undergoes FNA biopsy. Aspiration reveals an abundant pure population of oncocytes arranges in small clusters and single cells. What is the most likely diagnosis?",
    choice1: "Oncocytoma",
    choice2: "Oncocytic carcinoma",
    choice3: "Warthin tumour",
    choice4: "Oncocytic mucoepidermoid carcinoma",
	choice5: "Acinic cell carcinoma",
    answer: 1
  },
  {
    question: "Q43. Which of the following salivary gland lesions is most likely to result in a false negative aspirate?",
    choice1: "Mucoepidermoid carcinoma",
    choice2: "Adenoid cystic carcinoma",
    choice3: "Acinic cell carcinoma",
    choice4: "Lymphoepithelial carcinoma",
	choice5: "Squamous cell carcinoma",
    answer: 1
  },
  {
    question: "Q44. What type of lymphoma is diagnosed almost exclusively by cytology?",
    choice1: "Follicular lymphoma",
    choice2: "Anaplastic large cell lymphoma",
    choice3: "Nodular lymphocyte predominant Hodgkin lymphoma",
    choice4: "Primary effusion lymphoma",
	choice5: "Burkitt lymphoma",
    answer: 4
  },
  {
    question: "Q45. Which virus needs to be detected in a sample before a diagnosis of primary effusion lymphoma can be given?",
    choice1: "Human immunodeficiency virus (HIV)",
    choice2: "Human herpesvirus 8 (HHV-8)",
    choice3: "Epstein-Barr virus (EBV)",
    choice4: "Cytomegalovirus (CMV)",
	choice5: "Simian polyoma virus 40 (SV-40)",
    answer: 2
  },
  {
    question: "Q46. An 86-year-old male with a liver mass, seen on abdomen CT scan, undergoes FNA biopsy of the lesion. Cytology shows a cellular smear composed of cohesive groups of columnar cells in a 'picket-fence' arrangement and acini with central and background necrotic debris. Which of the following is the most likely diagnosis?",
    choice1: "Hepatocellular carcinoma",
    choice2: "Cholangiocarcinoma",
    choice3: "Metastatic colorectal carcinoma",
    choice4: "Metastatic breast carcinoma",
	choice5: "Epithelioid angiosarcoma",
    answer: 3
  },
  {
    question: "Q47. A 56-year-old male with a liver mass in a background of cirrhosis, seen on abdomen CT scan, undergoes FNA biopsy of the lesion. Cytology shows a cellular smear composed of cohesive and single polygonal cells. Which of the following would strongly suggest a diagnosis of hepatocellular carcinoma?",
    choice1: "Strong HepPar-1 positivity",
    choice2: "Background of cirrhosis as seen on abdomen CT scan",
    choice3: "Thickened trabeculae lined by endothelial cells",
    choice4: "Lack of bile duct epithelium in the background",
	choice5: "Clinical history and serology consistent with hepatitis C infection",
    answer: 3
  },
  {
    question: "Q48. A 64-year-old female with a cystic pancreatic head mass, seen on abdomen CT scan, undergoes an endoscopic ultrasound-guided FNA of the cystic lesion. Cytology shows rare bland mucinous epithelial cells and thick mucin. Which of the following would most strongly suggest a neoplastic mucinous neoplasm?",
    choice1: "Elevated carcinoembryonic antigen (CEA) on cyst fluid analysis",
    choice2: "Elevated amylase on cyst fluid analysis",
    choice3: "Low CEA and amylase on cyst fluid analysis",
    choice4: "KRAS mutation on molecular analysis",
	choice5: "Ultrasound evidence of a dilated main pancreatic duct",
    answer: 1
  },
  {
    question: "Q49. A 51-year-old female is found to have a metastatic adenocarcinoma to the cerefrospinal fluid (CSF) with no known primary cancer. What is the most likely occult primary site?",
    choice1: "Breast",
    choice2: "Lung",
    choice3: "Stomach",
    choice4: "Colon/rectum",
	choice5: "Ovary",
    answer: 2
  },
  {
    question: "Q50. According to the Paris system for reporting urinary cytopathology, the main aim of urine cytology is to detect?",
    choice1: "Microhematuria",
    choice2: "Urinary tract infections",
    choice3: "Papillary urothelial neoplasm of low malignant potential (PUNLMP)",
    choice4: "Low grade urothelial carcinoma",
	choice5: "High grade urothelial carcinoma",
    answer: 5
  },
  {
    question: "Q51. An 86-year-old male is found to have a renal mass. Numerous malignant cells with oncocytic features are found on FNA biopsy. Cytogenetics reveals trisomy 7, 16 and 17. What is the most likely diagnosis?",
    choice1: "Oncocytoma",
    choice2: "Chromophobe renal cell carcinoma",
    choice3: "Conventional (clear-cell) renal cell carcinoma with granular cells",
    choice4: "Papillary renal cell carcinoma",
	choice5: "Adrenocortical carcinoma",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 51;

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
    return window.location.assign("c05cytoend.html");
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

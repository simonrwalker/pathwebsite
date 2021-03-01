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
	question: "Q1. What is the most likely age of the myocardial infarction in this image (Image of dead myocytes with neutrophils. images not supported in v1.0)?",
    choice1: "4-8 hours",
    choice2: "12-24 hours",
    choice3: "3 days",
    choice4: "7 days",
	choice5: "14 days",
    answer: 3
  },
  {
    question: "Q2. Which of the following are complications of acute myocardial infarction?",
    choice1: "Ventricular free wall rupture",
    choice2: "Aortic dissection and rupture",
    choice3: "Thrombus in a heart chamber",
    choice4: "Petechial rash",
	choice5: "Answers a and c only",
    answer: 5
  },
  {
    question: "Q3. Ventricular rupture in acute myocardial infarction most commonly occurs?",
    choice1: "1 day after onset",
    choice2: "3-7 days after onset",
    choice3: "2 weeks after onset",
    choice4: "1 month after onset",
	choice5: "3 months after onset",
    answer: 2
  },
   {
    question: "Q4. All of the following cause systolic left ventricle dysfunction except?",
    choice1: "Coronary heart disease (CHD)",
    choice2: "Hypertension",
    choice3: "Idiopathic dilated cardiomyopathy",
    choice4: "Alcoholic cardiomyopathy",
	choice5: "Hypertrophic cardiomyopathy",
    answer: 5
  },
  {
    question: "Q5. Polymyalgia rheumatica occurs in which type of vasculitis?",
    choice1: "Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis)",
    choice2: "Buerger disease (thromboangiitis obliterans)",
    choice3: "Polyarteritis Nodosa",
    choice4: "Giant cell (temporal) arteritis",
	choice5: "Wegener granulomatosis (Granulomatosis with polyangiitis)",
    answer: 4
  },
  {
    question: "Q6. The differential diagnosis for restrictive cardiomyopathy includes all the following except?",
    choice1: "Hemochromatosis",
    choice2: "Dilated cardiomyopathy",
    choice3: "Sarcoidosis",
    choice4: "Metastatic tumour",
	choice5: "Radiation",
    answer: 2
  },
  {
    question: "Q7. Cardiac angiosarcoma most commonly occurs in which part of the heart?",
    choice1: "Left ventricle",
    choice2: "Right ventricle",
    choice3: "Right atrium",
    choice4: "Left atrium",
	choice5: "Ventricular septum",
    answer: 3
  },
  {
    question: "Q8. The microscopic image of a skin biopsy specimen from a 35-year old man with skin rashes. What is the most likely diagnosis? (image shows dermal leukocytoclastic vasculitis and eosinophils)",
    choice1: "Giant cell arteritis",
    choice2: "Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis)",
    choice3: "Wegener granulomatosis (Granulomatosis with polyangiitis)",
    choice4: "Polyarteritis Nodosa",
	choice5: "Henoch-Schonlein purpura",
    answer: 2
  },
  {
    question: "Q9. What are common gross changes observed in excised rheumatic mitral valves?",
    choice1: "Chordal rupture",
    choice2: "Leaflet perforations from inflammation",
    choice3: "Leaflet and chordal fibrosis",
    choice4: "Verrucous endocarditis",
	choice5: "Necrotizing granulomas",
    answer: 3
  },
  {
    question: "Q10. The gross image below is from the resected bicuspid aortic valve of a 38-year-old man. What is the most likely diagnosis (image shows vague small hard nodularity on the valve)?",
    choice1: "Degenerative calcific aortic stenosis",
    choice2: "Rheumatic heart disease",
    choice3: "Acute infectious endocarditis",
    choice4: "Non-bacterial thrombotic endocarditis",
	choice5: "Libman-Sacks endocarditis",
    answer: 1
  },
  {
    question: "Q11. The microscopic image (image shows a myxoma) is from a mass from the left atrium of a 52-year-old man. Which of the following statements is not true regarding this neoplasm?",
    choice1: "About 10% of these tumours are associated with Carney syndrome",
    choice2: "This tumour is the most common primary cardiac tumour in adults",
    choice3: "It arises most commonly from the right atrium",
    choice4: "The tumour cells often express calretinin and CD34",
	choice5: "Gland formation and extramedullary hematopoeisis can be found in this lesion",
    answer: 3
  },
  {
    question: "Q12. A 32-year-old female with a history of cocaine use presented with purpura of the lower legs. The image below is from a skin biopsy specimen. what is the most likely diagnosis (image shows dermal vasculitis, PMNs and extravasated RBCs?",
    choice1: "Polyarteritis nodosa",
    choice2: "Leukocytoclastic vasculitis",
    choice3: "Wegener granulomatosis (Granulomatosis with polyangiitis)",
    choice4: "Giant cell arteritis",
	choice5: "Buerger disease",
    answer: 2
  },
  {
    question: "Q13. The microscopic image below shows a temporal artery biopsy specimen from a 65-year-old woman with vision changes. What is your diagnosis? (image shows thickened blood vessel wall with peripheral inflammation)",
	choice1: "Giant cell arteritis",
    choice2: "Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis)",
    choice3: "Wegener granulomatosis (Granulomatosis with polyangiitis)",
    choice4: "Polyarteritis Nodosa",
	choice5: "Henoch-Schonlein purpura",
    answer: 1
  },
  {
    question: "Q14. What are common clinical manifestations of active temporal arteritis?",
    choice1: "Jaw pain after chewing",
    choice2: "Hematuria",
    choice3: "Generalized aches and pains",
    choice4: "Nodules on the legs",
	choice5: "Answers A and C only",
    answer: 5
  },
  {
    question: "Q15. Which of the following are typical of atherosclerotic blood vessels?",
    choice1: "Necrosis of inflammatory cells in plaque",
    choice2: "Cholesterol crystals",
    choice3: "Medial thinning",
    choice4: "Fibrinoid necrosis of the media",
	choice5: "All except D",
    answer: 5
  },
  {
    question: "Q16.  The gross image below is from the resected mitral valve of a 45-year-old woman. what is the most likely diagnosis? (image of fish mouth valve change)",
    choice1: "Degenerative calcific aortic stenosis",
    choice2: "Rheumatic heart disease",
    choice3: "Acute infectious endocarditis",
    choice4: "Non-bacterial thrombotic endocarditis",
	choice5: "Libman-Sacks endocarditis",
    answer: 2
  },
  {
    question: "Q17. Aschoff bodies in an endomyocardial biopsy specimen of a 27-year-old woman indicate a diagnosis of?",
    choice1: "Acute rheumatic heart disease",
    choice2: "Chronic rheumatic heart disease",
    choice3: "Chagas disease",
    choice4: "Lyme disease",
	choice5: "Toxoplasma myocarditis",
    answer: 1
  },
  {
    question: "Q18. An endomyocardial biopsy shows myocyte hypertrophy, myocyte disarray and interstitial fibrosis. These features are...?",
    choice1: "Specific for hypertrophic cardiomyopathy",
    choice2: "Specific for dilated cardiomyopathy",
    choice3: "Specific for restrictive cardiomyopathy",
    choice4: "Non-specific changes",
	choice5: "Specific for systemic arterial hypertension",
    answer: 4
  },
  {
    question: "Q19. A 25-year-old man presents with progressive exercise intolerance. Auscultation discloses a harsh systolic ejection murmur. Echocardiography shows asymmetric left ventricular hypertrophy. The right ventricle wall is also thickened. What is the most likely etiology of his heart abnormalities?",
    choice1: "Gene mutations in the B-myosin heavy chain",
    choice2: "Chronic alcohol abuse",
    choice3: "Cardiac amyloid deposits",
    choice4: "Hypertension",
	choice5: "Deposition of iron (hemochromotosis",
    answer: 1
  },
  {
    question: "Q20. The most common cause of myocarditis is?",
    choice1: "Streptococcus viridans",
    choice2: "Coxsackievirus A",
    choice3: "Aspergillus",
    choice4: "Borrelia burgdorferi",
	choice5: "Trypanosoma cruzi",
    answer: 2
  },
  {
	question: "Q21. A teenage girl has a blackout during exercies. The ECG shows left ventricular hypertrophy and abnormal Q waves. Echocardiogram shows LV and septal hypertrophy, a small LV and reduced septal excursion. Microscopically the septum shows myofiber disarray. What is the most likely diagnosis?",
    choice1: "Rheumatic heart disease",
    choice2: "Viral myocarditis",
    choice3: "Systemic lupus erythomatosus",
    choice4: "Hypertrophic cardiomyopathy",
	choice5: "Diabetes mellitus",
    answer: 4
  },
  {
    question: "Q22. A middle-aged woman has had decreasing exercise tolerance for several years. She is found to have decreased cardiac output with diminished diastolic filling on echo. The heart seem normal sized. Which of the following pathologic findings would best explain this condition?",
    choice1: "Dilated cardiomyopathy",
    choice2: "Rheumatic heart disease",
    choice3: "Chronic alcoholism",
    choice4: "Coxsackievirus B infection",
	choice5: "Constrictive pericarditis",
    answer: 5
  },
  {
    question: "Q23. Which of the following can mimic restrictive cardiomyopathy?",
    choice1: "Amyloidosis",
    choice2: "Dilated cardiomyopathy",
    choice3: "Constrictive pericarditis",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 5
  },
  {
    question: "Q24. The dominant coronary artery...?",
    choice1: "Is most commonly the right coronary artery",
    choice2: "Supplies the majority of the left ventricle",
    choice3: "Gives rise to the posterior descending artery",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 5
  },
  {
    question: "Q25. Coronary plaque rupture and thrombosis are common features of?",
    choice1: "Acute myocardial infarction",
    choice2: "Chronic stable angina pectoris",
    choice3: "Sudden cardiac death",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 1
  },
  {
    question: "Q26. Circumferential subendocardial myocardial infarction is commonly associated with?",
    choice1: "Coronary atherosclerosis",
    choice2: "Mitral regurgitation",
    choice3: "Hypotensive episodes",
    choice4: "Coronary artery spasm",
	choice5: "Coronary ostial stenosis",
    answer: 3
  },
  {
    question: "Q27. Rupture of which of the following could complicate an acute subendocardial myocardial infarction?",
    choice1: "Ventricular free wall",
    choice2: "Left ventricular papillary muscle",
    choice3: "Ventricular septum",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 2
  },
  {
    question: "Q28. When a person dies suddenly from a 'heart attack', the most likely cause is",
    choice1: "Rupture of the heart",
    choice2: "Congestive heart failure",
    choice3: "Angina",
    choice4: "Coronary artery thrombus",
	choice5: "Cardiac arrythmia",
    answer: 5
  },
  {
    question: "Q29. Left sided heart failure frequently leads to right sided heart failure because?",
    choice1: "The basic underlying disease involves both chambers",
    choice2: "Poor perfusion of the right coronary system results from the left ventricular failure",
    choice3: "The enlarged left ventricle partially obstructs the pulmonary veins",
    choice4: "The enlarged left ventricle partially obstructs the pulmonary arteries",
	choice5: "Increased pulmonary arterial pressure strains the right ventricle",
    answer: 5
  },
  {
    question: "Q30. Which of the following manifestations of left heart failure may be apparent during autopsy?",
    choice1: "Heavy lungs",
    choice2: "Congested spleen",
    choice3: "Congested liver",
    choice4: "Ascites",
	choice5: "Leg edema",
    answer: 1
  },
  {
    question: "Q31.  Which is not a characteristic of chronic peripheral venous insufficiency?",
    choice1: "Brown skin discolouration",
    choice2: "Toe ulcers",
    choice3: "Edema",
    choice4: "Bullae",
	choice5: "Ulcer above ankle medially",
    answer: 2
  },
  {
    question: "Q32. Mitral stenosis, in most instances, is a result of...?",
    choice1: "Bacterial infective endocarditis",
    choice2: "Nonbacterial thrombotic endocarditis",
    choice3: "Rheumatic fever sequelae",
    choice4: "Endocardial fibroelastosis",
	choice5: "Congenital anomaly of the valves",
    answer: 3
  },
  {
    question: "Q33. Complications of a chronic true postmyocardial infarct left ventricular aneurysm include all of the following except..?",
	choice1: "Arrythmia",
    choice2: "Systemic emboli",
    choice3: "Cardiac rupture",
    choice4: "Mural thrombus",
	choice5: "Congestive heart failure",
    answer: 3
  },
  {
    question: "Q34. Atherosclerotic aneuryms most commonly occur in the...?",
    choice1: "Ascending aorta",
    choice2: "Carotid arteries",
    choice3: "Aortic arch",
    choice4: "Superior mesenteric artery",
	choice5: "Abdominal aorta",
    answer: 5
  },
  {
    question: "Q35. Dissection of the aorta may be complicated by all of the following conditions except?",
    choice1: "Aortic regurgitation",
    choice2: "Hemopericardium and tamponade",
    choice3: "Splenic emboli",
    choice4: "Coronary artery occlusion",
	choice5: "Stroke (cerebral infarction)",
    answer: 3
  },
  {
    question: "Q36. Dilated cardiomyopathy may be associated with all of the following except?",
    choice1: "Lymphocytic myocarditis",
    choice2: "Peripheral eosinophilia",
    choice3: "Chronic alcoholism",
    choice4: "Peripartum state",
	choice5: "Familial transmission",
    answer: 2
  },
  {
    question: "Q37. Endomyocardial biopsy may be indicated for the diagnosis of...?",
    choice1: "Myocarditis",
    choice2: "Myocardial infarction",
    choice3: "Amyloidosis",
    choice4: "Answers a and c only",
	choice5: "Answers a and b only",
    answer: 4
  },
  {
    question: "Q38. Which of the following are elastic arteries?",
    choice1: "Aorta",
    choice2: "Renal artery",
    choice3: "Carotid artery",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 5
  },
  {
    question: "Q39. Which of the following is true regarding Takayasu disease?",
    choice1: "It involves the aorta only",
    choice2: "It may involve the pulmonary arteries",
    choice3: "It affects mainly over the age of 50 years",
    choice4: "It may affect popliteal arteries",
	choice5: "All of the above",
    answer: 2
  },
  {
    question: "Q40. Which of the following disease and affected vessel groupings is correct?",
    choice1: "Giant cell arteritis -- muscular and elastic arteries only",
    choice2: "Classic polyarteritis nodosa (PAN) -- musuclar arteries, veins and capillaries",
    choice3: "Buerger disease - leg arteries only",
    choice4: "Buerger disease - leg arteries, veins and capillaries",
	choice5: "Answers a and c only",
    answer: 1
  },
  {
	question: "Q41. Possible outcomes for a congenitally bicuspid aortic valve include?",
    choice1: "Aortic stenosis",
    choice2: "Aortic regurgitation",
    choice3: "Infective endocarditis",
    choice4: "All of the above",
	choice5: "Answers a and c only",
    answer: 4
  },
  {
    question: "Q42. Acute fibrinous pericarditis often occurs in combination with?",
    choice1: "Atrioventricular conduction block",
    choice2: "Mitral regurgitation",
    choice3: "Myocarditis",
    choice4: "Pulmonary hypertension",
	choice5: "Coronary artery spasm",
    answer: 3
  },
  {
    question: "Q43. A common non-infectious underlying cause of acute pericarditis is?",
    choice1: "Acute stroke",
    choice2: "Chronic obstructive pulmonary disease",
    choice3: "Liver failure",
    choice4: "Renal failure",
	choice5: "Asthma exacerbation",
    answer: 4
  },
  {
    question: "Q44. An elderly woman with long-standing systemic arterial hypertension has an aortic valve replacement and an ascending aortic aneurysm resection. What did microscopy of the aorta tissue most likely show?",
    choice1: "Thrombus",
    choice2: "Medial degeneration",
    choice3: "Calcification of the media",
    choice4: "Adventitial granulomas",
	choice5: "Acute dissection",
    answer: 2
  },
  {
    question: "Q45. An elderly woman has surgery for a rupturing abdominal aortic aneurysm. Histologically, which of the following is a clue that the aneurysm may be an infected mycotic aneurysm?",
    choice1: "Large collections of macrophages",
    choice2: "Large collections of neutrophils",
    choice3: "Fragmentation of the elastic in the media",
    choice4: "Amorphous necrotic debris",
	choice5: "Recent thrombus",
    answer: 2
  },
  {
    question: "Q46. A 58-year-old man had a cardiac transplant 10 years ago. He presents with increasing heart failure. The most likely cause is?",
    choice1: "Acute cellular rejection",
    choice2: "Chronic vascular rejection",
    choice3: "Hyperacute rejection",
    choice4: "Infective endocarditis",
	choice5: "Fibrinous pericarditis",
    answer: 2
  },
  {
    question: "Q47. Endomyocardial biopsy is a specific diagnostic modality for which of the following diseases?",
    choice1: "Hypertrophic cardiomyopathy",
    choice2: "Hemochromatosis",
    choice3: "Aortic stenosis",
    choice4: "Systemic arterial hypertension",
	choice5: "Diabetes mellitus myocardial disease",
    answer: 2
  },
  {
    question: "Q48. The most common tumour that involves the heart is?",
    choice1: "Carcinoid tumour",
    choice2: "Fibroma",
    choice3: "Angiosarcoma",
    choice4: "Metastatic tumour",
	choice5: "Myxoma",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 48;

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
    return window.location.assign("c04cvend.html");
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

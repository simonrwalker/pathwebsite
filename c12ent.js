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
	question: "Q1. Pleomorphic adenomas may show any of the following except?",
    choice1: "Foci of mucinous and squamoid differentiation mimicking mucoepidermoid carcinoma",
    choice2: "Recurrence in the form of multiple nodules within fibrous and adipose tissue",
    choice3: "Frequent perineural invasion",
    choice4: "Rounded 'buds' protruding through the tumour capsule",
	choice5: "Adenoid cystic-like pattern",
    answer: 3
  },
  {
    question: "Q2. Which of the following is NOT true of mucoepidermoid carcinoma?",
    choice1: "Keratin pearls are seen frequently in the epidermoid component",
    choice2: "Goblet cells are common in low grade tumours",
    choice3: "The translocation MECT1-MAML2 may have diagnostic utility",
    choice4: "High grade tumours are most often purely or predominantly solid",
	choice5: "A clear cell component may be seen that is distinct from the mucinous component",
    answer: 1
  },
  {
    question: "Q3. Which of the following is true of carcinoma arising in pleomorphic adenoma?",
    choice1: "Adenoid cystic carcinoma is commonly the malignant component",
    choice2: "Carcinoma confined to the capsule of the pleomorphic adenoma is associated with a poor prognosis",
    choice3: "A history of a long-standing mass with recent sudden growth is rare",
    choice4: "Minimally invasive carcinoma, defined as extension <1.5 mm beyond the capsule of the pleomorphic adenoma, is associated with an excellent prognosis",
	choice5: "Salivary duct carcinoma is rarely the malignant component",
    answer: 4
  },
  {
    question: "Q4. Which of the following is NOT true of Warthin tumours?",
    choice1: "Solid nodules composed of oncocytic cells that may mimic oncocytoma are occasionally seen",
    choice2: "Squamous metaplasia with atypia when infected may mimic squamous cell carcinoma, particularly with specimens from fine-needle aspiration (FNA) biopsy",
    choice3: "Malignancy may develop in either the epithelial or lymphoid component",
    choice4: "Occasional goblet cells may be present within the epithelium, raising the differential diagnosis of oncocytic mucoepidermoid carcinoma",
	choice5: "Stroma poor variants (epithelial component greater or equal to 70-80%) have a higher recurrence rate than typical cases",
    answer: 5
  },
  {
    question: "Q5. A 44-year-old man presents with a hard palate mass that he has had for 6 months. He thinks it has gradually enlarged during that period. A specimen from an incisional biopsy shows a solid proliferation of cells with eosinophilic cytoplasm and eccentrically located mildly atypical nuclei, consistent with hyaline or plasmacytoid myoepithelial cells. which of the following statements is true?",
    choice1: "It is important to notify the clinician that low grade myoepithelial carcinoma cannot be ruled out until the tumour is removed and assessed for invasive growth",
    choice2: "Myoepithelial cells of this type are seen in myoepithelioma, myoepithelial carcinoma, pleomorphic adenoma and adenoid cystic carcinoma",
    choice3: "Myoepitheliomas will almost always stain positively for pan-keratin, smooth muscle myosin heavy chain, smooth muscle actin and desmin",
    choice4: "S100 rarely stains tumour cells in myoepithelioma",
	choice5: "Chondroid differentiation is common",
    answer: 1
  },
  {
    question: "Q6. All of the following statements are true about acinic cell carcinoma of the salivary gland except?",
    choice1: "It may occur in minor and major salivary glands",
    choice2: "It is among the most common salivary gland malignancies in children",
    choice3: "Occasional tumours are composed of a single cyst with minimal solid component",
    choice4: "Acinic cell carcinoma is graded based on nuclear and architectural features",
	choice5: "High grade transformation (dedifferentiation) is rare and associated with poor prognosis",
    answer: 4
  },
  {
    question: "Q7. Basal cell adenoma shows all of the following features except?",
    choice1: "The membranous variant is sometimes associated with cutaneous neoplasms that have an identical morphologic appearance",
    choice2: "Basal cell adenoma may be grossly cystic",
    choice3: "Cells with a myoepithelial phenotype are not present in basal cell adenoma",
    choice4: "The membranous variant has also been termed 'dermal analogue tumour'",
	choice5: "Infiltrative growth into adjacent salivary gland tissue indicates basal cell adenocarcinoma",
    answer: 3
  },
  {
    question: "Q8. The differential diagnosis of adenoid cystic carcinoma includes a number of other tumours. Which of the following is not typically considered in the differential diagnosis?",
    choice1: "Membranous variant of basal cell adenoma",
    choice2: "Basaloid squamous cell carcinoma",
    choice3: "Polymorphous low grade adenocarcinoma",
    choice4: "Salivary duct carcinoma",
	choice5: "Epithelial-myoepithelial carcinoma",
    answer: 4
  },
  {
    question: "Q9. All of the following are true for nasopharyngeal angiofibroma except?",
    choice1: "It may grow into the middle cranial fossa",
    choice2: "It occurs most commonly in young women",
    choice3: "It typically presents with epistaxis and nasal obstruction",
    choice4: "It contains thin walled vessels lacking elastic fibers",
	choice5: "Characteristic site of origin is the posterolateral roof of the nasopharynx in the area of the sphenopalantine foramen",
    answer: 2
  },
  {
    question: "Q10. Which of the following statements is true regarding sinonasal papilloma?",
    choice1: "Inverted papillomas have a low rate of recurrence with simple excision",
    choice2: "Exophytic (fungiform) papillomas typically occur on the lateral wall of the nasal cavity and paranasal sinuses",
    choice3: "The risk of malignant transformation is higher with exophytic papillomas than with oncocytic schneidarian (cylindrical cell) papillomas",
    choice4: "Bilateral inverted papillomas are common",
	choice5: "While the malignant tumour that arises most frequently with inverted papilloma is squamous cell carcinoma, other tumour types such as mucoepidermoid carcinoma, clear cell carcinoma and verrucous carcinoma also occur",
    answer: 5
  },
  {
    question: "Q11. Which of the following is least likely to be seen on microscopic examination of an olfactory neuroblastoma?",
    choice1: "Neurofibrillary stroma",
    choice2: "Homer-Wright pseudorosettes",
    choice3: "S100 positive staining of sustentacular cells at the periphery of cell nests",
    choice4: "Nests of squamous cells surrounded by neuroblasts",
	choice5: "Strong staining with synaptophysin",
    answer: 4
  },
  {
    question: "Q12. A 51-year-old man presents with a cystic mass just anterior to the sternocleidomastoid muscle in the upper neck. Clinically and radiologically, this is felt to be consistent with a branchial cleft cyst. Excision shows variable morphology of the cyst lining, with some areas lined by multilayered maturing squamous epithelium with mild atypia and some regions of frank squamous cell carcinoma. Which of the following statements is NOT true with respect to this situation?",
    choice1: "Branchial cleft cysts are less common than metastatic squamous cell carcinoma in this age group",
    choice2: "Malignant transformation of a branchial cleft cyst is an uncommon but well recognized complication",
    choice3: "Staining for p16 would be supportive evidence of origin from the oropharynx",
    choice4: "Cystic metastases of squamous cell carcinoma in this location are most often of the palantine or lingual tonsillar origin",
	choice5: "Human papillomavirus (HPV) related squamous cell carcinoma of the head and neck shows greater response to radiotherapy than non-HPV-related cancers",
    answer: 2
  },
  {
    question: "Q13. Which of the following is least likely to be a cystic lesion of the neck?",
    choice1: "Metastatic papillary thyroid carcinoma",
    choice2: "Parathyroid adenoma",
    choice3: "Metastatic squamous cell carcinoma",
    choice4: "Parathyroid cyst",
	choice5: "Thyroglossal duct cyst",
    answer: 2
  },
  {
    question: "Q14. Jugulotympanic paraganglioma (glomus tympanicum, glomus jugulare) is the most common tumour of the middle ear. Which of the following statements is true regarding these tumours?",
    choice1: "The rate of malignant behaviour is approximately 30%",
    choice2: "They are closely related to glomus tumours of the skin",
    choice3: "The chief cells would be expected to stain positively with chromogrannin, S100 and synaptophysin",
    choice4: "Predicting malignant behaviour from the histologic appearance is impossible",
	choice5: "The tumours are typically readily recognized at the same time of surgery as nonvascular whitish masses",
    answer: 4
  },
  {
    question: "Q15. With respect to cholesteatoma, which of the following is true?",
    choice1: "It is a neoplasm and is in essence a well-differentiated squamous cell carcinoma",
    choice2: "The histologic appearance typically consists of a proliferation of squamous cells in solid nests and trabecular patterns",
    choice3: "It may show clinical evidence of extensive bone destruction",
    choice4: "It is most often seen in the external auditory canal",
	choice5: "It rarely metastasizes",
    answer: 3
  },
  {
    question: "Q16. A 78-year-old woman with a long history of smoking and alcohol use presents with hoarseness of 3 months duration. Examination of the vocal cords shows an exophytic mass on the right vocal cord. Biopsy shows invasive moderately differentiated squamous cell carcinoma. Which of the following statements is true?",
    choice1: "The primary treatment in this situation should be radical laryngectomy",
    choice2: "Squamous cell carcinomas at this site are more often related to human papillomavirus than smoking and alcohol use",
    choice3: "Tumours confined to the vocal cord are associated with a better prognosis than those that cross the ventricle",
    choice4: "Laryngeal squamous cell carcinoma involving a tracheostomy site is associated with a good prognosis",
	choice5: "Most squamous cell carcinomas at this site are preceded by a recognizable period of squamous dysplasia/carcinoma in situ",
    answer: 3
  },
  {
    question: "Q17. Which of the following statements is true regarding otologic tumours?",
    choice1: "Tumours of the ceruminous glands are typically malignant",
    choice2: "Tumours of the ceruminous glands may be of salivary gland type",
    choice3: "The majority of schwannomas arising in the temporal bone ('acoustic neuromas') are associated with neurofibromatosis type 2",
    choice4: "Squamous cell carcinoma of the external auditory canal has a better prognosis than that of the external ear",
	choice5: "Most meningiomas of the ear/temporal bone region are not associated with an intracranial meningioma",
    answer: 2
  },
  {
    question: "Q18. You receive a specimen labelled 'sinus contents' from a 42-year-old man. The sections show inflammed mucosa with many eosinophils and thick laminated mucin containing Charcot-Leyden crystals and degenerating granulocytes. You suspect allergic/eosinophilic fungal rhinosinusitis. Which of the following statements is incorrect about this disease?",
    choice1: "Fungi may be difficult to identify within the mucin, even with special stains",
    choice2: "This condition may cause an expansile mass, leading to bone erosion or proptosis",
    choice3: "Cultures are invariably positive for Aspergillus species",
    choice4: "Patients often have allergic symptoms with peripheral eosinophilia and elevated IgE",
	choice5: "Slides should be carefully examined to rule out invasive fungal sinusitis",
    answer: 3
  },
  {
    question: "Q19. Which of the following tumours may present as an exophytic or polypoid mass in the supraglottic larynx?",
    choice1: "Granular cell tumour",
    choice2: "Adult type rhabdomyoma",
    choice3: "Spindle cell/sarcomatoid variant of squamous cell carcinoma",
    choice4: "Neuroendocrine carcinoma",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q20. In the context of evaluating a clinically designated squamous papilloma of the larynx, which of the following statements is true?",
    choice1: "A single representative section is sufficient for adequate histologic evaluation",
    choice2: "Squamous cell carcinomas with papillary architecture are extremely rare in this location",
    choice3: "HPV-related squamous papillomas are typically keratinized",
    choice4: "In situ hybridization for HPV should be performed routinely",
	choice5: "Occasional suprabasal mitoses, ciliated or columnar cells and koilocytes are common findings in benign papillomas",
    answer: 5
  },
  {
    question: "Q21. Which of the following statements about hematopoietic neoplasms of the upper aerodigestive tract mucosa is correct?",
    choice1: "Diffuse large B cell lymphoma is more commonly found on the nasal septum than in the oropharynx",
    choice2: "Extramedullary plasmacytoma is not associated with systemic plasma cell neoplasms",
    choice3: "Nasal natural killer/T cell lymphoma is typically negative on in situ hybridization for Epstein-Barr virus-encoded RNA (EBER)",
    choice4: "Nasal natural killer/T cell lymphoma should be considered in the differential diagnosis of destructive, inflammatory conditions of the nasal and oral cavities",
	choice5: "Hodgkin lymphoma is more common than non-Hodgkin lymphoma among older adults",
    answer: 4
  },
  {
    question: "Q22. You receive a biopsy specimen from the lining of a cyst surrounding the crown of a mandibular third molar tooth that contains inflammed, nondysplastic squamous epithelium. Which of the following entities can be excluded?",
    choice1: "Radicular cyst",
    choice2: "Conventional type ameloblastoma",
    choice3: "Dentigerous cyst",
    choice4: "Unicystic ameloblastoma",
	choice5: "Odontogenic keratocyst/keratocystic odontogenic tumour",
    answer: 1
  },
  {
    question: "Q23. Which of the following statements is NOT true regarding ossifying fibroma of the jaw?",
    choice1: "Clinical and radiographic correlation are crucial when attempting to distinguish this entity from other fibroosseous conditions",
    choice2: "It is considered a neoplasm",
    choice3: "Aggressive/active variants are more common in adults than children",
    choice4: "Lesions are typically well demarcated from the surrounding native bone and 'shell out' easily",
	choice5: "They may contain giant cells",
    answer: 3
  },
  {
    question: "Q24. Which of the following statements is correct regarding fibromas of the oral cavity?",
    choice1: "The most common site is the floor of the mouth",
    choice2: "They are always traumatic in origin",
    choice3: "Atrophy and hyperkeratosis of the surface epithelium are dintinctly unusual and should raise the possibility of low grade fibrosarcoma",
    choice4: "Stellate, multinucleated cells may occur in some cases",
	choice5: "They are considered a premalignant condition",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 24;

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
    return window.location.assign("c12entend.html");
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

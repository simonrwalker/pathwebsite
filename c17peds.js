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
	question: "Q1. Which statement about prematurity is false?",
    choice1: "Prematurity is defined as birth before 37 weeks gestation",
    choice2: "The incidence in the USA is approximately 12% and is increasing",
    choice3: "Premature infants have a higher morbidity and mortality rates",
    choice4: "Prematurity is the most common cause of neonatal mortality",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q2. Which statement about respiratory distress syndrome (RDS) in newborns is false?",
    choice1: "Has approximately 60% incidence in infants born at <28 weeks gestational age",
    choice2: "Has approximately 30% incidence in infants born at <28-34 weeks gestational age",
    choice3: "Has <5% incidence in infants born at >34 weeks gestational age",
    choice4: "Never occurs in full term infants",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q3. Which statement about fetal growth restriction (FGR, or intrauterine growth retardation) is correct?",
    choice1: "FGR can be divided into 3 main groups: fetal, placental and maternal causes",
    choice2: "The most common fetal causes are chromosomal disorders, congenital malformations and congenital TORCH group infections (toxoplasmosis, other infections, rubella, cytomegalovirus, herpes simplex)",
    choice3: "The most common placental cause of uteroplacental insufficiency and confined placental mosaicism",
    choice4: "The most common maternal causes are preeclampsia, chronic hypertension, inherited thrombophilia, inherited hypercoagulability and behavioural causes (heavy smoking, alcohol consumption, drug use)",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q4. Which statement(s) about the consequences of maternal smoking suring pregnancy are correct?",
    choice1: "Associated with a higher incidence of spontaneous abortion",
    choice2: "Associated with a higher incidence of premature labour",
    choice3: "Associated with lower birth weight",
    choice4: "Associated with a higher incidence of sudden infant death syndrome (SIDS)",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q5. Which statement about FGR (intrauterine growth restriction) is false? ",
    choice1: "FGR can be divided in symmetric and asymmetric (i.e. relative sparing of the brain) types",
    choice2: "Placental causes tend to result in asymmetric FGR, as growth restriction generally occurs later in gestation due to limited nutrition or oxygenation",
    choice3: "Fetal causes usually result in symmetric FGR",
    choice4: "FGR is rarely associated with long-term morbidity, as postnatal growth can compensate",
	  choice5: "None of the above",
    answer: 4
  },
  {
    question: "Q6. Which statement about the fetal consequences of maternal diabetes is false?",
    choice1: "Fetal pancreas usually shows a marked increase in islet tissue and B-cells",
    choice2: "Fetal macrosomia is common due to fetal hyperinsulinemia secondary to maternal hyperglycemia",
    choice3: "The placenta is almost always enlarged due to fetal hyperinsulinemia secondary to maternal hyperglycemia",
    choice4: "The incidence of major malformations is ~6-10%",
	choice5: "None of the above",
    answer: 3
  },
  {
    question: "Q7. Which is the least common cause of death in the first year of life?",
    choice1: "SIDS",
    choice2: "Congenital anomalies",
    choice3: "Sequelae of prematurity and low birth weight",
    choice4: "Malignancies",
	choice5: "Trauma or accident",
    answer: 4
  },
  {
    question: "Q8. Which statements about Chiari II (Arnold Chiari) malformation are correct?",
    choice1: "The cerebellar vermis is caudally displaced into the upper cervical spinal canal",
    choice2: "The fourth ventricle, midbrain, pons and medulla are all elongated and caudally displaced",
    choice3: "Most (95%) are associated with a lumbrosacral myelomeningocele",
    choice4: "The posterior fossa is not enlarged",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q9. Which statement about cystic fibrosis (mucoviscidosis) is false?",
    choice1: "Cystic fibrosis occurs due to abnormal function of a protein encoded by the cystic fibrosis transmembrane conductance regulator gene (CFTR) on chromosome 7q31.2",
    choice2: "Symptoms can appear at anytime from birth until adolescence",
    choice3: "All patients with biallelic CFTR mutations eventually develop classic cystic fibrosis",
    choice4: "Heterozygous carriers have a higher rate of pulmonary and pancreatic diseases than the general population",
	choice5: "None of the above",
    answer: 3
  },
  {
    question: "Q10. Which statement about cystic fibrosis (CF) is false?",
    choice1: "It is the most common lethal genetic disease among caucasians",
    choice2: "The carrier rate for North American caucasians is ~1 in 20",
    choice3: "Its transmission is autosomal recessive but there is much phenotyic variation due to multiple mutations in the CF gene as well as effects of modifier geners",
    choice4: "Median life expectancy for North American patients with CF is approximately 40 years",
	choice5: "None of the above",
    answer: 5
  },
  {
    question: "Q11. Which pathological finding is not highly characteristic of cystic fibrosis (CF)?",
    choice1: "Nasal polyps containing large cystic glands with inspissated luminal secretions and a paucity of eosinophils",
    choice2: "Sweat gland morphologic abnormalities",
    choice3: "Azoospermia and infertility, often with congenital bilateral absence of the vas deferens",
    choice4: "Meconium ileus",
	choice5: "None of the above",
    answer: 2
  },
  {
    question: "Q12. Pancreatic abnormalities characteristic of cystic fibrosis include which of the following?",
    choice1: "Small pancreatic ducts plugged with mucus and dilatation of exocrine glands (early)",
    choice2: "Near total atrophy and fibrosis of the exocrine pancreas",
    choice3: "Squamous metaplasia of the pancreatic duct epithelium due to malabsorption of vitamin A",
    choice4: "Pancreatic islets preserved within a fibrofatty stroma",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q13. Which statement about gastrointestinal and hepatic findings in cystic fibrosis (CF) is false?",
    choice1: "Meconium ileus is seen in 5-10% of patients at or near the time of birth",
    choice2: "Common hepatic findings in CF include bile ductular plugging and proliferation and portal inflammation",
    choice3: "Hepatic steatosis and cirrhosis are rare",
    choice4: "Liver disease is now one of the the most common causes of death in adult CF patients",
	choice5: "None of the above",
    answer: 3
  },
  {
    question: "Q14. The following statements concern the most common cause of death according to age. Which statement is correct?",
    choice1: "Birth-1 year: congenital anomalies",
    choice2: "3-6 months: SIDS",
    choice3: "1-4 years: injuries resulting from accidents",
    choice4: "5-14 years: injuries resulting from accidents",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q15. The following statements concern the most common cause of spontaneous abortion or still birth according to trimester. Which statement is incorrect?",
    choice1: "First trimester: chromosomal anomalies",
    choice2: "Second trimester: infection",
    choice3: "Third trimester: placental insufficiency/cord accident",
    choice4: "None of the above",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q16. Which birth defect has the highest prevalence?",
    choice1: "Spina bifida",
    choice2: "Cleft palate",
    choice3: "Omphalocele",
    choice4: "Colonic atresia/stenosis",
	choice5: "Esophageal atresia/tracheo-esophageal fistula",
    answer: 2
  },
  {
    question: "Q17. Which of the following statements about Dandy-Walker malformations are correct?",
    choice1: "There is hydrocephalus",
    choice2: "There is cystic dilatation of the fourth ventricle",
    choice3: "The cerebellar vermis is hypoplastic or absent",
    choice4: "There is a large posterior fossa and elevation of the tentorium",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q18. Which conditions support a diagnosis of diabetic embyopathy in the infant of a diabetic mother?",
    choice1: "Single umbilical artery",
    choice2: "Sacral agenesis, caudal regression, sirenomelia and neural tube defects",
    choice3: "Cardiac ventricular septal defects and transposition of the great vessels",
    choice4: "Meconium ileus",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q19. Which statements about omphalocele are true?",
    choice1: "It is a type of abdominal wall defect allowing intestines, liver or other organs to protrude",
    choice2: "Protrusion is through the base of the umbilical cord",
    choice3: "Protruding viscera are normally covered by a membrane",
    choice4: "It has an association with Beckwith-Wiedeman syndrome and chromosomal abnormalities",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q20. Which statements about gastroschisis are false?",
    choice1: "It is a type of abdominal wall defect allowing intestines, liver or other organs to protrude",
    choice2: "Protrusion is lateral to (usually to the right) and does not involve the umbilical cord; there is no membranous covering of viscera",
    choice3: "It has an association with Beckwith-Wiedeman syndrome",
    choice4: "It can be diagnosed by histologic examination of the placenta",
	choice5: "None of the above",
    answer: 3
  },
  {
    question: "Q21. Hazards of premature delivery include which of the following?",
    choice1: "Hyaline membrane disease (neonatal respiratory distress syndrome)",
    choice2: "Necrotizing enterocolitis",
    choice3: "Sepsis",
    choice4: "Germinal matrix hemorrhage and intraventricular hemorrhage",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q22. Major risk factors for premature delivery include which of the following?",
    choice1: "Preterm premature rupture of placental membranes",
    choice2: "Intrauterine infections",
    choice3: "Uterine abnormalities (fibroids, cervical incompetence)",
    choice4: "Multiple gestation (e.g. twin pregnancy)",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q23. What is the best way to properly diagnose cystic fibrosis?",
    choice1: "Sweat test with elevated chloride concentrations",
    choice2: "Sweat test with persistently elevated chloride concentrations",
    choice3: "Sequencing the patient's CFTR gene",
    choice4: "A positive newborn screening test, meconium ileus at birth and an appropriate family history",
	choice5: "Cystic fibrosis is a clinical diagnosis",
    answer: 3
  },
  {
    question: "Q24. Glycogenoses (glycogen storage diseases) include at least 10 inherited disorders, primarily characterized by glycogen accumulation in the liver, heart and skeletal muscle. Almost all types are autosomal recessive. Which of the following statements are true about types of glycogensoses?",
    choice1: "Type IA (von Gierke disease) is due to glucose-6-phosphatase deficiency and characterized by hepatomegaly, hypoglycemia and normal mental development and is compatible with long life",
    choice2: "Type II (Pompe disease) is a lysosomal storage disease in which glycogen accumulates in most organs and in the most common type, death via heart failure occurs before Age 2",
    choice3: "Type IV (Andersen disease) is very rare and due to the absence of a branching enzyme, which results in the accumulation of amylopectin (an abnormal, toxic form of glycogen) in the liver, children usually die by the age of 2-4 from hepatic cirrhosis but can be cured by a liver transplant",
    choice4: "Type V (McArdle disease) is characterized by the accumulation of glycogen in skeletal muscle due to muscle phosphorylase deficiency resulting in muscle spasms during exercise",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q25. Which statements about small round blue cell tumour (SRBCT) of childhood are true?",
    choice1: "SRBCT of childhood is a descriptive category of malignant pediatric neoplasm",
    choice2: "SRBCT is characterized by the presence of morphologically poorly differentiated cells with high nuclear-cytoplasmic ratios",
    choice3: "Correct identification of the specific tumour is important for therapy purposes",
    choice4: "Immunohistochemistry, cytogenetics, fluorescence in situ hybridization (FISH) and molecular studies are needed for confirmation of the diagnosis",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q26. Which statement about Langerhans cell histiocytosis (LCH) is false?",
    choice1: "LCH is a clonal proliferative disorder",
    choice2: "LCH can be focal with a self-limiting course",
    choice3: "LCH can be systemic with an aggressive course involving multiple organs",
    choice4: "Birbeck granules are found by electron microscopy in Langerhans cell",
	choice5: "None of the above",
    answer: 5
  },
  {
    question: "Q27. Which statement about neuroblastoma is false?",
    choice1: "Neuroblastoma is the most common extracranial solid tumour in childhood",
    choice2: "Most neuroblastoma occurs sporadically (1-2% are familial)",
    choice3: "Germline mutations in the anaplastic lymphoma kinase (ALK) gene are a major cause of familial predisposition to neuroblastoma",
    choice4: "Opsoclonus-myoclonus ataxia syndrome is associated with neuroblastoma",
	choice5: "Screening for neuroblastoma has improved overall mortality rates",
    answer: 5
  },
  {
    question: "Q28. Which statement about anaplastic large cell lymphoma (ALCL) is false?",
    choice1: "Most pediatric cases are null cell immunophenotype",
    choice2: "Most pediatric cases are ALK positive and have the translocation t(2;5)",
    choice3: "CD30 is positive in both adult and pediatric ALCL",
    choice4: "Morphological variants include pleomorphic, sarcomatoid, histiocyte rich and small cell variant",
	choice5: "It affects patients of all ages",
    answer: 1
  },
  {
    question: "Q29. Which statement about pediatric renal tumours is false?",
    choice1: "The most common type of renal cell carcinoma in children is Xp11.2 translocation associated renal cell carcinoma",
    choice2: "Clear cell sarcoma of the kidney has a reciprocal translocation t(12,22)(q13;q12), reslting in the fusion of EWSR1 and ATF1 in >90% of cases",
    choice3: "Congenital mesoblastic nephroma, the classic form, is histologically and cytogenetically identical to infantile fibrosarcoma",
    choice4: "The cellular type of congenital mesoblastic nephroma is histologically and cytogenetically identical to infantile fibrosarcoma",
	choice5: "None of the above",
    answer: 2
  },
  {
    question: "Q30. Which statement about Wilms tumour is false?",
    choice1: "Some Wilms tumours (5-10%) involve both kidneys",
    choice2: "Most patients with Wilms tumour are associated with congenital malformation syndromes, including WAGR syndrome (Wilms tumour, aniridia, genital anomalies and mental retardation), Denys-Drash syndrome and Beckwidth-Wiedeman syndrome",
    choice3: "The presence of anaplasia correlates with TP53 mutations and emergence of resistance to chemotherapy",
    choice4: "Presence of histological anaplasia is a potent marker of adverse prognosis",
	choice5: "Gain of function mutation of gene encoding B-catenin is found in 10% of sporadic Wilms tumours",
    answer: 2
  },
  {
    question: "Q31. Which statement about pediatric spindle cell tumour (PSCT) is false?",
    choice1: "Superficial PSCT is often excised while deep PSCT is assessed by incisional or core biopsies",
    choice2: "The main objectives for the pathologist are to establish the pathological diagnosis, assess margins, harvest tissue for biological investigations (pathologic-genetic-prognostic information)",
    choice3: "PSCT is categorized as benign, intermediate (locally recurrent, rarely metastasizing) and malignant",
    choice4: "Fibrous hamartoma of infancy is considered a borderline malignancy",
	choice5: "Nodular fasciitis can have rearrangements of USP6",
    answer: 4
  },
  {
    question: "Q32. Which statement about inflammatory myofibroblastic tumour (IMT) is false?",
    choice1: "It is a neoplasm composed of spindle cells accompanied by a lymphoplasmacytic infiltration",
    choice2: "Half (50%) of cases have clonal rearrangement of ALK gene at 2p23",
    choice3: "Immunohistochemistry reveals activit with smooth muscle actin and desmin",
    choice4: "IMT is considered a benign tumour",
	choice5: "Some patients have fever, night sweats, weight loss and malaise, probably related to secretion of cytokines (interleukin 6)",
    answer: 4
  },
  {
    question: "Q33. Which statement about infantile fibrosarcoma is false?",
    choice1: "It affects children <2 years of age",
    choice2: "It has the ETV6-NTRK3 gene fusion t(12;15)(p13;q25)",
    choice3: "The histological and cytogenetic features are similar to cellular congenital mesoblastic nephroma",
    choice4: "It is always present at birth",
    choice5: "The principal sites of involvement are the extremities",
    answer: 4
  },
  {
    question: "Q34. Which of the following statements about congenital pulmonary airway malformation (CPAM) is false?",
    choice1: "CPAM is a hamartomatous lesion of the lung that can be separated into 5 major types: type 0 to IV",
    choice2: "CPAM type I (larger cysts) account for 65% of cases",
    choice3: "CPAM type II (medium cysts) can be associated with other congenital anomalies",
    choice4: "CPAM type III (small cysts) accounts for 5% of cases",
    choice5: "CPAM is identical to congenital cystic adenomatoid malformation (CCAM)",
    answer: 5
  }
  

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 34;

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
    return window.location.assign("c17pedsend.html");
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

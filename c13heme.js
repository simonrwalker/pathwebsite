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
	question: "Q1. Which of the following is NOT classified as a microcytic anemia?",
    choice1: "Iron deficiency",
    choice2: "Thalassemia",
    choice3: "Anemia of chronic disease",
    choice4: "Aplastic anemia",
	choice5: "Sideroblastic anemia",
    answer: 4
  },
  {
    question: "Q2. Whcih of the following anemias will NOT show an increased reticulocyte count?",
    choice1: "Fanconi anemia",
    choice2: "Hemolytic anemia",
    choice3: "Hemorrhagic anemia",
    choice4: "Partially treated folic acid deficiency",
	choice5: "Glucose-6-phophate dehydrogenase (G6PD) deficiency",
    answer: 1
  },
  {
    question: "Q3. Which of the following does NOT demonstrate Burr cells in a blood smear?",
    choice1: "Acute renal failure",
    choice2: "Bleeding ulcer",
    choice3: "Myelofibrosis",
    choice4: "Gastric carcinoma",
	choice5: "Pyruvate kinase deficiency",
    answer: 3
  },
  {
    question: "Q4. Spherocytes may appear with all of the following except?",
    choice1: "Hemoglobin C disease",
    choice2: "Transfusion",
    choice3: "Autoimmune hemolytic anemia",
    choice4: "Burns",
	choice5: "ABO incompatibility",
    answer: 1
  },
  {
    question: "Q5. Which condition is NOT usually associated with the presence of schistocytes?",
    choice1: "Thrombotic throbocytopenic purpura",
    choice2: "Hemolytic uremic syndrome",
    choice3: "Severe burns",
    choice4: "Disseminated intravascular coagulation",
	choice5: "Hereditary elliptocytosis",
    answer: 5
  },
  {
    question: "Q6. Rouleaux formation is seen in all the following except?",
    choice1: "Paraproteinemia",
    choice2: "Multiple myeloma",
    choice3: "Hereditary spherocytosis",
    choice4: "Diabetes mellitus",
	choice5: "Acute and chronic inflammation",
    answer: 3
  },
  {
    question: "Q7. Which condition does NOT show target cells in a peripheral blood smear?",
    choice1: "Thalassemia",
    choice2: "Iron deficiency anemia",
    choice3: "Liver disease",
    choice4: "Megaloblastic anemia",
	choice5: "Hemoglobin C disease",
    answer: 4
  },
  {
    question: "Q8. Ovalocytes are seen in all the following conditions except?",
    choice1: "Thalassemia",
    choice2: "Iron deficiency anemia",
    choice3: "Folate deficiency",
    choice4: "Chronic liver disease",
	choice5: "Sideroblastic anemia",
    answer: 5
  },
  {
    question: "Q9. Which of the following is NOT associated with stomatocytes in a peripheral blood smear?",
    choice1: "Myelofibrosis",
    choice2: "Immune hemolytic anemia",
    choice3: "Rh null syndrome",
    choice4: "Chronic liver disease",
	choice5: "Erythrocytotoxic agents",
    answer: 1
  },
  {
    question: "Q10. Which of the following conditions is NOT usually associated with teardrop cells?",
    choice1: "Splenectomy",
    choice2: "Aplastic anemia",
    choice3: "Myelofibrosis",
    choice4: "Thalassemia",
	choice5: "Metastatic bone marrow",
    answer: 2
  },
  {
    question: "Q11. Acanthocytes are typically seen in all of the following conditions except?",
    choice1: "Abetalipoproteinemia",
    choice2: "Chronic alcoholism",
    choice3: "Sickle cell anemia",
    choice4: "Severe liver disease",
	choice5: "Splenectomy",
    answer: 3
  },
  {
    question: "Q12. Which of the following conditions may not show t(9;22)?",
    choice1: "Acute myeloid leukemia",
    choice2: "Chronic myelogenous leukemia",
    choice3: "Acute B-lymphoblastic leukemia/lymphoma",
    choice4: "Acute T-lymphoblastic leukemia/lymphoma",
	choice5: "All of the above",
    answer: 4
  },
  {
    question: "Q13. Which of the following statements about chronic myelogenous leukemia (CML) is NOT correct?",
    choice1: "BCR-ABL1 fusion is the most important factor in pathogenesis in CML",
    choice2: "Tyrosine kinase inhibitors are the main treatment modality in treatment of CML",
    choice3: "Increased blast percentage >10% but <20% is the only diagnostic criteria for progression of CML into accelerated phase",
    choice4: "CML cases with normal cytogenetic studies may show BCR-ABL1 fusion gene by reverse transcription polymerase chain reaction (RT-PCR)",
	choice5: "Transformed CML cases are associated with altered TP53, MYC or AML1/EVI1 genes",
    answer: 3
  },
  {
    question: "Q14. Which of the following statements about polycythemia vera (PV) is NOT correct?",
    choice1: "The annual incidence of PV in western countries is higher than in Japan and East Asia",
    choice2: "Most PV patients (>95%) demonstrate subnormal erythropoietin (EPO), endogenous erythroid colony (EEC) or JAK2 matuations",
    choice3: "Most PV cases demonstrate sufficient morphological features, even in the early prepolycythemic stage",
    choice4: "Most PV cases (>95%) show no evidence of stainable iron in bone marrow aspirate and biopsy",
	choice5: "Later myelofibrotic stages of PV are defined by progressive erythropoiesis and decreased megakaryocytic proliferation",
    answer: 5
  },
  {
    question: "Q15. Which of the following statements is NOT applicable to primary myelofibrosis (PMF)?",
    choice1: "The prefibrotic stage of PMF is characterized by hypercellular marrow with atypical megakaryocytic proliferation",
    choice2: "The fibrotic stage of PMF is associated with the presence of frequent teardrop red cells in peripheral blood",
    choice3: "The prefibrotic stage of PMF is associated with the presence of frequent teardrop red cells in peripheral blood",
    choice4: "Marked increase in bone marrow reticulin fibrosis and intravascular hematoipoeisis are characteristic morphological findings seen in PMF",
	choice5: "Atypical megakaryocytes with cloud-like nuclei and extramedullary hematopoieisis are common features of PMF",
    answer: 3
  },
  {
    question: "Q16. Which of the following statements is NOT applicable to essential thrombocythemia (ET)?",
    choice1: "Persistent marked thrombocytosis >450 E9/L is a diagnostic feature of ET, especially when it is supported by the presence of JAK2 mutation",
    choice2: "Some ET cases with marked thrombocytosis are associated with chromosome 3 abnormalities",
    choice3: "Bone marrow biopsy may be helpful to exclude other myeloid neoplasms presenting with thrombocytosis - e.g. myelodysplastic syndrome (MDS) with del (5q) or refractory anemia with ringed sideroblasts and thrombocytosis (RARS-T)",
    choice4: "Proliferation of giant megakaryocytic forms displaying staghorn lobulated nuclei is a characteristic feature of ET",
	choice5: "ET cases demonstrate JAK2 V617F mutation (40-50%) and/or CALR mutation (20%) or MPL mutation (5%)",
    answer: 2
  },
  {
    question: "Q17. Which of the following statements is NOT applicable to chronic myelomonocytic leukemia (CMML)?",
    choice1: "Presence of persistent monocytosis (> 1.0 E9/L) with unknown cause for at least 3 months is the first precondition for the diagnosis of CMML",
    choice2: "CMML cases may demonstrate mild to moderate bone marrow dysplasia",
    choice3: "CMML cases with eosinophilia associated with t(5;12) do not require further molecular or genetic testing for subclassification",
    choice4: "Extramedullary involvement of splenic red pulp, skin, hepatic sinusoids and lymph nodes may be seen with CMML",
	choice5: "Nodular proliferation of plasmacytoid dendritic cells (plasmacytoid monocytes) is a morphological feature seen in CMML cases",
    answer: 3
  },
  {
    question: "Q18. Which of the following statements about myelodysplastic syndrome (MDS) is NOT correct?",
    choice1: "Dysplastic megakaryocytes and dyserythropoiesis may be seen with exposure to chemo agents, viral infections, toxins and congenital disorders",
    choice2: "With the avialability of SF3B1 mutation, ringed sideroblasts are not required for the diagnosis of refractory anemia with ringed sideroblasts (RARS)",
    choice3: "The clinical significance of presence of Auer rods in MDS cases with <5% blasts is unknown",
    choice4: "Pelger-Huet neutrophils may be seen in MDS as well as nonneoplastic conditions",
	choice5: "Approximately 10% of MDS cases may demonstrate hypoplastic marrow or bone marrow fibrosis",
    answer: 2
  },
  {
    question: "Q19. Which of the following statements about acute myeloid leukemia (AML) with recurrent genetic abnormalities is NOT correct?",
    choice1: "All myeloid neoplasms with t(8;21)(q22;q22), in(16)(p13.1;q22) and t(15;17(q22;q12) regardless of blast count are classified as AML",
    choice2: "Blasts in AML with t(8;21)(q22;q22) usually demonstrate abundant granular cytoplasm with prominent perinuclear halo and increased eosinophilic precursors",
    choice3: "All myeloid neoplasms with t(9;11)(p23;q34), inv(3)(q21;q26.2) and t(3;3)(q21;q26.2), regardless of blast count, are also diagnosed with AML",
    choice4: "AML cases inv(16)(p13.1;q22) usually demonstrate myelomonocytic features with variable number of eosinophilic precursors with large eosinophilic granules",
	choice5: "Acute promyelocytic leukemia (APL) cases with t(15;17) PML-RARA are sensitive to treatment with all trans-retinoic acid (ATRA) and expression of CD56 is associated with less favourable prognosis",
    answer: 3
  },
  {
    question: "Q20. Which of the following statements is NOT applicable to variants of AML?",
    choice1: "Most AML cases with myelodysplasia-related changes have a history of previous cytotoxic therapy",
    choice2: "On the 2016 WHO revised classification, most of the previously diagnosed acute erythroleukemia cases (erythroid/myeloid subtype) will be categorized as MDS-RAEB2",
    choice3: "Therapy related myeloid neoplasms, including t-AML/t-MDS or t-AML/t-MDS/t-MPN, account for 10-20% of AML cases and are usually correlated to a previous treatment with alkylating agents/radiation therapy",
    choice4: "Case of AML with minimal differntiation presenting with medium size agranular blasts may require immunophenotypic studies to be distinguished from acute lymphoblastic leukemia (ALL) or megaloblastic leukemia",
	choice5: "AML with maturation cases account for 10% of AML cases and frequently display Auer rods. Promyelocytes, myelocytes and neutrophils account for at least 10% of bone marrow cells",
    answer: 1
  },
  {
    question: "Q21. Which immunophenotypic marker is not usually present on immature stem cells or early progenitor/precursor lymphoid blasts?",
    choice1: "TdT",
    choice2: "CD34",
    choice3: "CD1a",
    choice4: "CD10",
	choice5: "CD68",
    answer: 5
  },
  
  {
    question: "Q22. B-lymphoblastic leukemia/lymphoma is the most common type of acute leukemia in children. What clinical and cytogenetic/molecular factors adversely affect the prognosis for children with this disease?",
    choice1: "Age <2 years and > 10 years",
    choice2: "WBC count at presentation > 100 000",
    choice3: "MLL gene aberrations",
    choice4: "Presence of t(9;22)",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q23. Which of the following statements is NOT applicable to B-lymphoblastic leukemia/lymphoma (B-ALL)?",
    choice1: "Many treatment protocols consider 25% blast count in bone marrow as a cutoff for defining this neoplasm as acute lymphoblastic leukemia",
    choice2: "B-ALL is most common in children and 75% of cases occur in children under 6 years of age",
    choice3: "The most common form of extramedullary involvement is mediastinal mass",
    choice4: "Patients with B-lymphoblastic lymphoma without leukemia are usually asymptomatic and most have a limited stage disease",
	choice5: "B-ALL has a good prognosis and >95% of children with ALL show complete remission",
    answer: 3
  },
  {
    question: "Q24. Which of the following statements about T-lymphoblastic leukemia/lymphoma (T-ALL) is NOT correct?",
    choice1: "T-ALL cases account for 15% of childhood ALL and are more common in adolescent males",
    choice2: "T-ALL cases are usually present with high leukocyte counts; however, the diagnosis should be avoided when blasts are <20%. Compared to B-ALL trilineage hematopoiesis is relatively spared",
    choice3: "T-ALL cases with hyperdiploid chromosomes are commonly seen among older children and are associated with a very favourable prognosis",
    choice4: "T-ALL cases are usually TdT positive and express cytoplasmic CD3 with frequent coexpression of CD4 and CD8 (thymocyte T cell immunophenotype)",
	choice5: "T-ALL in childhood is a high risk disease and no favourable subtypes with recurrent genetic abnormalities have been recognized for this entity",
    answer: 3
  },
  {
    question: "Q25. Which of the following immunophenotypic features are NOT seen with neoplastic plasma cells?",
    choice1: "Expression of CD138, CD38, EMA, MUM1",
    choice2: "Expression of cyclin D1/D3",
    choice3: "Monotypic immunoglobulin light chain restriction",
    choice4: "Aberrant expression of CD56 and CD117",
	choice5: "Absence of CD45/CD20/CD43",
    answer: 5
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
    return window.location.assign("c13hemeend.html");
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

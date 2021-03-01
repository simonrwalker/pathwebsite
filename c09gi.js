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
	question: "Q1. In a patient with endoscopic evidence of replacement of squamous mucosa by glandular mucosa, a definitive diagnosis of Barrett esophagus can only be made when the esopahgeal biopsy shows?",
    choice1: "Junctional mucosa",
    choice2: "Gastric cardia-type mucosa",
    choice3: "Columnar cells with periodic acid-Schiff (PAS) positive mucin",
    choice4: "Goblet cells with acidic mucin",
	choice5: "Villous mucosa surface with low grade dysplasia",
    answer: 4
  },
  {
    question: "Q2. Epidermal growth factor receptor (EGFR) inhibitors (cetuximab and panitumumab) are an effective therapy for EGFR positive colorectal cancer when?",
    choice1: "The tumour is negative for both KRAS and BRAF mutations",
    choice2: "The tumour is positive for both KRAS and BRAF mutations",
    choice3: "The tumour is negative for KRAS mutation but positive for BRAF mutation",
    choice4: "The tumour is negative for BRAF mutation but positive for KRAS mutation",
	choice5: "The tumour is positive for CDH1 mutation",
    answer: 1
  },
  {
    question: "Q3. The criteria for testing for the CDH1 mutation from the International Gastric Cancer Linkage Consortium include?",
    choice1: "2 or more cases in first or second degree relatives, at least 1 diagnosed before age 50",
    choice2: "3 or more documented cases in first or second degree relatives, independent of age of diagnosis",
    choice3: "Diffuse gastric cancer before age 40 without a family history",
    choice4: "Families with diagnoses of both lobular breast carcinoma and diffuse gastric cancer, with 1 case before age 50",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q4. In a family at risk for hereditary diffuse gastric carcinoma, prophylactic total gastrectomy is recommended for CHD1 mutation-positive family members?",
    choice1: "Before age 20",
    choice2: "After age 20",
    choice3: "After age 30",
    choice4: "Before age 30",
	choice5: "After age 40",
    answer: 2
  },
  {
    question: "Q5. The following statements about colon cancer arising via the microsatellite instability pathway are true except?",
    choice1: "All hereditary nonpolyposis colorectal cancer (HNPCC AKA Lynch syndrome) cases are due to a germline mutation in 1 of the 4 mismatch repair gemes (MSH2, MLH1, MSH6 or PMS2) or the TACSTD1 regulatory gene",
    choice2: "Sessile serrated adenoma is the precursor lesion for the malignancy",
    choice3: "The tumour is frequently on the right side with Crohn-like peritumour lymphocytes, expansile growth and mucin production",
    choice4: "KRAS and BRAF mutation never occur in this type of tumour",
	choice5: "MSI-H tumours respond to topoisomerase I inhibitor irinotecan therapy",
    answer: 4
  },
  {
    question: "Q6. A 29-year-old female presents with weight loss, fatigue and diarrhea. She undergoes endoscopy and a biopsy specimen from the duodenum is obtained. After biopsy, the patient is put on a special diet (excluding wheat and rye). What is the characteristic feature of her biopsy?",
    choice1: "Cryptitis and crypt abscess",
    choice2: "Noncaseating granulomas",
    choice3: "Foamy macrophages in the lamina propria",
    choice4: "Villous shortening and intraepithelial lymphocytosis",
	choice5: "Gastric metaplasia of mucosal epithelium",
    answer: 4
  },
  {
    question: "Q7. A 72-year-old male was treated within the last 2 weeks with tazobactam/piperacillin for community acquired pneumonia. He develops severe diarrhea and positive stool testing for Clostridium difficile toxin. What histologic features would you expect to see in his colon biopsy?",
    choice1: "Acute self-limited colitis",
    choice2: "Ischemic colitis",
    choice3: "Pseudomembranous colitis",
    choice4: "Caseating granulomas with mycobacterial infection",
	choice5: "Lymphocytic colitis",
    answer: 3
  },
  {
    question: "Q8. A 60-year-old male presents with a 3 month history of dyspepsia and weight loss. Endoscopy shows thickened gastric antral mucosa with no mass. Histology shows diffuse lymphoplasmacytic inflammation and H pylori. After antibiotic and PPI treatment, repeat biopsy shows unremarkable gastric mucosa. What was the original diagnosis?",
    choice1: "Active gastritis",
    choice2: "Chronic gastritis",
    choice3: "Autoimmune gastritis",
    choice4: "Mucosa associated lymphoid tissue due to severe H. pylori infection",
	choice5: "Diffuse large B cell lymphoma",
    answer: 4
  },
  {
    question: "Q9. A 30-year-old male presents with dysphagia, specifically reporting the sensation of food being stuck after it is swallowed. Endoscopy shows a series of rings along the entire length of the esophagus. A biopsy of the mid esophagus will likely show?",
    choice1: "Predominantly neutrophilic inflammation",
    choice2: "Predominantly lymphocytic inflammation",
    choice3: "Predominantly eosinophilic inflammation",
    choice4: "Intestinal metaplasia",
	choice5: "Fungal infections such as Candida",
    answer: 3
  },
  {
    question: "Q10. A 50-year-old male presents with progressive jaundice. On biopsy, the liver shows features of primary sclerosing cholangitis. Which of the following entities in the gastrointestinal tract is likely to coexist with the liver disease?",
    choice1: "Celiac disease",
    choice2: "Atrophic gastritis",
    choice3: "Crohn disease",
    choice4: "Ulcerative colitis",
	choice5: "Collagenous colitis",
    answer: 4
  },
  {
    question: "Q11. A 5-day-old infant presents with vomiting and a distended abdomen. X-rays of the abdomen show marked colonic dilatation with a narrowed rectosigmoid segment. A biopsy taken from the narrowed segment shows a complete absence of ganglion cells in the submucosa and in the muscle wall. The most likely diagnosis is?",
    choice1: "Congenital colonic atresia",
    choice2: "Necrotizing enterocolitis",
    choice3: "Hirshsprung disease",
    choice4: "Down syndrome",
	choice5: "Isiopathic intestinal pseudoobstruction",
    answer: 3
  },
  {
    question: "Q12. A 12-year-old boy presents with multiple colonic polyps. Histologically, all of the polyps show an overgrowth of nondysplastic epithelium on an arborizing smooth muscle core. The branching smooth muscle seems to derive from the muscularis mucosae. All of the following statements about this patient are correct except?",
    choice1: "The patient is liekly to have mucocutaneous pigmentation",
    choice2: "The patient is likely to have a germline mutation in the LKB1/STK11 tumour suppressor gene",
    choice3: "The polyp has no risk of progression to malignancy",
    choice4: "If this patient were female, she would have an increased risk of breast cancer and gynecological malignancy",
	choice5: "He has an increased risk of testicular malignancy",
    answer: 3
  },
  {
    question: "Q13. All of the following statements regarding gastrointestinal stromal tumours (GIST) are true except?",
    choice1: "The interstitial cell of Cajal s consideredthe cell of origin for the tumour",
    choice2: "A gain of function mutation in KIT or PDGFR gene may exist",
    choice3: "Only those tumours with a KIT mutation respond to Gleevec (imatinib) therapy",
    choice4: "Mitotic rate and tumour size are the 2 main features that determine the risk of aggresive behaviour",
	choice5: "Histologic criteria for benign and malignant GIST are identical in different parts of the gastrointestinal tract",
    answer: 5
  },
  {
    question: "Q14. An 18-month-old boy presents with acute abdominal pain resembling acute appendicitis. On surgery, the appendix is normal. At the antimesenteric side of the terminal ileum, a 5 cm blind pouch is found. The resected specimen shows ectopic gastric mucosa and ulceration of the mucosa within the pouch. Which of the following statements does not accurately describe the characteristics of this particular entity?",
    choice1: "It occurs in approximately 2% of the population",
    choice2: "It is generally present within 2 feet of the ileocecal valve",
    choice3: "It is twice as common in males",
    choice4: "It is most often symptomatic by age 2",
	choice5: "Only 2% of patients are ever symptomatic",
    answer: 5
  },
  {
    question: "Q15. A 35-year-old female undergoes an appendectomy for acute appendicitis. Within the tip of the resected appendix, there is a tumour composed of uniform nests of cells with 'salt and pepper' chromatin. which of the following statements regarding the tumour is correct?",
    choice1: "The tumour is often associated with carcinoid syndrome",
    choice2: "It is the most common type of appendiceal neoplasm",
    choice3: "It is uncommon in children",
    choice4: "It has a worse prognosis for patients than the same type of tumour in other parts of the gastrointestinal tract",
	choice5: "Tumour size has nothing to do with the risk of metastasis",
    answer: 2
  },
  {
    question: "Q16. A 19-year-old man has had abdominal pain and bloody diarrhea for 6 months. A biopsy of the colon shows mucosal architectural alteration with chronic inflammation, deep lymphoid aggregates and deep fissures extending into the muscularis propria. Multiple granulomas are identified within the lamina propria. Which of the following statements regarding this case is correct?",
    choice1: "This condition is commonly associated with primary sclerosing cholangitis",
    choice2: "The majority of patients are positive for perinuclear antineutrophilic cytoplasmic antibody",
    choice3: "Resection of the disease segment and anastomosis of the remaining healthy segments can cure the disease",
    choice4: "This is a disease exclusively involving the colon. The disease process does not usually involve other parths of the gastrointestinal tract",
	choice5: "Genetic factors are important in predisposing individuals to the disease",
    answer: 5
  },
  {
    question: "Q17. All of the following are inherited hamartomatous polyposis syndromes except?",
    choice1: "Cowden syndrome",
    choice2: "Familial juvenile polyposis",
    choice3: "Peutz-Jeghers polyposis",
    choice4: "Carney syndrome",
	choice5: "Basal cell nevus syndrome",
    answer: 4
  },
  {
    question: "Q18. The gross appearance of the gastric mucosa in Menetrier disease resembles which of the following?",
    choice1: "Fundic gland polyps",
    choice2: "Atrophic gastritis",
    choice3: "Hyperplastic polyps",
    choice4: "Zollinger-Ellison syndrome",
	choice5: "Inflammatory fibroid polyps",
    answer: 4
  },
  {
    question: "Q19. Patients with celiac disease are prone to which of the following types of lymphoma in the small intestine?",
    choice1: "Diffuse large B cell lymphoma",
    choice2: "T cell lymphoma",
    choice3: "Hodgkin lymphoma",
    choice4: "Mucosa-associated lymphoid tissue (MALT) lymphoma",
	choice5: "Follicular lymphoma",
    answer: 2
  },
  {
    question: "Q20. The most common site of amebic ulcers in the gastrointestinal tract is the...?",
    choice1: "Duodenum",
    choice2: "Ileum",
    choice3: "Cecum or ascending colon",
    choice4: "Transverse colon",
	choice5: "Sigmoid colon and rectum",
    answer: 3
  },
  {
    question: "Q21. Which of the following is the most common cause of segmental colitis confined to the sigmoid coln?",
    choice1: "Ulcerative colitis",
    choice2: "Crohn colitis",
    choice3: "Diverticular disease",
    choice4: "Ischemic colitis",
	choice5: "Cytomegalovirus (CMV) colitis",
    answer: 3
  },
  {
    question: "Q22. In the 2010 WHO classification, esophagogastric junctional (EGJ) carcinoma is defined as?",
    choice1: "Both squamous cell carcinoma and adenocarcinoma that straddle the EGJ",
    choice2: "Adenocarcinoma that cross the bulk of the tumour located at the EGJ",
    choice3: "Adenocarcinoma with the bulk of the tumour located at the EGJ",
    choice4: "A carcinoma located entirely above the EGJ but within 5 cm of the EGJ",
	choice5: "A carcinoma located entirely below the EGJ but within 5 cm of the EGJ",
    answer: 2
  },
  {
    question: "Q23. All of the following entities can show increased epithelial apoptosis except?",
    choice1: "Acitve ulcerative colitis",
    choice2: "Phospho soda bowel preparation",
    choice3: "An organ transplant patient using mycophenylate mofetil (MMF)",
    choice4: "Patient using nonsteroidal antiinflammatory drugs (NSAIDs)",
	choice5: "Acute graft-versus-host disease (GVHD)",
    answer: 1
  },
  {
    question: "Q24. When exaluating a low anterior resection (TME) specimen, which of the following statements is correct?",
    choice1: "A 'complete' specimen means the mesorectal surface has no defects",
    choice2: "A 'complete' specimen can have defects <5 mm deep",
    choice3: "A 'complete' specimen can have defects <10 mm deep",
    choice4: "A 'complete' specimen can have some coning as long as the coned surface is smooth",
	choice5: "If muscularis propria is exposed focally, the specimen should be called 'near complete'",
    answer: 2
  },
  {
    question: "Q25. If invasive carcinoma was found in a pedunculated polyp, which of the following histological features is not important in planning further therapy?",
    choice1: "Histological grade of the invasive component",
    choice2: "The depth of tumour invasion into the submucosa",
    choice3: "The presence of vascular invasion",
    choice4: "The presence of lymphatic invasion",
	choice5: "The distance of the invasive component of the resection margin",
    answer: 2
  },
  {
    question: "Q26. A 32-year-old woman presents to the ER with severe bloody diarrhea, abdominal pain , fever and abdominal distention. On X-ray, dilated loops of bowel are identified, particularly in the transverse colon. The patient undergoes total colectomy and histological sections show diffuse mucosal ulceration, focal early fissuring elcers, focal transmural inflammation and relative sparing of the rectum. What is the most likely diagnosis?",
    choice1: "Severe Crohn disease and colitis",
    choice2: "Fulminant ulcerative colitis",
    choice3: "Acute ischemic colitis",
    choice4: "Pseudomembranous colitis",
	choice5: "Severe infectious colitis by hemorrhagic E. coli",
    answer: 2
  },
  {
    question: "Q27. A 66-year-old white male presents with abdominal pain. On physical exam, he has multifocal peripheral lymphadenopathy and moderate splenomegaly. Colonoscopy reveals innumerable small polypoid lesions involving most of the colon. What is the most likely diagnosis on biopsy of the polyp?",
    choice1: "MALT lymphoma",
    choice2: "Mantle cell lymphoma",
    choice3: "Multiple tubular adenomas",
    choice4: "Primary follicular lymphoma of the gastrointestinal tract",
	choice5: "Hyperplastic polyposis",
    answer: 2
  },
  {
    question: "Q28. A screening endoscopy of a 65-year-old with a 20-year history of Crohn disease reveals a 7 mm polyp at the descending colon. Histologically, the polyp shows low grade dysplasia. The polyp is completely excised. Specimens from different parts of the colon and terminal ileum all show nearly normal mucosa without evidence of active or chronic inflammation or flat dysplasia. The most appropriate next step in the patient's management is?",
    choice1: "Total colectomy",
    choice2: "Left hemicolectomy",
    choice3: "Repeat colonoscopy in 3-5 years",
    choice4: "Repeat colonscopy in 3 months",
	choice5: "Increased dose of medication for Crohn disease",
    answer: 3
  },
  {
    question: "Q29. The designation N1c in the 8th edition of the AJCC staging manual for Colon and Rectum indicates which of the following scenarios?",
    choice1: "The deposit is >3 mm",
    choice2: "The contours of the deposit are smooth",
    choice3: "The contours of the deposit are irregular",
    choice4: "More than 4 lymph nodes contain metastatic cancer",
	choice5: "All sampled lymph nodes are negative, but there are tumour deposits in the subserosa, mesentery or nonperitonealized pericolic, perirectal/mesorectal tissue",
    answer: 5
  },
  {
    question: "Q30. The most important prognostic feature in low grade appendiceal mucinous neoplasm is?",
    choice1: "The grade of dysplasia in the tumour epithelium",
    choice2: "Whether there is mucin dissecting into the muscularis propria",
    choice3: "Whether there is mucinous epithelium in the extra-appendiceal mucin",
    choice4: "Whethet the margin of resection is involved",
	choice5: "Whether the musclaris mucosae has been breached by mucinous epithelium",
    answer: 3
  },
  {
    question: "Q31. Which of the following statements regarding the interpretation of microsatellite instability (MSI) immunohistochemistry data is NOT correct?",
    choice1: "Lack of nuclear staining indicates a positive result for MSI testing",
    choice2: "Loss of expression of MLH1 may be due to Lynch syndrome or methylation of the promoter region",
    choice3: "Eighty percent of sporadic MLH1 loss has KRAS mutation",
    choice4: "Loss of MSH2 expression essentially always implies Lynch syndrome",
	choice5: "Loss of MLH1 expression is the most common type detected",
    answer: 3
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
    return window.location.assign("c09giend.html");
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

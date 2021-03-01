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
	question: "Q1. Which cell type in the liver is mostly responsible for the development of hepatic fibrosis?",
    choice1: "Stem cell",
    choice2: "Hepatocyte",
    choice3: "Kupffer cell",
    choice4: "Fibroblast",
	choice5: "Stellate cell",
    answer: 5
  },
  {
    question: "Q2. A patient with aplastic anemia has required repeated blood transfusions for a number of years. She has developed chronic viral hepatitis. Which virus type is most likely the cause?",
    choice1: "Hepatitis A virus (HAV)",
    choice2: "Hepatitis B virus (HBV)",
    choice3: "Hepatitis C virus (HCV)",
    choice4: "Hepatitis D virus (HDV)",
	choice5: "Hepatitis E virus (HEV)",
    answer: 3
  },
  {
    question: "Q3. Which of the following is the most common clinical indication for liver biopsy in HBV?",
    choice1: "To grade the severity of inflammation",
    choice2: "To stage the degree of fibrosis",
    choice3: "To confirm HBV infection by HBsAg staining and confirm viral replication by HBcAg staining",
    choice4: "To rule out other superimposed diseases such as nonalcoholic fatty liver diseases",
	choice5: "To determine if there is active hepatitis in patients whose serological or biochemical data do not paint a clear picture of disease status",
    answer: 5
  },
  {
    question: "Q4. A 3-year-old girl was treated with acetylsalicylic acid (aspirin) at home for flu-like symptoms. After a few days, she became irritable. Shortly afterwards, she became lethargic and died in hospital. What histologic features are you most likely to find in the autopsy liver?",
    choice1: "Microvesicular fatty change with panacinar distribution",
    choice2: "Acute hepatitis with many acidophil bodies",
    choice3: "Cholestasis",
    choice4: "Giant mitochondria and Mallory bodies",
	choice5: "Portal and interface inflammation with many plasmacytes",
    answer: 1
  },
  {
    question: "Q5. A liver biopsy specimen showed distinct eosinophilic globules in periportal hepatocytes on periodic acid-Schiff (PAS) with diastase stain. All of the following about the patient are true EXCEPT?",
    choice1: "The spectrum of liver abnormalities in adult patients includes chronic hepatitis, cirrhosis and hepatocellular carcinoma",
    choice2: "Neonates and infants can present with giant cell hepatitis and a paucity of intrahepatic bile ducts",
    choice3: "The patient can have emphysema and pulmonary dysfunction",
    choice4: "The intracellular inclusions stain positively for a1-antitrypsin antibody",
	choice5: "The patient's a1-antitrypsin phenotype is most likely PiMM",
    answer: 5
  },
  {
    question: "Q6. An 18-year-old male with elevated liver enzymes, increased copper in the urine and Kayser-Fleisher rings on slit lamp eye exam will most likely have?",
    choice1: "A high serum level of anti-nuclear antibody and anti-smooth muscle antibody",
    choice2: "Glucose intolerance",
    choice3: "Degeneration of the putamen in the brain",
    choice4: "High serum ceruloplasmin level",
	choice5: "Low serum copper level",
    answer: 3
  },
  {
    question: "Q7. A 30-year-old male presented with progressive jaundice and elevated liver enzymes. Endoscopic retrograde cholangiopancreatography (ERCP) showed alternating segments of stenosis and dilatation. A liver biopsy showed an onionskin pattern of fibrosis around interlobular bile ducts. He also had developed chronic diarrhea. What do you expect a colonic biopsy to show?",
    choice1: "Crohn disease",
    choice2: "Microscopic colitis",
    choice3: "Bowel ischemia",
    choice4: "Pseudomembranous colitis",
	choice5: "Ulcerative colitis",
    answer: 5
  },
  {
    question: "Q8. When evaluating a biopsy of suspected primary biliary cirrhosis, which of the following findings would indicate probable overlap with autoimmune hepatitis?",
    choice1: "The patient is a middle-aged female witha  history of lupus nephritis",
    choice2: "The patient's serum antinuclear antibody level is elevated",
    choice3: "The biopsy shows significant ballooning degeneration and numerous acidophil bodies associated with high transaminases",
    choice4: "The portal tract contains many plasmacytes",
	choice5: "Lymphocytes fill the sinusoids in the periportal region of the lobule",
    answer: 3
  },
  {
    question: "Q9. Zone 3 necrosis associated with lymphocytic infiltration should raise concern for all the following entities except?",
    choice1: "Autoimmune hepatitis",
    choice2: "Drugs",
    choice3: "Transplant rejection",
    choice4: "Alcohol",
	choice5: "Chronic hepatitis",
    answer: 5
  },
  {
    question: "Q10. The single most important histologic feature on liver biopsy for establishing the diagnosis of extrahepatic biliary atresia in a neonate is?",
    choice1: "Cholestasis",
    choice2: "Giant cell hepatitis",
    choice3: "Portal inflammation",
    choice4: "Ductal proliferation",
	choice5: "Paucity of interlobular bile ducts",
    answer: 4
  },
  {
    question: "Q11. Which of the following statements about Mallory bodies is incorrect?",
    choice1: "Mallory bodies can be seen in both alcoholic and nonalcoholic steatohepatitis",
    choice2: "Mallory bodies can be seen in patients with cholestasis",
    choice3: "Mallory bodies in Wilson disease are associated with copper overload",
    choice4: "Mallory bodies contain degenerated mitochondria",
	choice5: "Mallory bodies contain cytokeratin 8 and 18",
    answer: 4
  },
  {
    question: "Q12. A 36-year-old woman with a history of long-term oral contraceptive use had a subcapsular mass resected from the right lobe of the liver. Histologically, the mass was composed of sheets and cords of cell resembling normal hepatocytes with abundant glycogen content. Thick walled vessels were scattered throughout the lesion, but no portal tracts or central veins were found. this tumour can be associated with which of the following?",
    choice1: "KRAS activation",
    choice2: "p53 mutation",
    choice3: "Jagged-1 mutation",
    choice4: "Hepatocyte nuclear factor-1a mutation",
	choice5: "C-myc mutations",
    answer: 4
  },
  {
    question: "Q13. Which of the following special stains is most helpful in the diagnosis of hepatocellular carcinoma?",
    choice1: "Reticulin",
    choice2: "Trichrome",
    choice3: "Iron",
    choice4: "PAS plus diatase",
	choice5: "Copper",
    answer: 1
  },
  {
    question: "Q14. All of the following statements about hepatocellular carcinoma are correct except?",
    choice1: "It can develop in noncirrhotic liver",
    choice2: "A single tumour can have different histologic patterns and grades in different areas",
    choice3: "The fibrolamellar variant is typically seen in young adults who have viral hepatitis or other well-defined risk factors",
    choice4: "Primary tumours resembling hepatocellular carcinoma (even with bile formation) can be found outside the liver, such as in the stomach, ovary and other sites",
	choice5: "Tumour cells can stain positive for CK7 and CK19",
    answer: 3
  },
  {
    question: "Q15. Carcinoma of the gallbladder is most commonly associated with?",
    choice1: "Chronic cholecystitis",
    choice2: "Cholelithiasis",
    choice3: "Cholesterolosis",
    choice4: "Porcelain gallbladder",
	choice5: "Sclerosing cholangitis",
    answer: 2
  },
  {
    question: "Q16. Which of the following statements regarding gallbladder carcinoma is incorrect?",
    choice1: "Elective cholecystectomy can be a preventative measure for gallbladder adenocarcinoma in some patients with gallstones and chronic cholecystitis",
    choice2: "Hyalinizing cholecystitis without calcifications is not associated with carcinoma",
    choice3: "The histological grading of gallbladder adenocarcinoma in the American Joint Committee on Cancer (AJCC) TNM classification system is based on the degree of glandular differentiation",
    choice4: "If high grade dysplasia is identified in the gallbladder, extensive sampling is warranted",
	choice5: "The gallbladder has ill-defined layers, therefore, the current staging protocols are problematic for early stage tumour",
    answer: 2
  },
  {
    question: "Q17. Cholangiocarcinoma is most commonly associated with?",
    choice1: "Primary biliary cirrhosis",
    choice2: "Primary sclerosing cholangitis",
    choice3: "Schistosomiasis",
    choice4: "Cholelithiasis",
	choice5: "Viral hepatitis",
    answer: 2
  },
  {
    question: "Q18. Graft-versus-host disease affecting the liver typically damages...?",
    choice1: "Hepatocytes",
    choice2: "Portal veins",
    choice3: "Central veins",
    choice4: "Arterials",
	choice5: "Interlobular bile ducts",
    answer: 5
  },
  {
    question: "Q19. A patient underwent a Whipple resection of a pancreatic carcinoma. During the operation, several whitish capsular nodules were found in the liver incidentally. On biopsy, a nodule showed collections of irregular dilated glands in fibrous stroma, with some of the glands containing inspissated bile. The most likely diagnosis is...?",
    choice1: "Metastatic adenocarcinoma",
    choice2: "Von Meyenburg complex (bile duct malformation)",
    choice3: "Bile duct adenoma",
    choice4: "Cholangiocarcinoma",
	choice5: "Biliary cystadenofibroma",
    answer: 2
  },
  {
    question: "Q20. In North America, the most important cause of chronic pancreatitis is?",
    choice1: "Alcohol",
    choice2: "Cholelithiasis",
    choice3: "Hereditary disease",
    choice4: "Malnutrition",
	choice5: "Hyperparathyroidism",
    answer: 1
  },
  {
    question: "Q21. A patient with obstructive jaundice underwent a Whipple resection. the resected pancreas showed extensive ductal centric plasmacyte infiltration. The plasmacytes most likely stain positively with?",
    choice1: "IgM",
    choice2: "IgG1",
    choice3: "IgG2",
    choice4: "IgG3",
	choice5: "IgG4",
    answer: 5
  },
  {
    question: "Q22. A 60-year-old man presents with weight loss, jaundice, back pain and elevated serum CA 19-9. Radiology and exploratory laparotomy showed a large mass located in the head of the pancreas and multiple omental nodules. A biopsy of the tumour showed invasive glands in a desmoplastic stroma. All of the following statements are correct except?",
    choice1: "The tumour glands stain positively for CK7 and CK19",
    choice2: "Greater than 85% of the tumour will have KRAS mutation",
    choice3: "The back pain is likely caused by perineural invasion",
    choice4: "This tumour is more common in developing countries and caused by chronic pancreatitis",
	choice5: "The 5-year survival rate for patients with this type of tumour is <5%",
    answer: 4
  },
  {
    question: "Q23. Which islet cell tumours are the most common and the least malignant?",
    choice1: "Insulinoma",
    choice2: "Gastrinoma",
    choice3: "Somatostatinoma",
    choice4: "Glucagonoma",
	choice5: "VIPoma",
    answer: 1
  },
  {
    question: "Q24. Which of the following histologic features is the most important in grading a pancreatic endocrine tumour and predicting its metastatic potential?",
    choice1: "Nuclear pleomorphism and cytological atypia",
    choice2: "Vascular invasion and capsular invasion",
    choice3: "Tumour size and type of hormone secreted",
    choice4: "Mitosis and tumour necrosis",
	choice5: "Genetic abnormality and aneuploidy",
    answer: 4
  },
  {
    question: "Q25. Which of the following statements about intraductal papillary mucnious neoplasms of the pancreas (IPMN) is not true?",
    choice1: "KRAS mutations and alterations of tumour suppressor genes (p53, p16, SMAD4/DPC4) play a role in the carcinogenesis",
    choice2: "They occur more frequently in males than females",
    choice3: "The survival rate is worse than for ductal carcinoma",
    choice4: "A large amount of mucous at the opening of the ampulla of Vater can be observed endoscopically",
	choice5: "Biological behaviour ranges from benign to borderline to malignant",
    answer: 3
  },
  {
    question: "Q26. Which of the following statements about mucinous cystic neoplasms of the pancreas is true?",
    choice1: "These tumours are all associated with a poor prognosis",
    choice2: "Genetic alterations of KRAS, p53 and SMAD4/DPC4 play a role in the pathogenesis",
    choice3: "They occur more frequently in males than females",
    choice4: "Obstructive jaundice is usually the first clinical presentation",
	choice5: "They are associated with von Hippel-Lindau syndrome",
    answer: 2
  },
  {
    question: "Q27. A 33-year-old female was found to have a cystic mass in the pancreas during a routine gynecological examination without obvious symptoms. The lesion was resected and histologically it showed solid nests of tumour cells with abundant small blood vessels. Cells located distant to the vessels were more degenerative with more viable tumour cells cuffing each blood vessel. Hyaline globules and nuclear grooves were found in some tumour cells. Which of the following statements regarding this lesion is incorrect?",
    choice1: "This tumour is more common in women than in men",
    choice2: "This is a biologically low grade tumour, and it will never metastasize",
    choice3: "The tumour cells stain positive for a1-antitrypsin",
    choice4: "The tumour cells often demonstrate abnormal nuclear B-catenin immunoexpression",
	choice5: "Occasionally, the tumour cells can stain positive for CD56 and synaptophysin",
    answer: 2
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 27;

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
    return window.location.assign("c15hpbend.html");
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

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
	question: "Q1. The injuries caused by shattered tempered glass (typically found on the face, shoulders and arms of occupants in motor vehicle collisions) are referred to as?",
    choice1: "Entrance wounds",
    choice2: "Stab wounds",
    choice3: "Petechiae",
    choice4: "Dicing",
	choice5: "Tardieu spots",
    answer: 4
  },
  {
    question: "Q2. A 30-year-old man dies suddenly on an airplane. At autopsy, he is found to have multiple homemade packets of white powder within his gastrointestinal tract. This decedent's terminal events were likely associated with?",
    choice1: "Hypertension and hyperthermia",
    choice2: "Joint pain and pulmonary nodules",
    choice3: "Pancytopenia",
    choice4: "Multiple liver abscesses",
	choice5: "Intravascular hemolysis",
    answer: 1
  },
  {
    question: "Q3. At autopsy, a 480 gram heart with an interventricular septum thickness of 2.8 centimeters was found. What is the most likely history with this finding?",
    choice1: "45-year-old man found next to a cut electrical wire with burns on the hand and foot",
    choice2: "90-year-old woman found dead in bed",
    choice3: "30-year-old woman with a history of intravenous drug use",
    choice4: "Newborn with cyanosis",
	choice5: "20-year-old man collapses at the end of hockey practice",
    answer: 5
  },
  {
    question: "Q4. A 22-year-old college student with no past medical history is found dead in a ditch next to a road leading from a local bar to his apartment. He is dressed in black clothing. Examination reveals bilateral tibial plateau and fibular neck fractures and a comminuted depressed skull fracture. What is the most likely circumstance surrounding his death?",
    choice1: "Ethanol toxicity",
    choice2: "Pedestrian-motor vehicle collision",
    choice3: "Myocardial infarction due to atherosclerotic cardiovascular disease",
    choice4: "Violent mugging",
	choice5: "Struck by lightning",
    answer: 2
  },
  {
    question: "Q5. An infant boy is found dead by his parents after his nap. Which of the following features would not be consistent with a diagnosis of sudden infant death syndrome (SIDS), as defined by the National Institute of Child Health and Human Development?",
    choice1: "Age less than 1 year",
    choice2: "No specific findings on complete autopsy",
    choice3: "Found on a soft, adult sized mattress with numerous blankets and pillows",
    choice4: "No explanation after review of the clinical history, including prenatal and perinatal history",
	choice5: "No other diagnosis or findings to account for the death",
    answer: 3
  },
  {
    question: "Q6. A 65-year-old man clutches his chest and collapses while shovelling snow. Resuscitation efforts are unsuccessful and he dies in the emergency department. On histologic examination of the lungs at autopsy, numerous hematolymphoid precursors and clear spaces are identified within the vessels. What does this finding represent?",
    choice1: "Bone marrow embolism due to resuscitation associated bone trauma",
    choice2: "Diffuse intravascular coagulation due to trauma from shovelling snow",
    choice3: "Fat embolism from long bone fracture",
    choice4: "Atherosclerotic emboli",
	choice5: "Foreign body reaction from inhalation of dust",
    answer: 1
  },
  {
    question: "Q7. All of the following conditions accelerate decomposition except?",
    choice1: "Hot environment",
    choice2: "Overweight decedent",
    choice3: "Lack of clothing",
    choice4: "Sepsis",
	choice5: "Hyperthermia",
    answer: 3
  },
  {
    question: "Q8. Which of the following defines cause of death and gives an appropriate example?",
    choice1: "The disease or injury that initiates the unbroken chain of events, that, within 1 year, ends in death; gunshot wound to the head",
    choice2: "The physiologic means by which an injury or disease exerts is effect; diffuse large B cell lymphoma",
    choice3: "The physiologic means by which an injury or disease exerts is effect; exsanguination",
    choice4: "The disease or injury that initiates the unbroken chain of events, that no matter the duration, ends in death; atherosclerotic cardiovascular disease",
	choice5: "The means by which the disease or injury occurs, accident",
    answer: 4
  },
  {
    question: "Q9. A 25-year-old man is caught in the crossfire of a gang shooting. He sustains a gunshot wound to the spine and becomes quadriplegic. Fifteen years later, while in the care of a nursing home, he succumbs to sepsis from a decubitus ulcer on his sacrum. What is the cause and manner of death?",
    choice1: "Gunshot wound to the spine; homicide",
    choice2: "Gunshot wound to the spine; accident",
    choice3: "Sepsis; natural",
    choice4: "Sepsis; accident",
	choice5: "Pressure sore; natural",
    answer: 1
  },
  {
    question: "Q10. A 19-year-old male is found dead in his secure apartment witha  single incised wound to the lateral neck with multiple hesitation marks surrounding the wound, which transects the jugular vein. What is the most likely mechanism and manner of death?",
    choice1: "Depression; natural",
    choice2: "Incised wound of neck; homicide",
    choice3: "Incised wound of neck; suicide",
    choice4: "Exsanguination; suicide",
	choice5: "Asphyxia; homicide",
    answer: 4
  },
  {
    question: "Q11. Tache noire refers to...?",
    choice1: "Retinal hemorrhages associated with blunt head trauma",
    choice2: "Linear discolouration of the eyes due to post-mortem drying",
    choice3: "Multiple small red-purple hemorrhages on the skin",
    choice4: "A charred area of the skin due to an electrical burn",
	choice5: "Skin changes associated with necrotic venom of a spider bite",
    answer: 2
  },
  {
    question: "Q12. A group of 4 male teenagers is found dead in a school maintenance closet. No obvious trauma is identified. However, a water jug containing bright green liquid residue is found near the bodies. On histology, oxalate crystals are identified in the renal tubules. What is the most likely toxic component of the liquid in the bottle?",
    choice1: "Ethanol",
    choice2: "Methanol",
    choice3: "Ethylene glycol",
    choice4: "Formaldehyde",
	choice5: "Gasoline",
    answer: 3
  },
  {
    question: "Q13. Cherry red lividity is classically associated with carbon monoxide poisoning. which of the following scenarios can also be associated with cherry red lividity?",
    choice1: "Hyperthermia",
    choice2: "Hypothermia",
    choice3: "Electrocution",
    choice4: "Arsenic poisoning",
	choice5: "Ethanol toxicity",
    answer: 2
  },
  {
    question: "Q14. The charred body of a 25-year-old man is found in the burned rubble of an abandoned house. The police investigation reveals the individual had gang affiliations and raises the possibility that he was killed prior to the fire. What findings indicate that the individual died as a result of the fire?",
    choice1: "Low carboxyhemoglobin, no soot in airways",
    choice2: "Pugilistic stance",
    choice3: "Epidural hematoma",
    choice4: "High carboxyhemoglobin, soot in the airways",
	choice5: "Multiple full and partial thickness skin splits",
    answer: 4
  },
  {
    question: "Q15. A naked man is running through traffic and is reported to have 'superhuman strength' when tackled. He collapses and dies suddenly. What history is compatible with this information?",
    choice1: "The introduction of a new medication for cardiovascular disease",
    choice2: "A long-standing history of depression",
    choice3: "Complaints of crushing chest pain and shortness of breath",
    choice4: "The use of cocaine",
	choice5: "The use of an organophosphate insecticide in his yard",
    answer: 4
  },
  {
    question: "Q16.  Which of the following accurately represents the mechanisms of heat loss by the body and their approximate proportion?",
    choice1: "Radiation 55-65%, Respiration and Evaporation 20%, Conduction and Convection 15%",
    choice2: "Radiation 55-65%, Respiration and Evaporation 15%, Conduction and Convection 20%",
    choice3: "Radiation 100%, Respiration and Evaporation 0%, Conduction and Convection 0%",
    choice4: "Radiation 20%, Respiration and Evaporation 55-65%, Conduction and Convection 15%",
	choice5: "Radiation 15%, Respiration and Evaporation 29%, Conduction and Convection 55-65%",
    answer: 1
  },
  {
    question: "Q17. Which of the following is a mechanism of death from fire?",
    choice1: "Inhalation of products of combustion",
    choice2: "Hypovolemic shock due to plasma loss from burn sites",
    choice3: "Secondary infection",
    choice4: "Rhabdomyolysis causing renal failure",
	choice5: "All of the above",
    answer: 5
  },
  {
    question: "Q18. Which of the following statements about malignant hyperthermia is false",
    choice1: "It can be caused by volatile anesthetic gases",
    choice2: "Risk factors include genetic defects in ryanodine receptor",
    choice3: "Clinical features include hyperthermia, tachycardia and tachypnea",
    choice4: "The mortality rate has not decreased since the 1970s",
	choice5: "The underlying mechanism is uncontrolled increase in skeletal muscle oxidative metabolism",
    answer: 4
  },
  {
    question: "Q19. Which of the following is not true regarding contact gunshot wounds?",
    choice1: "The barrel of the gun is in contact with the skin",
    choice2: "A muzzle imprint may be present",
    choice3: "There is stippling around the outside of the wound",
    choice4: "There is usually soot deposited in the wound",
	choice5: "The wound edges may exhibit cherry red discolouration",
    answer: 3
  },
  {
    question: "Q20. Which of the following features distinguish subdural and subarachnoid hemorrhage?",
    choice1: "History of headache",
    choice2: "History of trauma",
    choice3: "Small amount of blood",
    choice4: "Location of blood between the dura and the cortex",
	choice5: "Association with fracture",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;

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
    return window.location.assign("c08forensicend.html");
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

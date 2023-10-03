// This is Quiz game created with HTML,Tailwind CSS and Javascript
let currentQuestionIndex = 0;
let quizData = [];
const urlAPI = "You can add Trivia API or another one"; 

// Function that fetches questions from Trivia API
async function fetchQuestions() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();
        quizData = data.results;
        displayQuestion();
    } catch(error) {
        console.error('Error fetching quiz data:', error);
    }
}

// Function that displays questions that are fetched by fetchQuestions function
function displayQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const question = quizData[currentQuestionIndex];
        const quizContainer = document.getElementById("quiz-container");
        const questionElement = document.querySelector(".text-lg");
        const buttons = document.querySelectorAll(".bg-blue-500");

        // Decodes the HTML entities in the question text
        const decodedQuestion = decodeEntities(question.question);

        questionElement.innerHTML = decodedQuestion;

        // Shuffles the answer choices to randomize their order
        const shuffledAnswers = shuffleArray([question.correct_answer, ...question.incorrect_answers]);

        buttons.forEach((button, index) => {
            // Decodes HTML entities in answer choices
            const decodedAnswer = decodeEntities(shuffledAnswers[index]);
            button.innerHTML = `${String.fromCharCode(65 + index)}. ${decodedAnswer}`;
        });
    } else {
        alert("Quiz was completed!");
    }
}

function checkAnswers() {
    const selectedAnswer = event.target.textContent;

    if (selectedAnswer === quizData[currentQuestionIndex].correct_answer) {
        alert("Correct!");
    } else {
        alert("Incorrect. Please try again.");
    }

    currentQuestionIndex++;
    displayQuestion();
}

// Function that shuffles an array with questions that were fetched randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function that decodes HTML entities
function decodeEntities(encodedString) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
}

window.addEventListener("DOMContentLoaded", fetchQuestions);




const question = document.querySelector('#question')
const answerBox = document.querySelector('#answer-box')
const quizzContainer = document.querySelector('#quiz-container')
const scoreContainer = document.querySelector('#score-container')
const letters = ["a", "b", "c", "d"]
let points = 0
let actualQuestion = 0

// Perguntas
const questions = [
    {
      "question": " - PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": " - Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": " - Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

// Subst do quiz pra primeira pergunta
function init(){
    createQuestion(0)
}

// Cria pergunta
function createQuestion(i) {

    // Limpar questão anterior
    const oldButtons = answerBox.querySelectorAll('button')

    oldButtons.forEach(function(btn) {
        btn.remove()
    })

    //alterar texto da pergunta do array questions
    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector('#question-number')

    questionText.textContent = questions[i].question
    questionNumber.textContent = i + 1

    questions[i].answers.forEach(function(answer, i) {
        //cria o template do botão do quiz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true)

        const letterBtn = answerTemplate.querySelector('.btn-letter')
        const answerText = answerTemplate.querySelector('.question-answer')

        letterBtn.textContent = letters[i]
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute('correct-answer', answer['correct'])

        // remover hide e template class
        answerTemplate.classList.remove('hide')
        answerTemplate.classList.remove('answer-template')

        //inserir alternativas na tela
        answerBox.appendChild(answerTemplate)

        // evento click na resp
        answerTemplate.addEventListener('click', function() {
            checkAnswer(this)
        })

    
    })

    actualQuestion++
}

function checkAnswer(btn) {
    
    const buttons = answerBox.querySelectorAll('button')

    buttons.forEach(function(button) {
        if (button.getAttribute('correct-answer') === 'true') {

            button.classList.add('correct-answer')

            //checa se acertou
            if(btn === button) {
                //incremento dos pontos
                points++
            }

        } else {

            button.classList.add('wrong-answer')
        }
    })

    //exibir prox pergunta
    nextQuestion()
}

function nextQuestion() {

    //timer para usuario ver a respostas
    setTimeout(function() {

        if(actualQuestion >= questions.length) {
            //msg de sucesso
            showSuccessesMessage()
            return
        }
        
        createQuestion(actualQuestion)

    }, 1000)
}

//exibe tela final
function showSuccessesMessage() {


    hideOrShowQuiz()

    //trocar dados da tela de score
    const score = ((points / questions.length) * 100).toFixed(2)

    const displayScore = document.querySelector('#display-score span')

    displayScore.textContent = score.toString()

    //alterar o numero de perguntas
    const correctAnswer = document.querySelector('#correct-answer')

    correctAnswer.textContent = points

    const totalQuestions = document.querySelector('#question-qtd')

    totalQuestions.textContent = questions.length
}

function hideOrShowQuiz() {
    quizzContainer.classList.toggle('hide')
    scoreContainer.classList.toggle('hide')
}

//reiniciar quiz
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', function() {

    //zerar
    actualQuestion = 0
    points = 0
    hideOrShowQuiz()
    init()
})

init()
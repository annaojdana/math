// Stan aplikacji
let currentQuestionIndex = 0;
let currentScore = 0;
let quizQuestions = [];
let selectedQuestions = [];
let answeredCorrectly = [];

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    loadProgress();
    setupQuiz();
});

// ===== ZARZĄDZANIE ZAKŁADKAMI =====

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
}

function showTab(tabName) {
    // Ukryj wszystkie zakładki
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Usuń aktywny stan z przycisków
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Pokaż wybraną zakładkę
    document.getElementById(tabName).classList.add('active');

    // Zaznacz aktywny przycisk
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Odśwież postępy jeśli przełączamy na zakładkę postępów
    if (tabName === 'progress') {
        displayProgress();
    }
}

// ===== QUIZ =====

function setupQuiz() {
    // Wyświetl liczbę pytań
    document.getElementById('total-questions').textContent = quizQuestions.length;
}

function startQuiz() {
    // Zresetuj stan
    currentQuestionIndex = 0;
    currentScore = 0;
    answeredCorrectly = [];

    // Wymieszaj pytania
    selectedQuestions = shuffleArray([...quizQuestions]);

    // Pokaż ekran pytania
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-question').classList.remove('hidden');

    // Wyświetl pierwsze pytanie
    displayQuestion();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function displayQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }

    const question = selectedQuestions[currentQuestionIndex];

    // Aktualizuj nagłówek
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-q').textContent = selectedQuestions.length;
    document.getElementById('current-score').textContent = currentScore;

    // Wyświetl pytanie
    document.getElementById('question-text').textContent = question.question;

    // Wyświetl zbiory
    const setsDisplay = document.getElementById('question-sets');
    if (question.sets) {
        let setsHtml = '';
        for (const [key, value] of Object.entries(question.sets)) {
            if (Array.isArray(value)) {
                setsHtml += `<p><strong>${key}</strong> = {${value.join(', ')}}</p>`;
            } else {
                setsHtml += `<p><em>${value}</em></p>`;
            }
        }
        setsDisplay.innerHTML = setsHtml;
        setsDisplay.style.display = 'block';
    } else {
        setsDisplay.style.display = 'none';
    }

    // Wyświetl odpowiedzi
    displayAnswers(question.answers);
}

function displayAnswers(answers) {
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    // Wymieszaj odpowiedzi
    const shuffledAnswers = shuffleArray(answers);

    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.correct, button);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(isCorrect, buttonElement) {
    // Zablokuj wszystkie przyciski
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });

    // Zaznacz odpowiedź
    if (isCorrect) {
        buttonElement.classList.add('correct');
        currentScore++;
        answeredCorrectly.push(true);
    } else {
        buttonElement.classList.add('incorrect');
        answeredCorrectly.push(false);

        // Pokaż poprawną odpowiedź
        allButtons.forEach(btn => {
            const question = selectedQuestions[currentQuestionIndex];
            const answer = question.answers.find(a => a.text === btn.textContent);
            if (answer && answer.correct) {
                btn.classList.add('correct');
            }
        });
    }

    // Aktualizuj wynik
    document.getElementById('current-score').textContent = currentScore;

    // Przejdź do następnego pytania po 1.5 sekundy
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1500);
}

function skipQuestion() {
    answeredCorrectly.push(false);
    currentQuestionIndex++;
    displayQuestion();
}

function showResults() {
    // Ukryj pytanie
    document.getElementById('quiz-question').classList.add('hidden');

    // Pokaż wyniki
    const resultScreen = document.getElementById('quiz-result');
    resultScreen.classList.remove('hidden');

    const totalQuestions = selectedQuestions.length;
    const percentage = Math.round((currentScore / totalQuestions) * 100);

    document.getElementById('final-score').textContent = currentScore;
    document.getElementById('final-total').textContent = totalQuestions;
    document.getElementById('percentage').textContent = percentage;

    // Wiadomość w zależności od wyniku
    const messageElement = document.getElementById('result-message');
    if (percentage >= 90) {
        messageElement.textContent = 'Doskonale! Świetnie znasz działania na zbiorach!';
        messageElement.style.color = 'var(--success-color)';
    } else if (percentage >= 70) {
        messageElement.textContent = 'Bardzo dobrze! Masz solidną wiedzę.';
        messageElement.style.color = 'var(--success-color)';
    } else if (percentage >= 50) {
        messageElement.textContent = 'Nieźle! Jest jeszcze miejsce na poprawę.';
        messageElement.style.color = 'var(--warning-color)';
    } else {
        messageElement.textContent = 'Wróć do teorii i spróbuj ponownie!';
        messageElement.style.color = 'var(--danger-color)';
    }

    // Zapisz wynik
    saveQuizResult(currentScore, totalQuestions, percentage);
}

// ===== LOCAL STORAGE =====

function saveQuizResult(score, total, percentage) {
    const quizHistory = getQuizHistory();

    const result = {
        date: new Date().toISOString(),
        score: score,
        total: total,
        percentage: percentage
    };

    quizHistory.push(result);
    localStorage.setItem('mathQuizHistory', JSON.stringify(quizHistory));
}

function getQuizHistory() {
    const history = localStorage.getItem('mathQuizHistory');
    return history ? JSON.parse(history) : [];
}

function loadProgress() {
    displayProgress();
}

function displayProgress() {
    const history = getQuizHistory();

    if (history.length === 0) {
        // Brak danych
        document.getElementById('completed-quizzes').textContent = '0';
        document.getElementById('average-score').textContent = '0%';
        document.getElementById('best-score').textContent = '0%';
        document.getElementById('total-answered').textContent = '0';

        document.getElementById('quiz-history').innerHTML = `
            <div class="history-empty">
                <p>Nie masz jeszcze żadnych wyników.</p>
                <p>Ukończ quiz, aby zobaczyć swoje postępy!</p>
            </div>
        `;
        return;
    }

    // Statystyki
    const completedQuizzes = history.length;
    const totalAnswered = history.reduce((sum, quiz) => sum + quiz.total, 0);
    const averagePercentage = Math.round(
        history.reduce((sum, quiz) => sum + quiz.percentage, 0) / history.length
    );
    const bestPercentage = Math.max(...history.map(quiz => quiz.percentage));

    document.getElementById('completed-quizzes').textContent = completedQuizzes;
    document.getElementById('average-score').textContent = averagePercentage + '%';
    document.getElementById('best-score').textContent = bestPercentage + '%';
    document.getElementById('total-answered').textContent = totalAnswered;

    // Historia
    displayQuizHistory(history);
}

function displayQuizHistory(history) {
    const historyContainer = document.getElementById('quiz-history');

    // Sortuj od najnowszych
    const sortedHistory = [...history].reverse();

    let historyHtml = '';
    sortedHistory.forEach((quiz, index) => {
        const date = new Date(quiz.date);
        const dateStr = date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let scoreClass = 'poor';
        if (quiz.percentage >= 70) {
            scoreClass = 'good';
        } else if (quiz.percentage >= 50) {
            scoreClass = 'medium';
        }

        historyHtml += `
            <div class="history-item">
                <div>
                    <div class="history-date">${dateStr}</div>
                    <div>Pytań: ${quiz.total}</div>
                </div>
                <div class="history-score ${scoreClass}">
                    ${quiz.score}/${quiz.total} (${quiz.percentage}%)
                </div>
            </div>
        `;
    });

    historyContainer.innerHTML = historyHtml;
}

function clearProgress() {
    if (confirm('Czy na pewno chcesz wyczyścić całą historię quizów?')) {
        localStorage.removeItem('mathQuizHistory');
        displayProgress();
        alert('Historia została wyczyszczona.');
    }
}

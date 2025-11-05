// Stan aplikacji - osobny dla każdej kategorii
const quizState = {
    sets: {
        currentQuestionIndex: 0,
        currentScore: 0,
        selectedQuestions: [],
        answeredCorrectly: [],
        questions: quizQuestions // z sets-data.js
    },
    numbers: {
        currentQuestionIndex: 0,
        currentScore: 0,
        selectedQuestions: [],
        answeredCorrectly: [],
        questions: numbersQuestions // z numbers-data.js
    }
};

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSubtabs();
    loadProgress();
    setupQuiz('sets');
    setupQuiz('numbers');
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

function initializeSubtabs() {
    const subtabButtons = document.querySelectorAll('.subtab-button');

    subtabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subtabName = this.getAttribute('data-subtab');
            const parentTab = this.closest('.tab-content').id;
            showSubtab(parentTab, subtabName);
        });
    });
}

function showSubtab(parentTab, subtabName) {
    const parent = document.getElementById(parentTab);
    if (!parent) return;

    // Ukryj wszystkie pod-zakładki w tym rodzicu
    const subtabContents = parent.querySelectorAll('.subtab-content');
    subtabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Usuń aktywny stan z przycisków pod-zakładek
    const subtabButtons = parent.querySelectorAll('.subtab-button');
    subtabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Pokaż wybraną pod-zakładkę
    const subtabContent = document.getElementById(subtabName);
    if (subtabContent) {
        subtabContent.classList.add('active');
    }

    // Zaznacz aktywny przycisk
    const activeButton = parent.querySelector(`[data-subtab="${subtabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// ===== QUIZ =====

function setupQuiz(category) {
    const suffix = category === 'sets' ? '' : '-numbers';
    const totalQuestionsEl = document.getElementById(`total-questions${suffix}`);
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = quizState[category].questions.length;
    }
}

function startQuiz(category) {
    const state = quizState[category];
    const suffix = category === 'sets' ? '' : '-numbers';

    // Zresetuj stan
    state.currentQuestionIndex = 0;
    state.currentScore = 0;
    state.answeredCorrectly = [];

    // Wymieszaj pytania
    state.selectedQuestions = shuffleArray([...state.questions]);

    // Pokaż ekran pytania
    document.getElementById(`quiz-start${suffix}`).classList.add('hidden');
    document.getElementById(`quiz-result${suffix}`).classList.add('hidden');
    document.getElementById(`quiz-question${suffix}`).classList.remove('hidden');

    // Wyświetl pierwsze pytanie
    displayQuestion(category);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function displayQuestion(category) {
    const state = quizState[category];
    const suffix = category === 'sets' ? '' : '-numbers';

    if (state.currentQuestionIndex >= state.selectedQuestions.length) {
        showResults(category);
        return;
    }

    const question = state.selectedQuestions[state.currentQuestionIndex];

    // Aktualizuj nagłówek
    document.getElementById(`current-question${suffix}`).textContent = state.currentQuestionIndex + 1;
    document.getElementById(`total-q${suffix}`).textContent = state.selectedQuestions.length;
    document.getElementById(`current-score${suffix}`).textContent = state.currentScore;

    // Wyświetl pytanie
    document.getElementById(`question-text${suffix}`).textContent = question.question;

    // Wyświetl zbiory
    const setsDisplay = document.getElementById(`question-sets${suffix}`);
    if (question.sets && Object.keys(question.sets).length > 0) {
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
    displayAnswers(category, question.answers);
}

function displayAnswers(category, answers) {
    const suffix = category === 'sets' ? '' : '-numbers';
    const answersContainer = document.getElementById(`answers-container${suffix}`);
    answersContainer.innerHTML = '';

    // Wymieszaj odpowiedzi
    const shuffledAnswers = shuffleArray(answers);

    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(category, answer.correct, button);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(category, isCorrect, buttonElement) {
    const state = quizState[category];
    const suffix = category === 'sets' ? '' : '-numbers';

    // Zablokuj wszystkie przyciski w tej kategorii
    const container = document.getElementById(`answers-container${suffix}`);
    const allButtons = container.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });

    // Zaznacz odpowiedź
    if (isCorrect) {
        buttonElement.classList.add('correct');
        state.currentScore++;
        state.answeredCorrectly.push(true);
    } else {
        buttonElement.classList.add('incorrect');
        state.answeredCorrectly.push(false);

        // Pokaż poprawną odpowiedź
        allButtons.forEach(btn => {
            const question = state.selectedQuestions[state.currentQuestionIndex];
            const answer = question.answers.find(a => a.text === btn.textContent);
            if (answer && answer.correct) {
                btn.classList.add('correct');
            }
        });
    }

    // Aktualizuj wynik
    document.getElementById(`current-score${suffix}`).textContent = state.currentScore;

    // Przejdź do następnego pytania po 1.5 sekundy
    setTimeout(() => {
        state.currentQuestionIndex++;
        displayQuestion(category);
    }, 1500);
}

function skipQuestion(category) {
    const state = quizState[category];
    state.answeredCorrectly.push(false);
    state.currentQuestionIndex++;
    displayQuestion(category);
}

function showResults(category) {
    const state = quizState[category];
    const suffix = category === 'sets' ? '' : '-numbers';

    // Ukryj pytanie
    document.getElementById(`quiz-question${suffix}`).classList.add('hidden');

    // Pokaż wyniki
    const resultScreen = document.getElementById(`quiz-result${suffix}`);
    resultScreen.classList.remove('hidden');

    const totalQuestions = state.selectedQuestions.length;
    const percentage = Math.round((state.currentScore / totalQuestions) * 100);

    document.getElementById(`final-score${suffix}`).textContent = state.currentScore;
    document.getElementById(`final-total${suffix}`).textContent = totalQuestions;
    document.getElementById(`percentage${suffix}`).textContent = percentage;

    // Wiadomość w zależności od wyniku
    const messageElement = document.getElementById(`result-message${suffix}`);
    const topicName = category === 'sets' ? 'działania na zbiorach' : 'liczby rzeczywiste';

    if (percentage >= 90) {
        messageElement.textContent = `Doskonale! Świetnie znasz ${topicName}!`;
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
    saveQuizResult(category, state.currentScore, totalQuestions, percentage);
}

// ===== LOCAL STORAGE =====

function saveQuizResult(category, score, total, percentage) {
    const quizHistory = getQuizHistory(category);

    const result = {
        date: new Date().toISOString(),
        category: category,
        score: score,
        total: total,
        percentage: percentage
    };

    quizHistory.push(result);
    localStorage.setItem(`mathQuizHistory_${category}`, JSON.stringify(quizHistory));
}

function getQuizHistory(category) {
    if (!category) {
        // Zwróć wszystkie wyniki
        const setsHistory = JSON.parse(localStorage.getItem('mathQuizHistory_sets') || '[]');
        const numbersHistory = JSON.parse(localStorage.getItem('mathQuizHistory_numbers') || '[]');
        return [...setsHistory, ...numbersHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    const history = localStorage.getItem(`mathQuizHistory_${category}`);
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

    // Historia jest już posortowana w getQuizHistory

    let historyHtml = '';
    history.forEach((quiz, index) => {
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

        const categoryLabel = quiz.category === 'sets' ? 'Zbiory' : 'Liczby rzeczywiste';
        const categoryBadge = quiz.category === 'sets'
            ? '<span style="background:#4a90e2;color:white;padding:2px 8px;border-radius:4px;font-size:0.8rem;margin-right:8px;">Zbiory</span>'
            : '<span style="background:#764ba2;color:white;padding:2px 8px;border-radius:4px;font-size:0.8rem;margin-right:8px;">Liczby</span>';

        historyHtml += `
            <div class="history-item">
                <div>
                    <div class="history-date">${dateStr}</div>
                    <div>${categoryBadge}Pytań: ${quiz.total}</div>
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
        localStorage.removeItem('mathQuizHistory_sets');
        localStorage.removeItem('mathQuizHistory_numbers');
        // Usuń też starą historię jeśli istnieje
        localStorage.removeItem('mathQuizHistory');
        displayProgress();
        alert('Historia została wyczyszczona.');
    }
}

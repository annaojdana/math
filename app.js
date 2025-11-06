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
    generateExam();
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

// ===== SPRAWDZIAN =====

function generateExam() {
    const container = document.getElementById('exam-tasks');
    if (!container) return;

    let html = '';
    let totalPoints = 0;

    examTasks.forEach(task => {
        totalPoints += task.points;
        html += `
            <div class="exam-task" id="task-${task.id}">
                <div class="task-header">
                    <div class="task-title">${task.id}. ${task.title}</div>
                    <div class="task-points">${task.points} pkt</div>
                </div>
        `;

        task.parts.forEach((part, index) => {
            const partId = `task-${task.id}-part-${index}`;
            html += `
                <div class="task-part" id="${partId}">
                    <div class="part-question">
                        ${part.letter ? `<strong>${part.letter})</strong>` : ''}
                        ${part.question}
                    </div>
            `;

            // Renderuj odpowiedni interfejs w zależności od typu
            if (part.type === 'prime-factors') {
                html += `
                    <div class="prime-factors-interface" id="interface-${partId}">
                        <div class="selected-factors-display">
                            <div class="selected-factors-label">Wybrany rozkład:</div>
                            <div class="selected-factors-content" id="selected-factors-${partId}">
                                <span style="color: var(--secondary-color);">Kliknij liczby pierwsze poniżej...</span>
                            </div>
                        </div>
                        <div class="current-product-display" id="product-${partId}">
                            Iloczyn: <span class="product-value">1</span> (cel: ${part.targetNumber})
                        </div>
                        <div class="prime-numbers-grid">
                            ${part.availablePrimes.map(prime => `
                                <button class="prime-number-card" onclick="addPrimeFactor(${task.id}, ${index}, ${prime})">
                                    ${prime}
                                </button>
                            `).join('')}
                        </div>
                        <div class="prime-factors-actions">
                            <button class="btn btn-secondary" onclick="clearPrimeFactors(${task.id}, ${index})">
                                Wyczyść
                            </button>
                        </div>
                    </div>
                    <div class="part-feedback hidden" id="feedback-${partId}"></div>
                `;
            } else {
                // Standardowy input tekstowy
                html += `
                    <input
                        type="text"
                        class="answer-input"
                        id="answer-${partId}"
                        placeholder="Wpisz odpowiedź..."
                    />
                    <div class="part-feedback hidden" id="feedback-${partId}"></div>
                `;
            }

            html += `
                    <button class="hint-btn" onclick="toggleHint('${partId}')">💡 Pokaż podpowiedź</button>
                    <div class="hint-content hidden" id="hint-${partId}">${part.hint}</div>
                    <div class="explanation-content hidden" id="explanation-${partId}">${part.explanation}</div>
                </div>
            `;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
    document.getElementById('exam-total').textContent = totalPoints;
}

function toggleHint(partId) {
    const hintElement = document.getElementById(`hint-${partId}`);
    hintElement.classList.toggle('hidden');
}

// ===== PRIME FACTORS INTERACTIVE INTERFACE =====

// Przechowywanie wybranych czynników dla każdego zadania
const primeFactorsState = {};

function initPrimeFactorsState(taskId, partIndex) {
    const key = `${taskId}-${partIndex}`;
    if (!primeFactorsState[key]) {
        primeFactorsState[key] = [];
    }
    return key;
}

function addPrimeFactor(taskId, partIndex, prime) {
    const key = initPrimeFactorsState(taskId, partIndex);
    primeFactorsState[key].push(prime);
    updatePrimeFactorsDisplay(taskId, partIndex);
}

function removePrimeFactor(taskId, partIndex, factorIndex) {
    const key = `${taskId}-${partIndex}`;
    if (primeFactorsState[key]) {
        primeFactorsState[key].splice(factorIndex, 1);
        updatePrimeFactorsDisplay(taskId, partIndex);
    }
}

function clearPrimeFactors(taskId, partIndex) {
    const key = `${taskId}-${partIndex}`;
    primeFactorsState[key] = [];
    updatePrimeFactorsDisplay(taskId, partIndex);
}

function updatePrimeFactorsDisplay(taskId, partIndex) {
    const key = `${taskId}-${partIndex}`;
    const partId = `task-${taskId}-part-${partIndex}`;
    const factors = primeFactorsState[key] || [];

    const displayElement = document.getElementById(`selected-factors-${partId}`);
    const productElement = document.getElementById(`product-${partId}`);

    // Aktualizuj wyświetlanie wybranych czynników
    if (factors.length === 0) {
        displayElement.innerHTML = '<span style="color: var(--secondary-color);">Kliknij liczby pierwsze poniżej...</span>';
    } else {
        displayElement.innerHTML = factors.map((factor, index) => `
            <span class="factor-chip">
                ${factor}
                <button class="remove-factor" onclick="removePrimeFactor(${taskId}, ${partIndex}, ${index})" title="Usuń">×</button>
            </span>
        `).join('');
    }

    // Oblicz i wyświetl iloczyn
    const product = factors.length > 0 ? factors.reduce((acc, val) => acc * val, 1) : 1;
    const task = examTasks.find(t => t.id === taskId);
    const part = task.parts[partIndex];
    const targetNumber = part.targetNumber;

    const productValueSpan = productElement.querySelector('.product-value');
    productValueSpan.textContent = product;

    // Usuń poprzednie klasy
    productElement.classList.remove('correct', 'incorrect');

    // Dodaj odpowiednią klasę jeśli są jakieś czynniki
    if (factors.length > 0) {
        if (product === targetNumber) {
            productElement.classList.add('correct');
            productElement.innerHTML = `Iloczyn: <span class="product-value">${product}</span> ✓ Brawo! To ${targetNumber}!`;
        } else if (product > targetNumber) {
            productElement.classList.add('incorrect');
            productElement.innerHTML = `Iloczyn: <span class="product-value">${product}</span> ✗ Za dużo! (cel: ${targetNumber})`;
        } else {
            productElement.innerHTML = `Iloczyn: <span class="product-value">${product}</span> (cel: ${targetNumber})`;
        }
    } else {
        productElement.innerHTML = `Iloczyn: <span class="product-value">1</span> (cel: ${targetNumber})`;
    }
}

function checkAllAnswers() {
    let earnedPoints = 0;
    let totalPoints = 0;

    examTasks.forEach(task => {
        totalPoints += task.points;
        let taskCorrectParts = 0;
        let taskTotalParts = task.parts.length;

        task.parts.forEach((part, index) => {
            const partId = `task-${task.id}-part-${index}`;
            const feedback = document.getElementById(`feedback-${partId}`);
            const explanation = document.getElementById(`explanation-${partId}`);

            let userAnswer;
            let isCorrect = false;

            // Obsługa różnych typów interfejsu
            if (part.type === 'prime-factors') {
                // Dla interaktywnego interfejsu z czynnikami pierwszymi
                const key = `${task.id}-${index}`;
                userAnswer = primeFactorsState[key] || [];

                if (userAnswer.length === 0) {
                    feedback.classList.add('hidden');
                    explanation.classList.add('hidden');
                    return;
                }

                // Sprawdź odpowiedź używając checkFunction
                if (part.checkFunction) {
                    isCorrect = part.checkFunction(userAnswer);
                }

                // Wyświetl feedback
                feedback.classList.remove('hidden', 'correct', 'incorrect');
                explanation.classList.remove('hidden');

                if (isCorrect) {
                    feedback.classList.add('correct');
                    feedback.textContent = '✓ Poprawnie! Świetny rozkład na czynniki pierwsze!';
                    taskCorrectParts++;
                } else {
                    feedback.classList.add('incorrect');
                    const correctAnswerStr = part.correctAnswer.join(' × ');
                    feedback.textContent = `✗ Niepoprawnie. Poprawna odpowiedź: ${correctAnswerStr}`;
                }
            } else {
                // Standardowy input tekstowy
                const answerInput = document.getElementById(`answer-${partId}`);
                userAnswer = answerInput.value.trim();

                // Sprawdź odpowiedź
                if (part.checkFunction) {
                    isCorrect = part.checkFunction(userAnswer);
                } else {
                    isCorrect = userAnswer.toLowerCase() === part.correctAnswer.toLowerCase();
                }

                // Wyświetl feedback
                answerInput.classList.remove('correct', 'incorrect');
                feedback.classList.remove('hidden', 'correct', 'incorrect');
                explanation.classList.remove('hidden');

                if (userAnswer === '') {
                    feedback.classList.add('hidden');
                    explanation.classList.add('hidden');
                    return;
                }

                if (isCorrect) {
                    answerInput.classList.add('correct');
                    feedback.classList.add('correct');
                    feedback.textContent = '✓ Poprawnie!';
                    taskCorrectParts++;
                } else {
                    answerInput.classList.add('incorrect');
                    feedback.classList.add('incorrect');
                    feedback.textContent = `✗ Niepoprawnie. Poprawna odpowiedź: ${part.correctAnswer}`;
                }
            }
        });

        // Przyznaj punkty za zadanie
        const taskElement = document.getElementById(`task-${task.id}`);
        taskElement.classList.remove('correct', 'incorrect');

        const pointsForTask = (taskCorrectParts / taskTotalParts) * task.points;
        earnedPoints += pointsForTask;

        if (taskCorrectParts === taskTotalParts && taskTotalParts > 0) {
            taskElement.classList.add('correct');
        } else if (taskCorrectParts > 0) {
            // Częściowo poprawne
        } else {
            taskElement.classList.add('incorrect');
        }
    });

    // Wyświetl podsumowanie
    const summary = document.getElementById('exam-summary');
    summary.classList.remove('hidden');

    document.getElementById('exam-score').textContent = earnedPoints.toFixed(1);
    document.getElementById('exam-total').textContent = totalPoints;

    const percentage = (earnedPoints / totalPoints * 100).toFixed(1);
    document.getElementById('exam-percentage').textContent = percentage;

    // Przewiń do podsumowania
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetExam() {
    // Wyczyść wszystkie inputy
    document.querySelectorAll('.answer-input').forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });

    // Wyczyść stan czynników pierwszych
    for (let key in primeFactorsState) {
        primeFactorsState[key] = [];
    }

    // Zaktualizuj wyświetlanie dla wszystkich interfejsów prime-factors
    examTasks.forEach(task => {
        task.parts.forEach((part, index) => {
            if (part.type === 'prime-factors') {
                updatePrimeFactorsDisplay(task.id, index);
            }
        });
    });

    // Ukryj feedback i wyjaśnienia
    document.querySelectorAll('.part-feedback').forEach(feedback => {
        feedback.classList.add('hidden');
    });

    document.querySelectorAll('.explanation-content').forEach(explanation => {
        explanation.classList.add('hidden');
    });

    // Ukryj podpowiedzi
    document.querySelectorAll('.hint-content').forEach(hint => {
        hint.classList.add('hidden');
    });

    // Wyczyść klasy zadań
    document.querySelectorAll('.exam-task').forEach(task => {
        task.classList.remove('correct', 'incorrect');
    });

    // Ukryj podsumowanie
    document.getElementById('exam-summary').classList.add('hidden');
}

// Pytania i odpowiedzi o działaniach na zbiorach

const quizQuestions = [
    // Suma zbiorów
    {
        question: "Oblicz sumę zbiorów A ∪ B",
        sets: {
            A: [1, 2, 3, 4],
            B: [3, 4, 5, 6]
        },
        answers: [
            { text: "{1, 2, 3, 4, 5, 6}", correct: true },
            { text: "{3, 4}", correct: false },
            { text: "{1, 2, 5, 6}", correct: false },
            { text: "{1, 2, 3, 4, 3, 4, 5, 6}", correct: false }
        ],
        explanation: "Suma zbiorów zawiera wszystkie elementy z obu zbiorów, bez powtórzeń."
    },
    {
        question: "Jaki jest wynik A ∪ B?",
        sets: {
            A: [2, 4, 6, 8],
            B: [1, 3, 5, 7]
        },
        answers: [
            { text: "{1, 2, 3, 4, 5, 6, 7, 8}", correct: true },
            { text: "{}", correct: false },
            { text: "{2, 4, 6, 8}", correct: false },
            { text: "{1, 3, 5, 7}", correct: false }
        ],
        explanation: "Suma zbiorów rozłącznych zawiera wszystkie elementy z obu zbiorów."
    },
    {
        question: "Oblicz A ∪ B",
        sets: {
            A: [5, 10, 15],
            B: [10, 15, 20, 25]
        },
        answers: [
            { text: "{5, 10, 15, 20, 25}", correct: true },
            { text: "{10, 15}", correct: false },
            { text: "{5, 20, 25}", correct: false },
            { text: "{5, 10, 15, 10, 15, 20, 25}", correct: false }
        ],
        explanation: "W sumie zbiorów każdy element pojawia się tylko raz."
    },

    // Przecięcie zbiorów
    {
        question: "Oblicz przecięcie zbiorów A ∩ B",
        sets: {
            A: [1, 2, 3, 4, 5],
            B: [3, 4, 5, 6, 7]
        },
        answers: [
            { text: "{3, 4, 5}", correct: true },
            { text: "{1, 2, 3, 4, 5, 6, 7}", correct: false },
            { text: "{1, 2, 6, 7}", correct: false },
            { text: "{}", correct: false }
        ],
        explanation: "Przecięcie zawiera tylko elementy wspólne dla obu zbiorów."
    },
    {
        question: "Jaki jest wynik A ∩ B?",
        sets: {
            A: [2, 4, 6, 8, 10],
            B: [1, 2, 3, 4, 5]
        },
        answers: [
            { text: "{2, 4}", correct: true },
            { text: "{1, 2, 3, 4, 5, 6, 8, 10}", correct: false },
            { text: "{6, 8, 10}", correct: false },
            { text: "{1, 3, 5}", correct: false }
        ],
        explanation: "Przecięcie zawiera tylko te elementy, które występują w obu zbiorach."
    },
    {
        question: "Oblicz A ∩ B dla zbiorów rozłącznych",
        sets: {
            A: [1, 3, 5, 7],
            B: [2, 4, 6, 8]
        },
        answers: [
            { text: "{}", correct: true },
            { text: "{1, 2, 3, 4, 5, 6, 7, 8}", correct: false },
            { text: "{1, 3, 5, 7}", correct: false },
            { text: "{2, 4, 6, 8}", correct: false }
        ],
        explanation: "Zbiory rozłączne nie mają wspólnych elementów, więc ich przecięcie jest zbiorem pustym."
    },

    // Różnica zbiorów
    {
        question: "Oblicz różnicę A − B",
        sets: {
            A: [1, 2, 3, 4, 5],
            B: [3, 4, 5, 6, 7]
        },
        answers: [
            { text: "{1, 2}", correct: true },
            { text: "{6, 7}", correct: false },
            { text: "{3, 4, 5}", correct: false },
            { text: "{1, 2, 6, 7}", correct: false }
        ],
        explanation: "A − B zawiera elementy ze zbioru A, które nie należą do B."
    },
    {
        question: "Oblicz różnicę B − A",
        sets: {
            A: [2, 4, 6],
            B: [1, 2, 3, 4, 5, 6]
        },
        answers: [
            { text: "{1, 3, 5}", correct: true },
            { text: "{2, 4, 6}", correct: false },
            { text: "{}", correct: false },
            { text: "{1, 2, 3, 4, 5, 6}", correct: false }
        ],
        explanation: "B − A zawiera elementy ze zbioru B, które nie należą do A."
    },
    {
        question: "Jaki jest wynik A − B?",
        sets: {
            A: [10, 20, 30, 40],
            B: [50, 60, 70]
        },
        answers: [
            { text: "{10, 20, 30, 40}", correct: true },
            { text: "{50, 60, 70}", correct: false },
            { text: "{}", correct: false },
            { text: "{10, 20, 30, 40, 50, 60, 70}", correct: false }
        ],
        explanation: "Jeśli zbiory są rozłączne, to A − B = A."
    },

    // Dopełnienie
    {
        question: "Oblicz dopełnienie A' (uniwersum U podane)",
        sets: {
            U: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            A: [2, 4, 6, 8, 10]
        },
        answers: [
            { text: "{1, 3, 5, 7, 9}", correct: true },
            { text: "{2, 4, 6, 8, 10}", correct: false },
            { text: "{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}", correct: false },
            { text: "{}", correct: false }
        ],
        explanation: "Dopełnienie A' zawiera wszystkie elementy uniwersum, które nie należą do A."
    },
    {
        question: "Jaki jest wynik B' dla uniwersum U?",
        sets: {
            U: [0, 1, 2, 3, 4, 5],
            B: [0, 2, 4]
        },
        answers: [
            { text: "{1, 3, 5}", correct: true },
            { text: "{0, 2, 4}", correct: false },
            { text: "{0, 1, 2, 3, 4, 5}", correct: false },
            { text: "{}", correct: false }
        ],
        explanation: "Dopełnienie zawiera elementy uniwersum, które nie są w zbiorze B."
    },

    // Prawa de Morgana
    {
        question: "Czy (A ∪ B)' = A' ∩ B'? (prawo de Morgana)",
        sets: {
            info: "To pytanie testuje znajomość praw de Morgana"
        },
        answers: [
            { text: "Tak, to jest prawo de Morgana", correct: true },
            { text: "Nie, (A ∪ B)' = A' ∪ B'", correct: false },
            { text: "Nie, (A ∪ B)' = A ∪ B", correct: false },
            { text: "Nie można określić", correct: false }
        ],
        explanation: "Pierwsze prawo de Morgana mówi, że dopełnienie sumy równa się przecięciu dopełnień."
    },
    {
        question: "Czy (A ∩ B)' = A' ∪ B'? (prawo de Morgana)",
        sets: {
            info: "To pytanie testuje znajomość praw de Morgana"
        },
        answers: [
            { text: "Tak, to jest prawo de Morgana", correct: true },
            { text: "Nie, (A ∩ B)' = A' ∩ B'", correct: false },
            { text: "Nie, (A ∩ B)' = A ∩ B", correct: false },
            { text: "Nie można określić", correct: false }
        ],
        explanation: "Drugie prawo de Morgana mówi, że dopełnienie przecięcia równa się sumie dopełnień."
    },

    // Własności
    {
        question: "Czy suma zbiorów jest przemienna? (A ∪ B = B ∪ A)",
        sets: {
            info: "To pytanie testuje znajomość własności działań"
        },
        answers: [
            { text: "Tak, suma jest przemienna", correct: true },
            { text: "Nie, A ∪ B ≠ B ∪ A", correct: false },
            { text: "Zależy od zbiorów", correct: false },
            { text: "Tylko dla zbiorów skończonych", correct: false }
        ],
        explanation: "Suma zbiorów jest przemienna - kolejność nie ma znaczenia."
    },
    {
        question: "Czy przecięcie zbiorów jest przemienne? (A ∩ B = B ∩ A)",
        sets: {
            info: "To pytanie testuje znajomość własności działań"
        },
        answers: [
            { text: "Tak, przecięcie jest przemienne", correct: true },
            { text: "Nie, A ∩ B ≠ B ∩ A", correct: false },
            { text: "Zależy od zbiorów", correct: false },
            { text: "Tylko dla zbiorów liczbowych", correct: false }
        ],
        explanation: "Przecięcie zbiorów jest przemienne - kolejność nie ma znaczenia."
    },

    // Zbiór pusty i uniwersum
    {
        question: "Ile elementów ma zbiór pusty?",
        sets: {
            info: "Podstawowa własność zbioru pustego"
        },
        answers: [
            { text: "0 elementów", correct: true },
            { text: "1 element", correct: false },
            { text: "Nieskończenie wiele", correct: false },
            { text: "Zależy od kontekstu", correct: false }
        ],
        explanation: "Zbiór pusty {} nie zawiera żadnych elementów."
    },
    {
        question: "Jaki jest wynik A ∩ {} (przecięcie ze zbiorem pustym)?",
        sets: {
            A: [1, 2, 3, 4, 5]
        },
        answers: [
            { text: "{}", correct: true },
            { text: "{1, 2, 3, 4, 5}", correct: false },
            { text: "Nie można określić", correct: false },
            { text: "{0}", correct: false }
        ],
        explanation: "Przecięcie dowolnego zbioru ze zbiorem pustym jest zbiorem pustym."
    },
    {
        question: "Jaki jest wynik A ∪ {} (suma ze zbiorem pustym)?",
        sets: {
            A: [1, 2, 3]
        },
        answers: [
            { text: "{1, 2, 3}", correct: true },
            { text: "{}", correct: false },
            { text: "{0, 1, 2, 3}", correct: false },
            { text: "Nie można określić", correct: false }
        ],
        explanation: "Suma dowolnego zbioru ze zbiorem pustym daje ten sam zbiór (zbiór pusty jest elementem neutralnym sumy)."
    },

    // Podzbiory
    {
        question: "Czy A jest podzbiorem B? (A ⊆ B)",
        sets: {
            A: [1, 2, 3],
            B: [1, 2, 3, 4, 5]
        },
        answers: [
            { text: "Tak, wszystkie elementy A są w B", correct: true },
            { text: "Nie, A nie jest podzbiorem B", correct: false },
            { text: "Są równe", correct: false },
            { text: "Nie można określić", correct: false }
        ],
        explanation: "A jest podzbiorem B, jeśli każdy element A należy do B."
    },
    {
        question: "Jeśli A ⊆ B, to jaki jest wynik A ∩ B?",
        sets: {
            info: "Własność podzbiorów"
        },
        answers: [
            { text: "A", correct: true },
            { text: "B", correct: false },
            { text: "{}", correct: false },
            { text: "A ∪ B", correct: false }
        ],
        explanation: "Jeśli A jest podzbiorem B, to przecięcie A ∩ B = A."
    },
    {
        question: "Jeśli A ⊆ B, to jaki jest wynik A ∪ B?",
        sets: {
            info: "Własność podzbiorów"
        },
        answers: [
            { text: "B", correct: true },
            { text: "A", correct: false },
            { text: "{}", correct: false },
            { text: "A ∩ B", correct: false }
        ],
        explanation: "Jeśli A jest podzbiorem B, to suma A ∪ B = B."
    }
];

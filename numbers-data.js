// Pytania i odpowiedzi o liczbach rzeczywistych

const numbersQuestions = [
    // Rodzaje liczb
    {
        question: "Które z poniższych liczb są liczbami naturalnymi?",
        sets: {},
        answers: [
            { text: "1, 5, 100", correct: true },
            { text: "-1, 0, 5", correct: false },
            { text: "0.5, 1, 2", correct: false },
            { text: "-5, -10, -15", correct: false }
        ],
        explanation: "Liczby naturalne to liczby używane do liczenia: 1, 2, 3, 4, 5..."
    },
    {
        question: "Które z poniższych liczb są liczbami całkowitymi?",
        sets: {},
        answers: [
            { text: "-5, 0, 10", correct: true },
            { text: "0.5, 1.5, 2.5", correct: false },
            { text: "π, √2, e", correct: false },
            { text: "1/2, 3/4, 5/6", correct: false }
        ],
        explanation: "Liczby całkowite to liczby naturalne, zero oraz liczby przeciwne do naturalnych."
    },
    {
        question: "Która z poniższych liczb NIE jest liczbą wymierną?",
        sets: {},
        answers: [
            { text: "√2", correct: true },
            { text: "1/2", correct: false },
            { text: "0.75", correct: false },
            { text: "-3", correct: false }
        ],
        explanation: "√2 jest liczbą niewymierną - nie można jej zapisać jako ułamka zwykłego."
    },
    {
        question: "Które z poniższych liczb są liczbami niewymiernymi?",
        sets: {},
        answers: [
            { text: "π, √3, e", correct: true },
            { text: "1/2, 3/4, 5/6", correct: false },
            { text: "0, 1, 2", correct: false },
            { text: "-1, 0.5, 100", correct: false }
        ],
        explanation: "Liczby niewymierne to liczby, których nie można zapisać jako ułamka zwykłego, np. π, √2, √3, e."
    },

    // Pierwiastki
    {
        question: "Ile wynosi √16?",
        sets: {},
        answers: [
            { text: "4", correct: true },
            { text: "8", correct: false },
            { text: "2", correct: false },
            { text: "256", correct: false }
        ],
        explanation: "√16 = 4, ponieważ 4² = 16"
    },
    {
        question: "Ile wynosi √64?",
        sets: {},
        answers: [
            { text: "8", correct: true },
            { text: "4", correct: false },
            { text: "32", correct: false },
            { text: "16", correct: false }
        ],
        explanation: "√64 = 8, ponieważ 8² = 64"
    },
    {
        question: "Oblicz: √9 · √4",
        sets: {},
        answers: [
            { text: "6", correct: true },
            { text: "13", correct: false },
            { text: "36", correct: false },
            { text: "√36", correct: false }
        ],
        explanation: "√9 · √4 = 3 · 2 = 6"
    },
    {
        question: "Oblicz: √100 / √25",
        sets: {},
        answers: [
            { text: "2", correct: true },
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "√4", correct: false }
        ],
        explanation: "√100 / √25 = 10 / 5 = 2"
    },
    {
        question: "Która z równości jest prawdziwa?",
        sets: {},
        answers: [
            { text: "√(a·b) = √a · √b", correct: true },
            { text: "√(a+b) = √a + √b", correct: false },
            { text: "√(a-b) = √a - √b", correct: false },
            { text: "√(a/b) = √a · √b", correct: false }
        ],
        explanation: "Prawdziwe jest: √(a·b) = √a · √b"
    },

    // Potęgi
    {
        question: "Ile wynosi 2³?",
        sets: {},
        answers: [
            { text: "8", correct: true },
            { text: "6", correct: false },
            { text: "9", correct: false },
            { text: "16", correct: false }
        ],
        explanation: "2³ = 2 · 2 · 2 = 8"
    },
    {
        question: "Ile wynosi 5²?",
        sets: {},
        answers: [
            { text: "25", correct: true },
            { text: "10", correct: false },
            { text: "15", correct: false },
            { text: "20", correct: false }
        ],
        explanation: "5² = 5 · 5 = 25"
    },
    {
        question: "Oblicz: 2³ · 2²",
        sets: {},
        answers: [
            { text: "2⁵ = 32", correct: true },
            { text: "2⁶ = 64", correct: false },
            { text: "4⁵ = 1024", correct: false },
            { text: "2¹ = 2", correct: false }
        ],
        explanation: "aᵐ · aⁿ = aᵐ⁺ⁿ, więc 2³ · 2² = 2⁵ = 32"
    },
    {
        question: "Ile wynosi 10⁰?",
        sets: {},
        answers: [
            { text: "1", correct: true },
            { text: "0", correct: false },
            { text: "10", correct: false },
            { text: "Nie można określić", correct: false }
        ],
        explanation: "Każda liczba (różna od zera) podniesiona do potęgi 0 równa się 1."
    },
    {
        question: "Ile wynosi 3⁻²?",
        sets: {},
        answers: [
            { text: "1/9", correct: true },
            { text: "-9", correct: false },
            { text: "9", correct: false },
            { text: "-6", correct: false }
        ],
        explanation: "a⁻ⁿ = 1/aⁿ, więc 3⁻² = 1/3² = 1/9"
    },
    {
        question: "Oblicz: (2²)³",
        sets: {},
        answers: [
            { text: "2⁶ = 64", correct: true },
            { text: "2⁵ = 32", correct: false },
            { text: "6² = 36", correct: false },
            { text: "8", correct: false }
        ],
        explanation: "(aᵐ)ⁿ = aᵐⁿ, więc (2²)³ = 2⁶ = 64"
    },

    // Logarytmy
    {
        question: "Ile wynosi log₂(8)?",
        sets: {},
        answers: [
            { text: "3", correct: true },
            { text: "2", correct: false },
            { text: "4", correct: false },
            { text: "16", correct: false }
        ],
        explanation: "log₂(8) = 3, ponieważ 2³ = 8"
    },
    {
        question: "Ile wynosi log₁₀(100)?",
        sets: {},
        answers: [
            { text: "2", correct: true },
            { text: "10", correct: false },
            { text: "100", correct: false },
            { text: "1", correct: false }
        ],
        explanation: "log₁₀(100) = 2, ponieważ 10² = 100"
    },
    {
        question: "Ile wynosi log₅(5)?",
        sets: {},
        answers: [
            { text: "1", correct: true },
            { text: "5", correct: false },
            { text: "0", correct: false },
            { text: "25", correct: false }
        ],
        explanation: "logₐ(a) = 1 dla każdego a > 0, a ≠ 1"
    },
    {
        question: "Ile wynosi log₃(1)?",
        sets: {},
        answers: [
            { text: "0", correct: true },
            { text: "1", correct: false },
            { text: "3", correct: false },
            { text: "-1", correct: false }
        ],
        explanation: "logₐ(1) = 0 dla każdego a > 0, a ≠ 1, ponieważ a⁰ = 1"
    },
    {
        question: "Oblicz: log₂(16) + log₂(4)",
        sets: {},
        answers: [
            { text: "6", correct: true },
            { text: "8", correct: false },
            { text: "20", correct: false },
            { text: "64", correct: false }
        ],
        explanation: "log₂(16) + log₂(4) = 4 + 2 = 6 (ponieważ 2⁴ = 16 i 2² = 4)"
    },

    // Procenty
    {
        question: "Ile wynosi 50% z liczby 80?",
        sets: {},
        answers: [
            { text: "40", correct: true },
            { text: "50", correct: false },
            { text: "30", correct: false },
            { text: "160", correct: false }
        ],
        explanation: "50% z 80 = (50/100) · 80 = 0.5 · 80 = 40"
    },
    {
        question: "Ile wynosi 25% z liczby 200?",
        sets: {},
        answers: [
            { text: "50", correct: true },
            { text: "25", correct: false },
            { text: "75", correct: false },
            { text: "100", correct: false }
        ],
        explanation: "25% z 200 = (25/100) · 200 = 0.25 · 200 = 50"
    },
    {
        question: "Jakim procentem liczby 50 jest liczba 10?",
        sets: {},
        answers: [
            { text: "20%", correct: true },
            { text: "10%", correct: false },
            { text: "5%", correct: false },
            { text: "50%", correct: false }
        ],
        explanation: "(10/50) · 100% = 0.2 · 100% = 20%"
    },
    {
        question: "Liczba 60 wzrosła o 20%. Jaka jest nowa wartość?",
        sets: {},
        answers: [
            { text: "72", correct: true },
            { text: "80", correct: false },
            { text: "70", correct: false },
            { text: "66", correct: false }
        ],
        explanation: "60 · (1 + 20/100) = 60 · 1.2 = 72"
    },
    {
        question: "Liczba 100 spadła o 30%. Jaka jest nowa wartość?",
        sets: {},
        answers: [
            { text: "70", correct: true },
            { text: "30", correct: false },
            { text: "130", correct: false },
            { text: "80", correct: false }
        ],
        explanation: "100 · (1 - 30/100) = 100 · 0.7 = 70"
    },
    {
        question: "Cena towaru wzrosła z 50 zł do 60 zł. O ile procent wzrosła cena?",
        sets: {},
        answers: [
            { text: "20%", correct: true },
            { text: "10%", correct: false },
            { text: "16.67%", correct: false },
            { text: "25%", correct: false }
        ],
        explanation: "Wzrost: (60-50)/50 · 100% = 10/50 · 100% = 20%"
    },

    // Operacje na liczbach
    {
        question: "Oblicz: (-20) + (-6)",
        sets: {},
        answers: [
            { text: "-26", correct: true },
            { text: "-14", correct: false },
            { text: "26", correct: false },
            { text: "14", correct: false }
        ],
        explanation: "Dodawanie liczb ujemnych: (-20) + (-6) = -26"
    },
    {
        question: "Oblicz: (-12) - (-3)",
        sets: {},
        answers: [
            { text: "-9", correct: true },
            { text: "-15", correct: false },
            { text: "9", correct: false },
            { text: "15", correct: false }
        ],
        explanation: "(-12) - (-3) = -12 + 3 = -9"
    },
    {
        question: "Oblicz: (-5) · (-4)",
        sets: {},
        answers: [
            { text: "20", correct: true },
            { text: "-20", correct: false },
            { text: "-9", correct: false },
            { text: "-1", correct: false }
        ],
        explanation: "Iloczyn dwóch liczb ujemnych jest liczbą dodatnią: (-5) · (-4) = 20"
    },
    {
        question: "Oblicz: (-24) / 6",
        sets: {},
        answers: [
            { text: "-4", correct: true },
            { text: "4", correct: false },
            { text: "-18", correct: false },
            { text: "-30", correct: false }
        ],
        explanation: "(-24) / 6 = -4"
    },
    {
        question: "Która własność jest prawdziwa?",
        sets: {},
        answers: [
            { text: "a + b = b + a (przemienność)", correct: true },
            { text: "a - b = b - a", correct: false },
            { text: "a / b = b / a", correct: false },
            { text: "(a - b) - c = a - (b - c)", correct: false }
        ],
        explanation: "Dodawanie jest przemienne: a + b = b + a"
    }
];

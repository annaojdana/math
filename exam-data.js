// Zadania ze sprawdzianu z liczb rzeczywistych

const examTasks = [
    {
        id: 1,
        title: "Liczby naturalne",
        points: 2,
        parts: [
            {
                letter: "a",
                question: "Przedstaw liczbę 24 jako iloczyn liczb pierwszych.",
                type: "prime-factors",
                targetNumber: 24,
                availablePrimes: [2, 3, 5, 7, 11, 13],
                correctAnswer: [2, 2, 2, 3],
                hint: "Klikaj na karty z liczbami pierwszymi, aby zbudować rozkład. Liczby pierwsze to: 2, 3, 5, 7, 11... Możesz użyć tej samej liczby kilka razy!",
                explanation: "24 | 2\n12 | 2\n 6 | 2\n 3 | 3\n 1 |\n\nOdpowiedź: 24 = 2×2×2×3 = 2³×3",
                checkFunction: (selectedFactors) => {
                    // Sprawdź czy iloczyn jest równy 24
                    const product = selectedFactors.reduce((acc, val) => acc * val, 1);
                    if (product !== 24) return false;

                    // Sprawdź czy wszystkie liczby są pierwsze
                    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
                    return selectedFactors.every(num => primes.includes(num));
                }
            },
            {
                letter: "b",
                question: "Oblicz: 2⁸ ÷ 2⁶ oraz podaj liczbę przeciwną do wyniku.",
                type: "text",
                correctAnswer: "2² = 4, liczba przeciwna: -4",
                hint: "Użyj wzoru: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Liczba przeciwna do a to -a.",
                explanation: "2⁸ ÷ 2⁶ = 2⁸⁻⁶ = 2² = 4\nLiczba przeciwna do 4 to -4.",
                checkFunction: (answer) => {
                    const cleaned = answer.toLowerCase().replace(/\s+/g, '');
                    // Musi zawierać zarówno 4 jak i -4 (lub −4)
                    return (cleaned.includes('4') || cleaned.includes('2²') || cleaned.includes('2^2')) &&
                           (cleaned.includes('-4') || cleaned.includes('−4'));
                }
            }
        ]
    },
    {
        id: 2,
        title: "Liczby całkowite i wymierne",
        points: 2,
        parts: [
            {
                letter: "a",
                question: "Oblicz: 3 - 4 + [-(3 - 2 + 5)]",
                type: "text",
                correctAnswer: "-7",
                hint: "Najpierw oblicz wartość w nawiasie kwadratowym: 3 - 2 + 5. Następnie zmień znaki (minus przed nawiasem) i dodaj do 3 - 4.",
                explanation: "3 - 4 + [-(3 - 2 + 5)] = 3 - 4 + [-(6)] = 3 - 4 + (-6) = 3 - 4 - 6 = -7",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "-7" || cleaned === "−7";
                }
            },
            {
                letter: "b",
                question: "Oblicz: -1/2 - 2/3",
                type: "text",
                correctAnswer: "-7/6",
                hint: "Sprowadź ułamki do wspólnego mianownika. Najmniejszy wspólny mianownik dla 2 i 3 to 6.",
                explanation: "-1/2 - 2/3 = -3/6 - 4/6 = -7/6 (lub -1 1/6 w postaci liczby mieszanej)",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "-7/6" || cleaned === "−7/6" || cleaned === "-1 1/6" || cleaned === "-11/6";
                }
            }
        ]
    },
    {
        id: 3,
        title: "Liczby niewymierne",
        points: 2,
        parts: [
            {
                letter: "a",
                question: "Podkreśl liczby niewymierne: 0,01; π/2; √5; -2-1,41...; (√3)²; (18+12)/5",
                type: "text",
                correctAnswer: "π/2, √5",
                hint: "Liczby niewymierne to liczby, których nie można zapisać jako ułamek zwykły. Pamiętaj: π jest niewymierne, √5 nie da się uprościć, ale (√3)² = 3.",
                explanation: "Liczby niewymierne: π/2 (bo π jest niewymierne), √5 (nie można uprościć do liczby wymiernej). 0,01 = 1/100, -2-1,41... = -3,41... (może być wymierne jeśli okresowe), (√3)² = 3, (18+12)/5 = 6.",
                checkFunction: (answer) => {
                    const cleaned = answer.toLowerCase().replace(/\s+/g, '');
                    return (cleaned.includes('π') || cleaned.includes('pi')) && cleaned.includes('√5');
                }
            },
            {
                letter: "b",
                question: "Wyznacz największą liczbę naturalną n, dla której π > √n.",
                type: "text",
                correctAnswer: "9",
                hint: "π ≈ 3,14159... Sprawdź kolejne pierwiastki: √4 = 2, √9 = 3, √16 = 4, √10 ≈ 3,162... Dla której wartości n pierwiastek √n jest jeszcze mniejszy od π?",
                explanation: "π ≈ 3,14159...\n√9 = 3 < π ✓\n√10 ≈ 3,162 > π ✗\n√16 = 4 > π ✗\n\nNajwiększa liczba naturalna n, dla której π > √n, to n = 9.",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "9" || cleaned === "n=9" || cleaned === "n = 9" || cleaned === "n:9";
                }
            }
        ]
    },
    {
        id: 4,
        title: "Rozwinięcie dziesiętne liczby rzeczywistej",
        points: 2,
        parts: [
            {
                letter: "a",
                question: "Zapisz w postaci ułamka zwykłego liczbę 8,(01), gdzie (01) oznacza okres.",
                type: "text",
                correctAnswer: "793/99",
                hint: "Dla liczby 8,(01): x = 8,010101... Ponieważ okres ma 2 cyfry, pomnoż przez 10² = 100. Następnie odejmij równania.",
                explanation: "x = 8,(01) = 8,010101...\nPomnóż obie strony przez 100 (bo okres ma 2 cyfry):\n100x = 801,010101...\n\nOdejmij pierwsze równanie od drugiego:\n100x - x = 801,010101... - 8,010101...\n99x = 793\nx = 793/99",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "793/99";
                }
            },
            {
                letter: "b",
                question: "Ile co najmniej cyfr potrzeba w rozwinięciu dziesiętnym liczby π, aby reprezentowała liczbę z dokładnością do 0,001?",
                type: "text",
                correctAnswer: "4 cyfry (3,142)",
                hint: "π ≈ 3,14159... Dokładność 0,001 = 1/1000 oznacza trzecie miejsce po przecinku. Ile cyfr trzeba wziąć łącznie (włącznie z częścią całkowitą)?",
                explanation: "π ≈ 3,14159...\nDokładność 0,001 = 1/1000 wymaga 3 miejsc po przecinku.\nPotrzebujemy: 3,142 (zaokrąglone)\n\nTo daje łącznie 4 cyfry:\n- 1 cyfra przed przecinkiem: 3\n- 3 cyfry po przecinku: 1, 4, 2\n\nOdpowiedź: 4 cyfry",
                checkFunction: (answer) => {
                    const cleaned = answer.trim().toLowerCase();
                    return cleaned === "4" || cleaned === "cztery" || cleaned.includes("4 cyfry") || cleaned === "4cyfry";
                }
            }
        ]
    },
    {
        id: 5,
        title: "Pierwiastkowanie",
        points: 3,
        parts: [
            {
                letter: "a",
                question: "Oblicz: (-20 + 4) · √6",
                type: "text",
                correctAnswer: "-16√6",
                hint: "Najpierw oblicz wartość w nawiasie: -20 + 4. Następnie pomnóż wynik przez √6.",
                explanation: "Krok 1: Oblicz wyrażenie w nawiasie\n-20 + 4 = -16\n\nKrok 2: Pomnóż przez √6\n-16 · √6 = -16√6",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').replace('*', '');
                    return cleaned === "-16√6" || cleaned === "−16√6" || cleaned === "-16·√6";
                }
            },
            {
                letter: "b",
                question: "Oblicz: (12 - 8) · √3",
                type: "text",
                correctAnswer: "4√3",
                hint: "Najpierw oblicz wartość w nawiasie: 12 - 8. Następnie pomnóż wynik przez √3.",
                explanation: "Krok 1: Oblicz wyrażenie w nawiasie\n12 - 8 = 4\n\nKrok 2: Pomnóż przez √3\n4 · √3 = 4√3",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').replace('*', '');
                    return cleaned === "4√3" || cleaned === "4·√3";
                }
            },
            {
                letter: "c",
                question: "Oblicz: (√60 + 5√15 - √3) ÷ √3 + √11",
                type: "text",
                correctAnswer: "7√5 + √11 - 1",
                hint: "Podziel każdy składnik przez √3. Pamiętaj: √60 = √(4·15) = 2√15, a √15/√3 = √5. Po podzieleniu uprość podobne składniki.",
                explanation: "√60 = √(4·15) = 2√15\n(2√15 + 5√15 - √3) ÷ √3 = (2√15)/√3 + (5√15)/√3 - √3/√3\n= 2√(15/3) + 5√(15/3) - 1\n= 2√5 + 5√5 - 1\n= 7√5 - 1\nDodajemy √11: 7√5 - 1 + √11",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    // Akceptuj różne kolejności: 7√5 + √11 - 1, 7√5 - 1 + √11, √11 + 7√5 - 1
                    return (cleaned.includes('7√5') || cleaned.includes('7*√5')) &&
                           cleaned.includes('√11') &&
                           cleaned.includes('-1');
                }
            }
        ]
    },
    {
        id: 6,
        title: "Potęgowanie",
        points: 3,
        parts: [
            {
                letter: "a",
                question: "Oblicz: x⁵ ÷ x³",
                type: "text",
                correctAnswer: "x²",
                hint: "Użyj wzoru: aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
                explanation: "x⁵ ÷ x³ = x⁵⁻³ = x²",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "x²" || cleaned === "x^2";
                }
            },
            {
                letter: "b",
                question: "Oblicz: x⁻² · x⁻³",
                type: "text",
                correctAnswer: "x⁻⁵ lub 1/x⁵",
                hint: "Użyj wzoru: aᵐ · aⁿ = aᵐ⁺ⁿ. Pamiętaj o znakach wykładników! Uwaga: -2 + (-3) = -5",
                explanation: "Użyj wzoru mnożenia potęg o tej samej podstawie:\naᵐ · aⁿ = aᵐ⁺ⁿ\n\nx⁻² · x⁻³ = x⁻²⁺⁽⁻³⁾ = x⁻⁵\n\nMożna również zapisać jako: x⁻⁵ = 1/x⁵",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "x⁻⁵" || cleaned === "x^-5" || cleaned === "1/x⁵" || cleaned === "1/x^5" || cleaned === "x⁻⁵" || cleaned === "x^(-5)";
                }
            },
            {
                letter: "c",
                question: "Oblicz: x² · (1/3)⁻²",
                type: "text",
                correctAnswer: "9x²",
                hint: "Potęga ujemna odwraca ułamek: (a/b)⁻ⁿ = (b/a)ⁿ. Zatem (1/3)⁻² = 3².",
                explanation: "Krok 1: Oblicz (1/3)⁻²\nPotęga ujemna odwraca ułamek:\n(1/3)⁻² = (3/1)² = 3² = 9\n\nKrok 2: Pomnóż przez x²\nx² · 9 = 9x²",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').toLowerCase();
                    return cleaned === "9x²" || cleaned === "9x^2" || cleaned === "x²9" || cleaned === "x^29" || cleaned === "9*x^2" || cleaned === "9*x²";
                }
            }
        ]
    },
    {
        id: 7,
        title: "Logarytmowanie",
        points: 2,
        parts: [
            {
                letter: "a",
                question: "Oblicz: log₂ 2⁷",
                type: "text",
                correctAnswer: "7",
                hint: "Pamiętaj: logₐ(aⁿ) = n",
                explanation: "log₂ 2⁷ = 7 (bo 2⁷ = 2⁷)",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "7";
                }
            },
            {
                letter: "b",
                question: "Oblicz: log₃ 24 - log₃ 8",
                type: "text",
                correctAnswer: "1",
                hint: "Użyj wzoru różnicy logarytmów: logₐ x - logₐ y = logₐ (x/y). Następnie uprość ułamek 24/8.",
                explanation: "Krok 1: Użyj wzoru różnicy logarytmów\nlogₐ x - logₐ y = logₐ (x/y)\n\nlog₃ 24 - log₃ 8 = log₃ (24/8) = log₃ 3\n\nKrok 2: Oblicz log₃ 3\nlog₃ 3 = 1 (bo 3¹ = 3)\n\nOdpowiedź: 1",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').toLowerCase();
                    return cleaned === "1" || cleaned.includes('log₃3') || cleaned.includes('log33') || cleaned.includes('log3(3)');
                }
            }
        ]
    },
    {
        id: 8,
        title: "Procenty",
        points: 3,
        parts: [
            {
                letter: "a",
                question: "Oblicz 30% liczby 50.",
                type: "text",
                correctAnswer: "15",
                hint: "30% = 30/100 = 0,3. Pomnóż 50 przez 0,3.",
                explanation: "30% z 50 = (30/100) · 50 = 0,3 · 50 = 15",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "15" || cleaned === "15,0";
                }
            },
            {
                letter: "b",
                question: "Jakim procentem liczby 60 jest liczba 24?",
                type: "text",
                correctAnswer: "40%",
                hint: "Podziel 24 przez 60, następnie pomnóż przez 100%.",
                explanation: "(24/60) · 100% = 0,4 · 100% = 40%",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "40%" || cleaned === "40";
                }
            },
            {
                letter: "c",
                question: "Cena swetra wzrosła w ciągu roku trzy razy po 10%. O ile procent wzrosła cena w ciągu tego roku? (Zaokrąglij do 0,1%)",
                type: "text",
                correctAnswer: "33,1%",
                hint: "Po każdym wzroście o 10%, nowa cena to 110% poprzedniej = 1,1 × cena. Po 3 wzrostach: (1,1)³ × cena początkowa. Oblicz (1,1)³ i odejmij 1, aby uzyskać wzrost.",
                explanation: "Po 3 wzrostach o 10%:\nCena końcowa = cena początkowa × 1,1 × 1,1 × 1,1\n= cena początkowa × (1,1)³\n= cena początkowa × 1,331\n\nWzrost = 1,331 - 1 = 0,331 = 33,1%",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').replace(',', '.');
                    return cleaned === "33.1%" || cleaned === "33.1" ||
                           cleaned === "33,1%" || cleaned === "33,1";
                }
            }
        ]
    },
    {
        id: 9,
        title: "Zadanie na ocenę",
        points: 1,
        parts: [
            {
                letter: "",
                question: "Ile jest naturalnych liczb dwucyfrowych, które przy dzieleniu przez 3 dają resztę nieparzystą?",
                type: "text",
                correctAnswer: "30",
                hint: "Liczby dwucyfrowe: 10-99 (90 liczb). Reszty z dzielenia przez 3 to: 0, 1, 2. Nieparzyste reszty to 1 i 3... ale czekaj, reszta może być tylko 0, 1 lub 2. Która jest nieparzysta?",
                explanation: "Liczby dwucyfrowe: 10, 11, ..., 99 (90 liczb)\nReszty z dzielenia przez 3: 0, 1, 2\nNieparzysta reszta: tylko 1\nLiczby dające resztę 1: 10, 13, 16, ..., 97\nTo ciąg arytmetyczny: a₁=10, r=3, aₙ=97\n97 = 10 + 3(n-1) → n = 30\nOdpowiedź: 30 liczb",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "30" || cleaned === "30 liczb";
                }
            }
        ]
    }
];

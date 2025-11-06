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
                type: "text",
                correctAnswer: "18",
                hint: "Najpierw rozłóż liczbę 24 na czynniki, np stosując metodę z kreską",
                explanation: "24|2
                    12|2
                     6|2
                     3|3
                     1|",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "18" || cleaned === "18 liczb" || cleaned === "osiemnaście";
                }
            },
            {
                letter: "b",
                question: "Oblicz: 2⁸ ÷ 2⁶ oraz podaj liczbę przeciwną do wyniku.",
                type: "text",
                correctAnswer: "4, -4",
                hint: "Użyj wzoru: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Liczba przeciwna do a to -a.",
                explanation: "2⁸ ÷ 2⁶ = 2⁸⁻⁶ = 2² = 4. Liczba przeciwna do 4 to -4.",
                checkFunction: (answer) => {
                    const cleaned = answer.toLowerCase().replace(/\s+/g, '');
                    return cleaned.includes('4') && cleaned.includes('-4');
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
                hint: "π ≈ 3,14. Oblicz kolejne pierwiastki: √4 = 2, √9 = 3, √16 = 4. Która jest największa, ale mniejsza od π?",
                explanation: "π ≈ 3,14159. √9 = 3 < π, ale √10 ≈ 3,16 > π. Największa liczba naturalna n to 9.",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "9" || cleaned === "n=9" || cleaned === "n = 9";
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
                hint: "Dla liczby 8,(01): x = 8,010101... Pomnoż przez 100: 100x = 801,010101... Odejmij: 100x - x = 801,01... - 8,01... = 793, więc 99x = 793.",
                explanation: "x = 8,(01) = 8,010101...\n100x = 801,010101...\n100x - x = 793\n99x = 793\nx = 793/99",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "793/99";
                }
            },
            {
                letter: "b",
                question: "Ile co najmniej wyrazów potrzeba rozwinięcia dziesiętnego liczby π, aby reprezentowała liczbę z dokładnością do 0,001?",
                type: "text",
                correctAnswer: "4",
                hint: "π ≈ 3,14159... Dokładność 0,001 oznacza 3 miejsca po przecinku. Ile cyfr trzeba wziąć łącznie (z częścią całkowitą)?",
                explanation: "π ≈ 3,14159... Dokładność 0,001 = 1/1000 wymaga 3 miejsc po przecinku: 3,142. To daje 4 cyfry (1 przed przecinkiem + 3 po).",
                checkFunction: (answer) => {
                    const cleaned = answer.trim();
                    return cleaned === "4" || cleaned === "cztery";
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
                hint: "Najpierw oblicz wartość w nawiasie: -20 + 4 = -16. Następnie pomnóż przez √6.",
                explanation: "(-20 + 4) · √6 = -16 · √6 = -16√6",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "-16√6" || cleaned === "-16*√6" || cleaned.includes('-16') && cleaned.includes('√6');
                }
            },
            {
                letter: "b",
                question: "Oblicz: (12 - 8) · √3",
                type: "text",
                correctAnswer: "4√3",
                hint: "Najpierw oblicz wartość w nawiasie: 12 - 8 = 4. Następnie pomnóż przez √3.",
                explanation: "(12 - 8) · √3 = 4 · √3 = 4√3",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "4√3" || cleaned === "4*√3";
                }
            },
            {
                letter: "c",
                question: "Oblicz: (√60 + 5√15 - √3) ÷ √3 + √11",
                type: "text",
                correctAnswer: "2√5 + 5√5 - 1 + √11",
                hint: "Podziel każdy składnik przez √3. Pamiętaj: √60 = √(4·15) = 2√15, a √15/√3 = √5.",
                explanation: "√60 = 2√15\n(2√15 + 5√15 - √3) ÷ √3 = 2√15/√3 + 5√15/√3 - 1 = 2√5 + 5√5 - 1\nDodajemy √11: 2√5 + 5√5 - 1 + √11 = 7√5 - 1 + √11",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned.includes('√5') && (cleaned.includes('√11') || cleaned.includes('-1'));
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
                correctAnswer: "x⁻⁵",
                hint: "Użyj wzoru: aᵐ · aⁿ = aᵐ⁺ⁿ. Pamiętaj o znakach wykładników!",
                explanation: "x⁻² · x⁻³ = x⁻²⁺⁽⁻³⁾ = x⁻⁵ = 1/x⁵",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "x⁻⁵" || cleaned === "x^-5" || cleaned === "1/x⁵" || cleaned === "1/x^5";
                }
            },
            {
                letter: "c",
                question: "Oblicz: x² · (1/3)⁻²",
                type: "text",
                correctAnswer: "9x²",
                hint: "(1/3)⁻² = 3² = 9. Następnie pomnóż przez x².",
                explanation: "(1/3)⁻² = (3/1)² = 3² = 9\nx² · 9 = 9x²",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "9x²" || cleaned === "9x^2" || cleaned === "x²9" || cleaned === "x^29";
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
                correctAnswer: "log₃ 3 = 1",
                hint: "Użyj wzoru: logₐ x - logₐ y = logₐ (x/y)",
                explanation: "log₃ 24 - log₃ 8 = log₃ (24/8) = log₃ 3 = 1",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '').toLowerCase();
                    return cleaned === "1" || cleaned.includes('log₃3') || cleaned.includes('log33');
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
                question: "Cena swetra wzrosła w ciągu roku trzech razy po 10%. O ile procent wzrosła cena w ciągu tego roku? (Zaokrąglij do 0,1%)",
                type: "text",
                correctAnswer: "33,1%",
                hint: "Po każdym wzroście o 10%, nowa cena to 110% poprzedniej = 1,1 × cena. Po 3 wzrostach: (1,1)³ × cena początkowa.",
                explanation: "Po 3 wzrostach o 10%: 1,1 × 1,1 × 1,1 = 1,331\nWzrost: 1,331 - 1 = 0,331 = 33,1%",
                checkFunction: (answer) => {
                    const cleaned = answer.replace(/\s+/g, '');
                    return cleaned === "33,1%" || cleaned === "33.1%" || cleaned === "33,1" || cleaned === "33.1";
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

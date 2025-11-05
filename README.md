# Matematyka - Aplikacja do Nauki

Interaktywna aplikacja do nauki działań na zbiorach w formie quizów i prezentacji materiału edukacyjnego.

## Funkcjonalności

### 1. Teoria
- Kompletny materiał o działaniach na zbiorach
- Suma zbiorów (∪)
- Przecięcie zbiorów (∩)
- Różnica zbiorów (−)
- Dopełnienie zbioru (')
- Różnica symetryczna (△)
- Własności działań (przemienność, łączność, prawa de Morgana)
- Przykłady i definicje

### 2. Quiz
- 22 pytania testujące wiedzę o działaniach na zbiorach
- Losowe mieszanie pytań i odpowiedzi
- Natychmiastowa informacja zwrotna
- System punktacji
- Automatyczne zapisywanie wyników

### 3. Postępy
- Śledzenie ukończonych quizów
- Statystyki:
  - Liczba ukończonych quizów
  - Średni wynik
  - Najlepszy wynik
  - Łączna liczba odpowiedzianych pytań
- Historia wszystkich quizów z datami
- Możliwość wyczyszczenia historii

## Technologie

- **HTML5** - struktura aplikacji
- **CSS3** - stylowanie z gradientami i animacjami
- **JavaScript (ES6+)** - logika aplikacji
- **Local Storage** - przechowywanie postępów lokalnie

## Uruchomienie

Aplikacja nie wymaga instalacji ani serwera. Wystarczy otworzyć plik `index.html` w przeglądarce.

```bash
# Otwórz w przeglądarce
open index.html
# lub po prostu kliknij dwukrotnie na plik
```

## Struktura projektu

```
math/
├── index.html      # Główny plik HTML
├── styles.css      # Style CSS
├── app.js          # Logika aplikacji
├── sets-data.js    # Pytania quizowe
└── README.md       # Ten plik
```

## Funkcje aplikacji

- ✅ Bez logowania - wszystko działa lokalnie
- ✅ Bez bazy danych - używa Local Storage
- ✅ Responsywny design - działa na telefonach i tabletach
- ✅ Intuicyjny interfejs
- ✅ Materiał edukacyjny w języku polskim
- ✅ Automatyczne zapisywanie postępów
- ✅ Natychmiastowa informacja zwrotna w quizach

## Przyszłe rozszerzenia

Możliwe dodatkowe funkcjonalności:
- Więcej tematów matematycznych (geometria, algebra, statystyka)
- Tryb nauki z fiszkami
- Eksport wyników do PDF
- Tryb ciemny (dark mode)
- Poziomy trudności pytań
- Czasomierz dla quizów

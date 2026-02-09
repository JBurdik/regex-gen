import type { TranslationDict } from "./en";

export const cs: TranslationDict = {
  // Brand
  brand: "RegexGen",

  // Header / controls
  toggleTheme: "Přepnout motiv",
  toggleLanguage: "Přepnout jazyk",

  // Example input
  exampleTextLabel: "Ukázkový text",
  exampleTextPlaceholder: "Zadejte ukázkový text... např. uzivatel@example.com",

  // Segments
  segmentsLabel: "Segmenty",
  segmentsEmpty: "Zadejte ukázkový text výše pro zobrazení segmentů",
  segmentsMerge: "Sloučit segmenty",

  // Pattern selector
  patternFor: "Vzor pro:",
  characterClassLabel: "Třída znaků",
  customClassPlaceholder: "např. a-z0-9._",
  groupNamePlaceholder: "Název skupiny",

  // Pattern categories
  catBasic: "Základní",
  catCharacterClass: "Třídy znaků",

  // Quantifier section
  quantifierLabel: "Kvantifikátor",
  groupLabel: "Skupina",

  // Pattern labels
  patExactLabel: "Přesný",
  patAnyCharLabel: "Jakýkoli znak",
  patAnyCharsLabel: "Jakékoli znaky",
  patDigitLabel: "Číslice",
  patDigitsLabel: "Číslice (více)",
  patLetterLabel: "Písmeno",
  patLettersLabel: "Písmena",
  patUppercaseLabel: "Velká písmena",
  patLowercaseLabel: "Malá písmena",
  patAlphanumericLabel: "Alfanumerický",
  patAlphanumericsLabel: "Alfanumerické",
  patWordCharLabel: "Znak slova",
  patWordCharsLabel: "Znaky slova",
  patWhitespaceLabel: "Mezera",
  patWhitespacesLabel: "Mezery",
  patUnicodeLetterLabel: "Unicode písmeno",
  patUnicodeLettersLabel: "Unicode písmena",
  patCzechLetterLabel: "České písmeno",
  patCzechLettersLabel: "Česká písmena",
  patCzechAlphanumLabel: "Český alfanum.",
  patCzechAlphanumsLabel: "České alfanum.",
  patCustomClassLabel: "Vlastní třída",

  // Pattern descriptions
  patExactDesc: "Přesná shoda s textem",
  patAnyCharDesc: "Libovolný jeden znak",
  patAnyCharsDesc: "Jeden nebo více libovolných znaků",
  patDigitDesc: "Jedna číslice (0-9)",
  patDigitsDesc: "Jedna nebo více číslic",
  patLetterDesc: "Jedno ASCII písmeno",
  patLettersDesc: "Jedno nebo více ASCII písmen",
  patUppercaseDesc: "Jedno nebo více velkých písmen",
  patLowercaseDesc: "Jedno nebo více malých písmen",
  patAlphanumericDesc: "Jedno písmeno nebo číslice",
  patAlphanumericsDesc: "Jedno nebo více písmen nebo číslic",
  patWordCharDesc: "Znak slova (písmeno, číslice, podtržítko)",
  patWordCharsDesc: "Jeden nebo více znaků slova",
  patWhitespaceDesc: "Jeden bílý znak",
  patWhitespacesDesc: "Jeden nebo více bílých znaků",
  patUnicodeLetterDesc: "Jedno Unicode písmeno",
  patUnicodeLettersDesc: "Jedno nebo více Unicode písmen",
  patCzechLetterDesc: "Jedno české písmeno (ASCII + háčky/čárky)",
  patCzechLettersDesc: "Jedno nebo více českých písmen (ASCII + háčky/čárky)",
  patCzechAlphanumDesc: "Jedno české písmeno nebo číslice",
  patCzechAlphanumsDesc: "Jedno nebo více českých písmen nebo číslic",
  patCustomClassDesc: "Vlastní třída znaků",

  // Quantifier options
  quantOne: "Právě jeden",
  quantOnePlus: "Jeden nebo více",
  quantZeroPlus: "Nula nebo více",
  quantOptional: "Nula nebo jeden",
  quantLazy: "Jeden nebo více (líný)",

  // Group options
  groupNone: "Bez skupiny",
  groupCapture: "Zachytávací skupina",
  groupNamed: "Pojmenovaná skupina",
  groupNonCapturing: "Nezachytávací",
  groupLookahead: "Dopředný výhled",
  groupNegLookahead: "Negativní dopředný výhled",
  groupLookbehind: "Zpětný výhled",
  groupNegLookbehind: "Negativní zpětný výhled",

  // Regex output
  rawPatternLabel: "Surový vzor",
  rawPatternEmpty: "Zadejte ukázkový text pro vygenerování vzoru",
  copiedToClipboard: "Zkopírováno do schránky",
  failedToCopy: "Kopírování se nezdařilo",

  // Language labels
  langJavascript: "JavaScript",
  langPython: "Python",
  langPhp: "PHP",
  langGo: "Go",
  langRust: "Rust",
  langJava: "Java",
  langRuby: "Ruby",
  langC: "C (POSIX)",

  // Language warnings
  warnPythonUnicode:
    "Python používá \\p{L} s modulem `regex` (ne vestavěným `re`). Instalace: pip install regex",
  warnGoLookaround:
    "Go používá engine RE2, který nepodporuje dopředný/zpětný výhled.",
  warnRustLookaround:
    "Rust regex crate používá engine podobný RE2 a nepodporuje dopředný/zpětný výhled. Použijte crate `fancy-regex`.",
  warnCLookaround: "POSIX regex nepodporuje dopředný/zpětný výhled.",
  warnCShorthand:
    "POSIX regex nepodporuje \\d, \\w, \\s. Použijte [:digit:], [:alnum:], [:space:].",
  warnCUnicode: "POSIX regex nepodporuje Unicode vlastnosti.",
  warnCNamedGroup: "POSIX regex nepodporuje pojmenované zachytávací skupiny.",

  // Live tester
  liveTesterLabel: "Živý test",
  liveTesterInvalid: "Neplatný vzor",
  liveTesterPlaceholder: "Vložte text pro otestování vašeho regexu...",
  matchSingular: "shoda",
  matchPlural: "shod",

  // History
  historyTitle: "Historie",
  historyEmpty: "Zatím žádné uložené vzory",
  historySave: "Uložit do historie",
  historySaved: "Vzor uložen do historie",
  historyRestore: "Obnovit",
  historyDelete: "Smazat",
  historyDeleted: "Záznam smazán",
  historyPattern: "Vzor",

  // Quantifier - exact/range
  quantExact: "Přesně",
  quantRange: "Rozsah",
  quantExactPlaceholder: "n",
  quantMinPlaceholder: "min",
  quantMaxPlaceholder: "max",

  // Cheat sheet
  cheatSheetTitle: "Regex tahák",

  // Cheat sheet category titles
  cheatCharClassTitle: "Třídy znaků",
  cheatQuantifiersTitle: "Kvantifikátory",
  cheatAnchorsTitle: "Kotvy",
  cheatGroupsTitle: "Skupiny a výrazy",
  cheatFlagsTitle: "Příznaky",

  // Cheat sheet - Character Classes
  cheatDot: "Jakýkoli znak kromě nového řádku",
  cheatDigit: "Číslice (0-9)",
  cheatNotDigit: "Nečíslice",
  cheatWord: "Znak slova (a-z, A-Z, 0-9, _)",
  cheatNotWord: "Neznak slova",
  cheatWhitespace: "Bílý znak (mezera, tabulátor, nový řádek)",
  cheatNotWhitespace: "Nebílý znak",
  cheatCharSet: "Jakýkoli z a, b nebo c",
  cheatNegCharSet: "Ne a, b nebo c",
  cheatRange: "Rozsah: a až z",

  // Cheat sheet - Quantifiers
  cheatZeroOrMore: "Nula nebo více",
  cheatOneOrMore: "Jeden nebo více",
  cheatOptional: "Nula nebo jeden (nepovinný)",
  cheatExactly: "Přesně n-krát",
  cheatNOrMore: "n nebo vícekrát",
  cheatBetween: "Mezi n a m-krát",
  cheatLazyZero: "Nula nebo více (líný)",
  cheatLazyOne: "Jeden nebo více (líný)",

  // Cheat sheet - Anchors
  cheatStart: "Začátek řetězce/řádku",
  cheatEnd: "Konec řetězce/řádku",
  cheatWordBoundary: "Hranice slova",
  cheatNotWordBoundary: "Nehranice slova",

  // Cheat sheet - Groups
  cheatCaptureGroup: "Zachytávací skupina",
  cheatNamedGroup: "Pojmenovaná zachytávací skupina",
  cheatNonCapturing: "Nezachytávací skupina",
  cheatPosLookahead: "Pozitivní dopředný výhled",
  cheatNegLookahead: "Negativní dopředný výhled",
  cheatPosLookbehind: "Pozitivní zpětný výhled",
  cheatNegLookbehind: "Negativní zpětný výhled",
  cheatAlternation: "Alternace (a nebo b)",

  // Cheat sheet - Flags
  cheatFlagG: "Globální (najít všechny shody)",
  cheatFlagI: "Bez rozlišení velkých/malých písmen",
  cheatFlagM: "Víceřádkový (^ a $ odpovídají hranicím řádků)",
  cheatFlagS: "Tečka odpovídá novému řádku",
  cheatFlagU: "Podpora Unicode",
};

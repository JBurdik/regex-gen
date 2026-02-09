export const en = {
  // Brand
  brand: "RegexGen",

  // Header / controls
  toggleTheme: "Toggle theme",
  toggleLanguage: "Toggle language",

  // Example input
  exampleTextLabel: "Example Text",
  exampleTextPlaceholder: "Type your example text here... e.g. user@example.com",

  // Segments
  segmentsLabel: "Segments",
  segmentsEmpty: "Type some example text above to see segments",
  segmentsMerge: "Merge segments",

  // Pattern selector
  patternFor: "Pattern for:",
  characterClassLabel: "Character class",
  customClassPlaceholder: "e.g. a-z0-9._",
  groupNamePlaceholder: "Group name",

  // Pattern categories
  catBasic: "Basic",
  catCharacterClass: "Character Classes",

  // Quantifier section
  quantifierLabel: "Quantifier",
  groupLabel: "Group",

  // Pattern labels
  patExactLabel: "Exact",
  patAnyCharLabel: "Any Character",
  patAnyCharsLabel: "Any Characters",
  patDigitLabel: "Digit",
  patDigitsLabel: "Digits",
  patLetterLabel: "Letter",
  patLettersLabel: "Letters",
  patUppercaseLabel: "Uppercase",
  patLowercaseLabel: "Lowercase",
  patAlphanumericLabel: "Alphanumeric",
  patAlphanumericsLabel: "Alphanumerics",
  patWordCharLabel: "Word Char",
  patWordCharsLabel: "Word Chars",
  patWhitespaceLabel: "Whitespace",
  patWhitespacesLabel: "Whitespaces",
  patUnicodeLetterLabel: "Unicode Letter",
  patUnicodeLettersLabel: "Unicode Letters",
  patCzechLetterLabel: "Czech Letter",
  patCzechLettersLabel: "Czech Letters",
  patCzechAlphanumLabel: "Czech Alphanum",
  patCzechAlphanumsLabel: "Czech Alphanums",
  patCustomClassLabel: "Custom Class",

  // Pattern descriptions
  patExactDesc: "Match the literal text",
  patAnyCharDesc: "Match any single character",
  patAnyCharsDesc: "Match one or more of any character",
  patDigitDesc: "Match a single digit (0-9)",
  patDigitsDesc: "Match one or more digits",
  patLetterDesc: "Match a single ASCII letter",
  patLettersDesc: "Match one or more ASCII letters",
  patUppercaseDesc: "Match one or more uppercase letters",
  patLowercaseDesc: "Match one or more lowercase letters",
  patAlphanumericDesc: "Match a single letter or digit",
  patAlphanumericsDesc: "Match one or more letters or digits",
  patWordCharDesc: "Match a word character (letter, digit, underscore)",
  patWordCharsDesc: "Match one or more word characters",
  patWhitespaceDesc: "Match a single whitespace character",
  patWhitespacesDesc: "Match one or more whitespace characters",
  patUnicodeLetterDesc: "Match a single Unicode letter",
  patUnicodeLettersDesc: "Match one or more Unicode letters",
  patCzechLetterDesc: "Match a single Czech letter (ASCII + háčky/čárky)",
  patCzechLettersDesc: "Match one or more Czech letters (ASCII + háčky/čárky)",
  patCzechAlphanumDesc: "Match a single Czech letter or digit",
  patCzechAlphanumsDesc: "Match one or more Czech letters or digits",
  patCustomClassDesc: "Define a custom character class",

  // Quantifier options
  quantOne: "Exactly one",
  quantOnePlus: "One or more",
  quantZeroPlus: "Zero or more",
  quantOptional: "Zero or one",
  quantLazy: "One or more (lazy)",

  // Group options
  groupNone: "No grouping",
  groupCapture: "Capture group",
  groupNamed: "Named group",
  groupNonCapturing: "Non-capturing",
  groupLookahead: "Lookahead",
  groupNegLookahead: "Negative lookahead",
  groupLookbehind: "Lookbehind",
  groupNegLookbehind: "Negative lookbehind",

  // Regex output
  rawPatternLabel: "Raw Pattern",
  rawPatternEmpty: "Enter example text to generate a pattern",
  copiedToClipboard: "Copied to clipboard",
  failedToCopy: "Failed to copy",

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
    "Python uses \\p{L} with the `regex` module (not built-in `re`). Install: pip install regex",
  warnGoLookaround:
    "Go uses RE2 engine which does not support lookahead/lookbehind.",
  warnRustLookaround:
    "Rust regex crate uses RE2-like engine and does not support lookahead/lookbehind. Use the `fancy-regex` crate instead.",
  warnCLookaround: "POSIX regex does not support lookahead/lookbehind.",
  warnCShorthand:
    "POSIX regex does not support \\d, \\w, \\s. Use [:digit:], [:alnum:], [:space:] instead.",
  warnCUnicode: "POSIX regex does not support Unicode properties.",
  warnCNamedGroup: "POSIX regex does not support named capture groups.",

  // Live tester
  liveTesterLabel: "Live Tester",
  liveTesterInvalid: "Invalid pattern",
  liveTesterPlaceholder: "Paste text here to test your regex...",
  matchSingular: "match",
  matchPlural: "matches",

  // History
  historyTitle: "History",
  historyEmpty: "No saved patterns yet",
  historySave: "Save to History",
  historySaved: "Pattern saved to history",
  historyRestore: "Restore",
  historyDelete: "Delete",
  historyDeleted: "Entry deleted",
  historyPattern: "Pattern",

  // Quantifier - exact/range
  quantExact: "Exact",
  quantRange: "Range",
  quantExactPlaceholder: "n",
  quantMinPlaceholder: "min",
  quantMaxPlaceholder: "max",

  // Cheat sheet
  cheatSheetTitle: "Regex Cheat Sheet",

  // Cheat sheet category titles
  cheatCharClassTitle: "Character Classes",
  cheatQuantifiersTitle: "Quantifiers",
  cheatAnchorsTitle: "Anchors",
  cheatGroupsTitle: "Groups & Assertions",
  cheatFlagsTitle: "Flags",

  // Cheat sheet - Character Classes
  cheatDot: "Any character except newline",
  cheatDigit: "Digit (0-9)",
  cheatNotDigit: "Not a digit",
  cheatWord: "Word character (a-z, A-Z, 0-9, _)",
  cheatNotWord: "Not a word character",
  cheatWhitespace: "Whitespace (space, tab, newline)",
  cheatNotWhitespace: "Not whitespace",
  cheatCharSet: "Any of a, b, or c",
  cheatNegCharSet: "Not a, b, or c",
  cheatRange: "Range: a to z",

  // Cheat sheet - Quantifiers
  cheatZeroOrMore: "Zero or more",
  cheatOneOrMore: "One or more",
  cheatOptional: "Zero or one (optional)",
  cheatExactly: "Exactly n times",
  cheatNOrMore: "n or more times",
  cheatBetween: "Between n and m times",
  cheatLazyZero: "Zero or more (lazy)",
  cheatLazyOne: "One or more (lazy)",

  // Cheat sheet - Anchors
  cheatStart: "Start of string/line",
  cheatEnd: "End of string/line",
  cheatWordBoundary: "Word boundary",
  cheatNotWordBoundary: "Not a word boundary",

  // Cheat sheet - Groups
  cheatCaptureGroup: "Capture group",
  cheatNamedGroup: "Named capture group",
  cheatNonCapturing: "Non-capturing group",
  cheatPosLookahead: "Positive lookahead",
  cheatNegLookahead: "Negative lookahead",
  cheatPosLookbehind: "Positive lookbehind",
  cheatNegLookbehind: "Negative lookbehind",
  cheatAlternation: "Alternation (a or b)",

  // Cheat sheet - Flags
  cheatFlagG: "Global (find all matches)",
  cheatFlagI: "Case-insensitive",
  cheatFlagM: "Multiline (^ and $ match line boundaries)",
  cheatFlagS: "Dotall (. matches newline)",
  cheatFlagU: "Unicode support",
} as const;

type EnDict = typeof en;
export type TranslationKey = keyof EnDict;
export type TranslationDict = { [K in TranslationKey]: string };

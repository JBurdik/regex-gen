export type PatternType =
  | "exact"
  | "any_char"
  | "any_chars"
  | "digit"
  | "digits"
  | "letter"
  | "letters"
  | "alphanumeric"
  | "alphanumerics"
  | "whitespace"
  | "whitespaces"
  | "word_char"
  | "word_chars"
  | "unicode_letter"
  | "unicode_letters"
  | "uppercase"
  | "lowercase"
  | "czech_letter"
  | "czech_letters"
  | "czech_alphanumeric"
  | "czech_alphanumerics"
  | "custom_class";

export type Quantifier =
  | "one"
  | "one_or_more"
  | "zero_or_more"
  | "optional"
  | "lazy"
  | { exactly: number }
  | { min: number; max: number };

export type GroupType =
  | "capture"
  | "named"
  | "non_capturing"
  | "lookahead"
  | "neg_lookahead"
  | "lookbehind"
  | "neg_lookbehind";

export type Language =
  | "javascript"
  | "python"
  | "php"
  | "go"
  | "rust"
  | "java"
  | "ruby"
  | "c";

export type Segment = {
  id: string;
  text: string;
  patternType: PatternType;
  colorIndex: number;
  quantifier?: Quantifier;
  groupType?: GroupType;
  groupName?: string;
  customClass?: string;
};

export type HistoryEntry = {
  id: string;
  example: string;
  segments: Segment[];
  pattern: string;
  language: Language;
  createdAt: string;
};

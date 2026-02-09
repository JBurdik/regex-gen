import type { TranslationDict } from "@/i18n/translations/en";
import type { PatternType } from "./types";

export type PatternCategory = "basic" | "character_class" | "quantifier_preset";

export type PatternDef = {
  type: PatternType;
  labelKey: keyof TranslationDict;
  descKey: keyof TranslationDict;
  preview: string;
  category: PatternCategory;
};

export const PATTERN_DEFS: PatternDef[] = [
  // Basic
  {
    type: "exact",
    labelKey: "patExactLabel",
    descKey: "patExactDesc",
    preview: "abc",
    category: "basic",
  },
  {
    type: "any_char",
    labelKey: "patAnyCharLabel",
    descKey: "patAnyCharDesc",
    preview: ".",
    category: "basic",
  },
  {
    type: "any_chars",
    labelKey: "patAnyCharsLabel",
    descKey: "patAnyCharsDesc",
    preview: ".+",
    category: "basic",
  },

  // Character classes
  {
    type: "digit",
    labelKey: "patDigitLabel",
    descKey: "patDigitDesc",
    preview: "\\d",
    category: "character_class",
  },
  {
    type: "digits",
    labelKey: "patDigitsLabel",
    descKey: "patDigitsDesc",
    preview: "\\d+",
    category: "character_class",
  },
  {
    type: "letter",
    labelKey: "patLetterLabel",
    descKey: "patLetterDesc",
    preview: "[a-zA-Z]",
    category: "character_class",
  },
  {
    type: "letters",
    labelKey: "patLettersLabel",
    descKey: "patLettersDesc",
    preview: "[a-zA-Z]+",
    category: "character_class",
  },
  {
    type: "uppercase",
    labelKey: "patUppercaseLabel",
    descKey: "patUppercaseDesc",
    preview: "[A-Z]+",
    category: "character_class",
  },
  {
    type: "lowercase",
    labelKey: "patLowercaseLabel",
    descKey: "patLowercaseDesc",
    preview: "[a-z]+",
    category: "character_class",
  },
  {
    type: "alphanumeric",
    labelKey: "patAlphanumericLabel",
    descKey: "patAlphanumericDesc",
    preview: "[a-zA-Z0-9]",
    category: "character_class",
  },
  {
    type: "alphanumerics",
    labelKey: "patAlphanumericsLabel",
    descKey: "patAlphanumericsDesc",
    preview: "[a-zA-Z0-9]+",
    category: "character_class",
  },
  {
    type: "word_char",
    labelKey: "patWordCharLabel",
    descKey: "patWordCharDesc",
    preview: "\\w",
    category: "character_class",
  },
  {
    type: "word_chars",
    labelKey: "patWordCharsLabel",
    descKey: "patWordCharsDesc",
    preview: "\\w+",
    category: "character_class",
  },
  {
    type: "whitespace",
    labelKey: "patWhitespaceLabel",
    descKey: "patWhitespaceDesc",
    preview: "\\s",
    category: "character_class",
  },
  {
    type: "whitespaces",
    labelKey: "patWhitespacesLabel",
    descKey: "patWhitespacesDesc",
    preview: "\\s+",
    category: "character_class",
  },
  {
    type: "unicode_letter",
    labelKey: "patUnicodeLetterLabel",
    descKey: "patUnicodeLetterDesc",
    preview: "\\p{L}",
    category: "character_class",
  },
  {
    type: "unicode_letters",
    labelKey: "patUnicodeLettersLabel",
    descKey: "patUnicodeLettersDesc",
    preview: "\\p{L}+",
    category: "character_class",
  },
  {
    type: "czech_letter",
    labelKey: "patCzechLetterLabel",
    descKey: "patCzechLetterDesc",
    preview: "[a-zA-Záčď…]",
    category: "character_class",
  },
  {
    type: "czech_letters",
    labelKey: "patCzechLettersLabel",
    descKey: "patCzechLettersDesc",
    preview: "[a-zA-Záčď…]+",
    category: "character_class",
  },
  {
    type: "czech_alphanumeric",
    labelKey: "patCzechAlphanumLabel",
    descKey: "patCzechAlphanumDesc",
    preview: "[a-zA-Z0-9áčď…]",
    category: "character_class",
  },
  {
    type: "czech_alphanumerics",
    labelKey: "patCzechAlphanumsLabel",
    descKey: "patCzechAlphanumsDesc",
    preview: "[a-zA-Z0-9áčď…]+",
    category: "character_class",
  },
  {
    type: "custom_class",
    labelKey: "patCustomClassLabel",
    descKey: "patCustomClassDesc",
    preview: "[...]",
    category: "character_class",
  },
];

export const CATEGORIES: { key: PatternCategory; labelKey: keyof TranslationDict }[] = [
  { key: "basic", labelKey: "catBasic" },
  { key: "character_class", labelKey: "catCharacterClass" },
];

export function getPatternDef(type: PatternType): PatternDef | undefined {
  return PATTERN_DEFS.find((p) => p.type === type);
}

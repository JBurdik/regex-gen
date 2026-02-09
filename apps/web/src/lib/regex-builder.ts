import type { GroupType, PatternType, Quantifier, Segment } from "./types";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function patternFragment(segment: Segment): string {
  const { patternType, text, customClass } = segment;

  const map: Record<PatternType, () => string> = {
    exact: () => escapeRegex(text),
    any_char: () => ".",
    any_chars: () => ".+",
    digit: () => "\\d",
    digits: () => "\\d+",
    letter: () => "[a-zA-Z]",
    letters: () => "[a-zA-Z]+",
    alphanumeric: () => "[a-zA-Z0-9]",
    alphanumerics: () => "[a-zA-Z0-9]+",
    whitespace: () => "\\s",
    whitespaces: () => "\\s+",
    word_char: () => "\\w",
    word_chars: () => "\\w+",
    unicode_letter: () => "\\p{L}",
    unicode_letters: () => "\\p{L}+",
    uppercase: () => "[A-Z]+",
    lowercase: () => "[a-z]+",
    czech_letter: () => "[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]",
    czech_letters: () => "[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+",
    czech_alphanumeric: () => "[a-zA-Z0-9áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]",
    czech_alphanumerics: () => "[a-zA-Z0-9áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+",
    custom_class: () => `[${customClass ?? ""}]`,
  };

  return map[patternType]();
}

function applyQuantifier(fragment: string, quantifier?: Quantifier): string {
  if (!quantifier || quantifier === "one") return fragment;

  // Wrap multi-char fragments in a non-capturing group for quantifier application
  const base = fragment.length > 1 ? `(?:${fragment})` : fragment;

  if (quantifier === "one_or_more") return `${base}+`;
  if (quantifier === "zero_or_more") return `${base}*`;
  if (quantifier === "optional") return `${base}?`;
  if (quantifier === "lazy") return `${base}+?`;
  if (typeof quantifier === "object") {
    if ("exactly" in quantifier) return `${base}{${quantifier.exactly}}`;
    if ("min" in quantifier && "max" in quantifier)
      return `${base}{${quantifier.min},${quantifier.max}}`;
  }
  return fragment;
}

function applyGroup(
  fragment: string,
  groupType?: GroupType,
  groupName?: string,
): string {
  if (!groupType) return fragment;

  switch (groupType) {
    case "capture":
      return `(${fragment})`;
    case "named":
      return `(?<${groupName ?? "group"}>${fragment})`;
    case "non_capturing":
      return `(?:${fragment})`;
    case "lookahead":
      return `(?=${fragment})`;
    case "neg_lookahead":
      return `(?!${fragment})`;
    case "lookbehind":
      return `(?<=${fragment})`;
    case "neg_lookbehind":
      return `(?<!${fragment})`;
    default:
      return fragment;
  }
}

export function buildRegex(segments: Segment[]): string {
  return segments
    .map((seg) => {
      let frag = patternFragment(seg);
      frag = applyQuantifier(frag, seg.quantifier);
      frag = applyGroup(frag, seg.groupType, seg.groupName);
      return frag;
    })
    .join("");
}

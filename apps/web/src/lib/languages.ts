import type { TranslationDict } from "@/i18n/translations/en";
import type { Language } from "./types";

export type LanguageOutput = {
  language: Language;
  labelKey: keyof TranslationDict;
  pattern: string;
  formatted: string;
  snippet: string;
  warningKeys: (keyof TranslationDict)[];
};

type LanguageAdapter = {
  labelKey: keyof TranslationDict;
  format: (pattern: string) => { formatted: string; snippet: string };
  getWarningKeys: (pattern: string) => (keyof TranslationDict)[];
};

function hasUnicodeProperty(pattern: string): boolean {
  return /\\p\{/.test(pattern);
}

function hasLookaround(pattern: string): boolean {
  return /\(\?[<!=]/.test(pattern);
}

function hasNamedGroup(pattern: string): boolean {
  return /\(\?<[a-zA-Z]/.test(pattern);
}

const adapters: Record<Language, LanguageAdapter> = {
  javascript: {
    labelKey: "langJavascript",
    format: (pattern) => {
      const flags = hasUnicodeProperty(pattern) ? "gu" : "g";
      return {
        formatted: `/${pattern}/${flags}`,
        snippet: `const regex = /${pattern}/${flags};\nconst matches = text.match(regex);`,
      };
    },
    getWarningKeys: () => [],
  },

  python: {
    labelKey: "langPython",
    format: (pattern) => {
      // Python uses (?P<name>...) syntax for named groups
      const pyPattern = pattern.replace(
        /\(\?<([a-zA-Z_]\w*)>/g,
        "(?P<$1>",
      );
      return {
        formatted: `r'${pyPattern}'`,
        snippet: `import re\n\npattern = re.compile(r'${pyPattern}')\nmatches = pattern.findall(text)`,
      };
    },
    getWarningKeys: (pattern) => {
      const keys: (keyof TranslationDict)[] = [];
      if (hasUnicodeProperty(pattern)) {
        keys.push("warnPythonUnicode");
      }
      return keys;
    },
  },

  php: {
    labelKey: "langPhp",
    format: (pattern) => {
      const flags = hasUnicodeProperty(pattern) ? "u" : "";
      const escaped = pattern.replace(/'/g, "\\'");
      return {
        formatted: `'/${escaped}/${flags}'`,
        snippet: `$pattern = '/${escaped}/${flags}';\npreg_match_all($pattern, $text, $matches);`,
      };
    },
    getWarningKeys: () => [],
  },

  go: {
    labelKey: "langGo",
    format: (pattern) => ({
      formatted: "`" + pattern + "`",
      snippet: `import "regexp"\n\nre := regexp.MustCompile(` + "`" + pattern + "`" + `)\nmatches := re.FindAllString(text, -1)`,
    }),
    getWarningKeys: (pattern) => {
      const keys: (keyof TranslationDict)[] = [];
      if (hasLookaround(pattern)) {
        keys.push("warnGoLookaround");
      }
      return keys;
    },
  },

  rust: {
    labelKey: "langRust",
    format: (pattern) => {
      const escaped = pattern.replace(/"/g, '\\"');
      return {
        formatted: `r"${escaped}"`,
        snippet: `use regex::Regex;\n\nlet re = Regex::new(r"${escaped}").unwrap();\nlet matches: Vec<&str> = re.find_iter(text).map(|m| m.as_str()).collect();`,
      };
    },
    getWarningKeys: (pattern) => {
      const keys: (keyof TranslationDict)[] = [];
      if (hasLookaround(pattern)) {
        keys.push("warnRustLookaround");
      }
      return keys;
    },
  },

  java: {
    labelKey: "langJava",
    format: (pattern) => {
      const escaped = pattern.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return {
        formatted: `"${escaped}"`,
        snippet: `import java.util.regex.*;\n\nPattern pattern = Pattern.compile("${escaped}");\nMatcher matcher = pattern.matcher(text);\nwhile (matcher.find()) {\n    System.out.println(matcher.group());\n}`,
      };
    },
    getWarningKeys: () => [],
  },

  ruby: {
    labelKey: "langRuby",
    format: (pattern) => ({
      formatted: `/${pattern}/`,
      snippet: `matches = text.scan(/${pattern}/)`,
    }),
    getWarningKeys: () => [],
  },

  c: {
    labelKey: "langC",
    format: (pattern) => {
      const escaped = pattern.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return {
        formatted: `"${escaped}"`,
        snippet: `#include <regex.h>\n\nregex_t regex;\nregcomp(&regex, "${escaped}", REG_EXTENDED);\nregexec(&regex, text, 0, NULL, 0);\nregfree(&regex);`,
      };
    },
    getWarningKeys: (pattern) => {
      const keys: (keyof TranslationDict)[] = [];
      if (hasLookaround(pattern)) {
        keys.push("warnCLookaround");
      }
      if (/\\d|\\w|\\s/.test(pattern)) {
        keys.push("warnCShorthand");
      }
      if (hasUnicodeProperty(pattern)) {
        keys.push("warnCUnicode");
      }
      if (hasNamedGroup(pattern)) {
        keys.push("warnCNamedGroup");
      }
      return keys;
    },
  },
};

export const ALL_LANGUAGES: Language[] = [
  "javascript",
  "python",
  "php",
  "go",
  "rust",
  "java",
  "ruby",
  "c",
];

export function formatForLanguage(
  pattern: string,
  language: Language,
): LanguageOutput {
  const adapter = adapters[language];
  const { formatted, snippet } = adapter.format(pattern);
  const warningKeys = adapter.getWarningKeys(pattern);

  return {
    language,
    labelKey: adapter.labelKey,
    pattern,
    formatted,
    snippet,
    warningKeys,
  };
}

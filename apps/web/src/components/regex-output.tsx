import { Check, Copy, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ALL_LANGUAGES, formatForLanguage } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { useT } from "@/i18n";

type RegexOutputProps = {
  pattern: string;
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
};

export function RegexOutput({
  pattern,
  selectedLanguage,
  onLanguageChange,
}: RegexOutputProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { t } = useT();

  async function copyToClipboard(text: string, field: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(t.copiedToClipboard);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error(t.failedToCopy);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t.rawPatternLabel}</label>
        <div className="group relative">
          <pre className="rounded-md border bg-muted/50 p-3 font-mono text-sm overflow-x-auto">
            {pattern || <span className="text-muted-foreground italic">{t.rawPatternEmpty}</span>}
          </pre>
          {pattern && (
            <Button
              variant="ghost"
              size="icon-xs"
              className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(pattern, "pattern")}
            >
              {copiedField === "pattern" ? (
                <Check className="size-3" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={selectedLanguage}
        onValueChange={(val) => onLanguageChange(val as Language)}
      >
        <TabsList className="flex-wrap h-auto">
          {ALL_LANGUAGES.map((lang) => {
            const info = formatForLanguage(pattern, lang);
            return (
              <TabsTrigger key={lang} value={lang}>
                {t[info.labelKey]}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {ALL_LANGUAGES.map((lang) => {
          const info = formatForLanguage(pattern, lang);
          return (
            <TabsContent key={lang} value={lang}>
              <div className="space-y-2">
                {info.warningKeys.length > 0 && (
                  <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-xs text-amber-700 dark:text-amber-300">
                    <AlertTriangle className="size-3.5 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      {info.warningKeys.map((key) => (
                        <p key={key}>{t[key]}</p>
                      ))}
                    </div>
                  </div>
                )}
                <div className="group relative">
                  <pre className="rounded-md border bg-muted/50 p-3 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                    {info.snippet || "—"}
                  </pre>
                  {info.snippet && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(info.snippet, lang)}
                    >
                      {copiedField === lang ? (
                        <Check className="size-3" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

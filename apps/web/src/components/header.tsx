import { Link } from "@tanstack/react-router";
import { Regex } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useT } from "@/i18n";
import type { Locale } from "@/i18n";

const LOCALE_OPTIONS: { value: Locale; flag: string; label: string }[] = [
  { value: "en", flag: "🇬🇧", label: "English" },
  { value: "cs", flag: "🇨🇿", label: "Čeština" },
];

export default function Header() {
  const { locale, setLocale, t } = useT();

  const current = LOCALE_OPTIONS.find((o) => o.value === locale)!;

  return (
    <header className="border-b">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Regex className="size-5" />
          {t.brand}
        </Link>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon">
                  <span className="text-base leading-none">{current.flag}</span>
                  <span className="sr-only">{t.toggleLanguage}</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              {LOCALE_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setLocale(opt.value)}
                  className={locale === opt.value ? "bg-accent" : ""}
                >
                  <span className="text-base leading-none">{opt.flag}</span>
                  <span>{opt.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

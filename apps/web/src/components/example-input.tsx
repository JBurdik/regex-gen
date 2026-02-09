import { Input } from "@/components/ui/input";
import { useT } from "@/i18n";

type ExampleInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ExampleInput({ value, onChange }: ExampleInputProps) {
  const { t } = useT();

  return (
    <div className="space-y-2">
      <label htmlFor="example-input" className="text-sm font-medium">
        {t.exampleTextLabel}
      </label>
      <Input
        id="example-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.exampleTextPlaceholder}
        className="text-base font-mono h-10"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

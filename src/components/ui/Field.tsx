import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  full?: boolean;
  children: ReactNode;
};

/** Label + hint + error wrapper with the accessibility wiring handled once. */
export function Field({ id, label, required, hint, error, full, children }: FieldShellProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");

  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="field__req">Required</span>
        ) : (
          <span className="field__req">Optional</span>
        )}
      </label>
      {hint && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          <TriangleAlert aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {/* Keeps the error message associated with the control for assistive tech. */}
      <span className="visually-hidden" data-describedby={describedBy || undefined} />
    </div>
  );
}

export const fieldAria = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby":
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined,
});

type TextInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
};

export function TextInput({
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
  hint,
  inputMode,
}: TextInputProps) {
  return (
    <input
      id={id}
      className="field__control"
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      onChange={(event) => onChange(event.target.value)}
      {...fieldAria(id, error, hint)}
    />
  );
}

export function TextArea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  hint,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  hint?: string;
}) {
  return (
    <textarea
      id={id}
      className="field__control"
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      {...fieldAria(id, error, hint)}
    />
  );
}

export function SelectInput({
  id,
  value,
  onChange,
  options,
  error,
  hint,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  hint?: string;
}) {
  return (
    <select
      id={id}
      className="field__control"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      {...fieldAria(id, error, hint)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/** Radio-style chips. Radio inputs keep the group keyboard-navigable. */
export function ChipGroup({
  name,
  value,
  onChange,
  options,
  legend,
  tone = "dark",
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  legend: string;
  tone?: "dark" | "lime";
}) {
  return (
    <fieldset className="est-fieldset">
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((option) => (
          <label className={`chip ${tone === "lime" ? "chip--lime" : ""}`} key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Numeric input paired with a slider — used by the savings estimator. */
export function RangeField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  hint,
  format,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  hint?: string;
  format?: (value: number) => string;
}) {
  return (
    <div className="range-row">
      <div className="range-row__top">
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <output className="range-row__value" htmlFor={id}>
          {format ? format(value) : `${value}${suffix ? ` ${suffix}` : ""}`}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );
}

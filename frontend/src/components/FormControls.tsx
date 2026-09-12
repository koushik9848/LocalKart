import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

type FieldProps = { label?: string; error?: string; hint?: string; required?: boolean };

function FieldMessage({ error, hint }: Pick<FieldProps, "error" | "hint">) {
  if (error) return <span className="field-error" role="alert">{error}</span>;
  return hint ? <span className="field-hint">{hint}</span> : null;
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput({ label, error, hint, required, id, className = "", ...props }, ref) {
  const inputId = id ?? props.name ?? "text-input";
  const input = <input ref={ref} id={inputId} className={["form-control", error ? "has-error" : "", className].filter(Boolean).join(" ")} required={required} aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? `${inputId}-message` : undefined} {...props} />;
  if (!label) return input;
  return <label className="form-field" htmlFor={inputId}><span className="field-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</span>{input}<span id={`${inputId}-message`}><FieldMessage error={error} hint={hint} /></span></label>;
});

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, error, hint, required, id, className = "", ...props }, ref) {
  const textareaId = id ?? props.name ?? "textarea";
  const textarea = <textarea ref={ref} id={textareaId} className={["form-control", error ? "has-error" : "", className].filter(Boolean).join(" ")} required={required} aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? `${textareaId}-message` : undefined} {...props} />;
  if (!label) return textarea;
  return <label className="form-field" htmlFor={textareaId}><span className="field-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</span>{textarea}<span id={`${textareaId}-message`}><FieldMessage error={error} hint={hint} /></span></label>;
});

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, error, hint, required, id, className = "", children, ...props }, ref) {
  const selectId = id ?? props.name ?? "select";
  const select = <select ref={ref} id={selectId} className={["form-control", "form-select", error ? "has-error" : "", className].filter(Boolean).join(" ")} required={required} aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? `${selectId}-message` : undefined} {...props}>{children}</select>;
  if (!label) return select;
  return <label className="form-field" htmlFor={selectId}><span className="field-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</span>{select}<span id={`${selectId}-message`}><FieldMessage error={error} hint={hint} /></span></label>;
});

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export function Checkbox({ label, error, hint, required, id, className = "", ...props }: CheckboxProps) {
  const checkboxId = id ?? props.name ?? "checkbox";
  return <label className="checkbox-field" htmlFor={checkboxId}><input {...props} id={checkboxId} className={className} type="checkbox" required={required} aria-invalid={error ? "true" : undefined} /><span>{label}{required ? <span aria-hidden="true"> *</span> : null}</span>{error ? <span className="field-error" role="alert">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}</label>;
}

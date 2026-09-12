import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./FormControls";

type SearchBarProps = { value: string; onChange: (value: string) => void; loading?: boolean };

export function SearchBar({ value, onChange, loading = false }: SearchBarProps) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { const timeout = window.setTimeout(() => onChange(draft), 250); return () => window.clearTimeout(timeout); }, [draft, onChange]);
  useEffect(() => { setDraft(value); }, [value]);
  return <div className="search-bar"><span className="search-icon" aria-hidden="true">⌕</span><TextInput className="search-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search products, shops or categories" aria-label="Search products, shops or categories" />{loading ? <span className="search-state">...</span> : draft ? <Button variant="ghost" iconOnly className="clear-button" onClick={() => setDraft("")} aria-label="Clear search">×</Button> : null}</div>;
}

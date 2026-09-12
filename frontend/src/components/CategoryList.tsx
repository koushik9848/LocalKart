import type { Category } from "../types";
import { Button } from "./Button";

type CategoryListProps = { categories: Category[]; selectedId: number | null; onSelect: (id: number | null) => void };

const symbols = ["✦", "◌", "◆", "⌂", "◈"];

export function CategoryList({ categories, selectedId, onSelect }: CategoryListProps) {
  return <div className="category-list" role="list" aria-label="Browse categories">
    <Button variant="ghost" className={selectedId === null ? "category-pill is-active" : "category-pill"} onClick={() => onSelect(null)}><span>◎</span> All items</Button>
    {categories.map((category, index) => <Button variant="ghost" className={selectedId === category.id ? "category-pill is-active" : "category-pill"} key={category.id} onClick={() => onSelect(category.id)}><span>{symbols[index % symbols.length]}</span>{category.name}</Button>)}
  </div>;
}

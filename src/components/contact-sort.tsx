"use client";

import { useState, useEffect } from "react";

interface ContactSortProps {
  onSortChange: (order: "asc" | "desc") => void;
}

export function ContactSort({ onSortChange }: ContactSortProps) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    onSortChange(order);
  }, [order, onSortChange]);

  return (
    <div className="d-flex gap-2 mb-3 align-items-center">
      <label className="mb-0">Сортировка по времени:</label>
      <select
        className="form-select w-auto"
        value={order}
        onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
      >
        <option value="desc">Сначала новые</option>
        <option value="asc">Сначала старые</option>
      </select>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

interface ContactSortProps {
  onSortChange: (order: "asc" | "desc") => void;
}

export function ContactSort({ onSortChange }: ContactSortProps) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    onSortChange(order);
  }, [order, onSortChange]);

  return (
    <div className="d-flex gap-2 mb-3 align-items-center w-100">
      <Form.Label className="mb-0 w-100">
        <p className="visually-hidden">Сортировка по времени:</p>
        <Form.Select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="w-100"
        >
          <option value="desc">New</option>
          <option value="asc">Old</option>
        </Form.Select>
      </Form.Label>
    </div>
  );
}

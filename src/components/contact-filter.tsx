"use client";

import { useState, useEffect } from "react";
import { ContactType } from "@/components/contact-form";
import { Form } from "react-bootstrap";

interface ContactFilterProps {
  onFilterChange: (filterText: string, filterType: ContactType | "") => void;
}

export function ContactFilter({ onFilterChange }: ContactFilterProps) {
  const [text, setText] = useState("");
  const [type, setType] = useState<ContactType | "">("");

  useEffect(() => {
    onFilterChange(text, type);
  }, [text, type, onFilterChange]);

  return (
    <div className="d-flex gap-2 mb-3">
      <Form.Control
        type="text"
        placeholder="Search contact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Form.Select
        aria-label="Select type contacts"
        value={type}
        onChange={(e) => setType(e.target.value as ContactType | "")}
      >
        <option value="">All types</option>
        <option value={ContactType.PHONE}>Phone</option>
        <option value={ContactType.EMAIL}>Email</option>
      </Form.Select>
    </div>
  );
}

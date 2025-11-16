"use client";

import { useState } from "react";
import type { ContactType } from "@/features/ contacts/form/schema";
import { useContacts } from "@/features/ contacts/store/contacts-store";
import { ContactCard } from "./contact-card";
import EmptyState from "./contact-card-empty";
import { ContactFilter } from "./contact-filter";
import { ContactSort } from "./contact-sort";

export default function ContactList() {
  const { state } = useContacts();
  const { contactList } = state;

  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState<ContactType | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredContacts = contactList
    .filter((c) => {
      const matchesText =
        c.value.toLowerCase().includes(filterText.toLowerCase()) ||
        (c.description?.toLowerCase().includes(filterText.toLowerCase()) ??
          false);
      const matchesType = filterType ? c.type === filterType : true;
      return matchesText && matchesType;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt,
    );

  return (
    <div className="d-flex flex-column gap-3 flex-grow-1">
      <ContactFilter
        onFilterChange={(text, type) => {
          setFilterText(text);
          setFilterType(type);
        }}
      />

      <ContactSort onSortChange={(order) => setSortOrder(order)} />

      {filteredContacts.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="list-unstyled d-flex flex-column gap-3 flex-grow-1">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
}

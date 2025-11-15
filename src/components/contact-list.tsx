"use client";

import { useContacts } from "@/components/contacts-store";
import { ContactCard } from "./contact-card";

export default function ContactList() {
  const { state } = useContacts();
  const { contactList } = state;

  if (contactList.length === 0) {
    return <p>Нет контактов</p>;
  }

  return (
    <ul className="list-unstyled d-flex flex-column gap-3 flex-grow-1">
      {contactList.map((contact) => (
        <ContactCard
          key={contact.id}
          type={contact.type}
          value={contact.value}
          description={contact.description || ""}
          id={contact.id}
        />
      ))}
    </ul>
  );
}

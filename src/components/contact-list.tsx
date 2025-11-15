import React from "react";
import { ContactCard } from "./contact-card";
import { Contact } from "./storage";

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  if (contacts.length === 0) return <p>Нет контактов</p>;

  return (
    <ul className="list-unstyled d-flex flex-column gap-3 flex-grow-1">
      {contacts.map((contact, index) => (
        <ContactCard
          key={index}
          firstName={contact.firstName}
          lastName={contact.lastName}
          email={contact.email}
          phone={contact.phone}
        />
      ))}
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import { ContactDetailsPanel } from "./contact-details-panel";
import ContactList from "./contact-list";
import { Contact, getContacts } from "@/utils/storage";

export default function ContactsSplitView() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(getContacts()); // загружаем контакты из LocalStorage
  }, []);

  return (
    <div className="d-flex gap-3 container">
      <ContactList contacts={contacts} />
      {contacts[0] && (
        <ContactDetailsPanel
          firstName={contacts[0].firstName}
          lastName={contacts[0].lastName}
          email={contacts[0].email}
          phone={contacts[0].phone}
          notes="This is a sample note."
          onNotesChange={() => {}}
        />
      )}
    </div>
  );
}

import React from "react";
import { ContactDetailsPanel } from "./contact-details-panel";
import ContactList from "./contact-list";

export default function ContactsSplitView() {
  return (
    <div className="d-flex gap-3 container">
      <ContactList />
      <ContactDetailsPanel
        firstName="Ivan"
        lastName="Petrov"
        email="ivan.petrov@example.com"
        phone="+1 (555) 123-4567"
        notes="This is a sample note."
        onNotesChange={() => {}}
      />
    </div>
  );
}

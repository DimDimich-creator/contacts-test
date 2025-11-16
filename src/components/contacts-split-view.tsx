'use client";';
import { ContactDetailsPanel } from "./contact-details-panel";
import ContactList from "./contact-list";

export default function ContactsSplitView() {
  return (
    <div className="d-flex gap-3">
      <ContactList />
      <ContactDetailsPanel />
    </div>
  );
}

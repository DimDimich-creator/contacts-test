'use client";';

import { ContactDetailsPanel } from "../details/contact-details-panel";
import ContactList from "../list/contact-list";

export default function ContactsSplitView() {
  return (
    <div className="d-flex gap-3">
      <ContactList />
      <ContactDetailsPanel />
    </div>
  );
}

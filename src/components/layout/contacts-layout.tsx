"use client";

import { Button } from "react-bootstrap";
import { useState } from "react";
import ContactsSplitView from "../contacts-split-view";
import ContactModal from "../contact-modal";
import { ContactsProvider } from "../contacts-store";
import { Toaster } from "sonner";

export default function ContactsLayout() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ContactsProvider>
      <div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create Contact
        </Button>

        <ContactsSplitView />

        <ContactModal
          show={showModal}
          onHide={() => setShowModal(false)}
          mode="create"
          defaultValues={{}}
        />
        <Toaster position="top-center" richColors />
      </div>
    </ContactsProvider>
  );
}

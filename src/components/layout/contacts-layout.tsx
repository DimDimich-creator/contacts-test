"use client";

import { Button } from "react-bootstrap";
import { useState } from "react";
import ContactsSplitView from "../contacts-split-view";
import ContactModal from "../contact-modal";
import { ContactsProvider } from "../contacts-store";
import { Toaster } from "sonner";
import { Plus } from "lucide-react";
import { ModeToggleBootstrap } from "../mode-toggle";

export default function ContactsLayout() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ContactsProvider>
      <main className="container mt-5 flex-grow-1">
        <Button
          variant="outline-primary"
          onClick={() => setShowModal(true)}
          className="w-100 mb-3 d-flex gap-2 align-items-center justify-content-center "
        >
          Create contact
          <Plus />
        </Button>

        <ContactsSplitView />

        <ContactModal
          show={showModal}
          onHide={() => setShowModal(false)}
          mode="create"
          defaultValues={{}}
        />
        <Toaster position="top-center" richColors />
      </main>
    </ContactsProvider>
  );
}

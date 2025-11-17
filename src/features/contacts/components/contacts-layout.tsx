"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Toaster } from "sonner";
import ContactModal from "@/features/contacts/modal/contact-modal";
import { ContactsProvider } from "../store";
import ContactsSplitView from "./contacts-split-view";

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

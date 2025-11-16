"use client";

import { Card, Image, Form } from "react-bootstrap";

import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Contact, useContacts } from "@/components/contacts-store";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { ContactType } from "./contact-form/schema";

export function ContactDetailsPanel() {
  const { state, updateContact } = useContacts();
  const searchParams = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { contactList } = state;

  // Находим контакт с нужным id
  const contact = contactList.find((c) => c.id === contactId);

  if (!contact) {
    return (
      <Card
        className="p-4 shadow-sm flex-shrink-0 d-md-flex align-items-center justify-content-center d-none"
        style={{ width: "450px", height: "500px" }}
      >
        <h3 className="">Contact not selected</h3>
        <p className="">Select a contact from the left list</p>
      </Card>
    );
  }

  const { type, value, description } = contact;
  const avatar = createAvatar(lorelei, { seed: contact.id });

  const handleDescriptionChange = (newDescription: string) => {
    updateContact({ ...contact, description: newDescription });
  };

  return (
    <Card
      className="p-4 shadow-sm h-100 flex-shrink-0 d-none d-lg-block"
      style={{ width: "450px" }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        <Image
          src={avatar.toDataUri()}
          alt={value}
          roundedCircle
          width={120}
          height={120}
        />
        <div className="text-muted d-flex gap-3 align-items-center justify-content-center">
          {type === ContactType.PHONE ? <Phone /> : <Mail />}
          <p className="m-0">{value}</p>
        </div>

        <hr className="w-100" />

        <div className="w-100">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Leave a note…"
            onChange={(e) => handleDescriptionChange(e.target.value)}
            value={description || ""}
          />
        </div>
      </div>
    </Card>
  );
}

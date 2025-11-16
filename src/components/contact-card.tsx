"use client";

import { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useSearchParams, useRouter } from "next/navigation";
import ContactForm, { ContactFormData, ContactType } from "./contact-form";
import { Contact, useContacts } from "@/components/contacts-store";
import ContactModal from "./contact-modal";
import { Mail, Phone } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const { id, type, value, description } = contact;
  const avatar = createAvatar(lorelei, { seed: id });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, removeContact, updateContact } = useContacts();
  const { contactList } = state;
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("contactId", id);
    router.push(`?${params.toString()}`);
  };

  const handleDelete = () => {
    removeContact(id);
  };

  const handleEdit = (data: ContactFormData) => {
    const existing = contactList.find((c) => c.id === id);
    if (!existing) return;
    updateContact({ ...existing, ...data });
    setShowModal(false);
  };

  return (
    <>
      <Card
        className="d-flex flex-row align-items-center p-2 gap-3 shadow-sm"
        as="li"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Image
          src={avatar.toDataUri()}
          alt={`${type} ${value}`}
          roundedCircle
          width={64}
          height={64}
        />

        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex gap-2">
            {type === ContactType.PHONE ? <Phone /> : <Mail />}
            <div className="fw-semibold fs-6 fs-md-5 text-clamp-1">{value}</div>
          </div>
          {/* {description && (
            <p className="text-muted fs-7 fs-md-6 text-clamp-1 m-0">
              {description}
            </p>
          )} */}
        </div>

        <div className="d-flex flex-column flex-md-row gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </Button>
        </div>
      </Card>

      <ContactModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode="edit"
        defaultValues={contact}
      />
    </>
  );
}

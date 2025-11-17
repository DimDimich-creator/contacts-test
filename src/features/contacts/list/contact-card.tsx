"use client";

import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Mail, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";

import { ContactType } from "../form/schema";
import ContactModal from "../modal/contact-modal";
import { type Contact, useContacts } from "../store";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const { id, type, value, description } = contact;
  const avatar = createAvatar(lorelei, { seed: id });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { removeContact } = useContacts();

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("contactId", id);
    router.push(`?${params.toString()}`);
  };

  const handleDelete = () => {
    removeContact(id);
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
          {description && (
            <p className="text-muted fs-7 fs-md-6 text-clamp-1 m-1 d-sm-none">
              {description}
            </p>
          )}
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

"use client";

import { useState } from "react";
import { Card, Image, Button, Modal } from "react-bootstrap";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useSearchParams, useRouter } from "next/navigation";
import ContactForm, { ContactFormData, ContactType } from "./contact-form";
import { useContacts } from "@/components/contacts-store";
import ContactModal from "./contact-modal";

interface ContactCardProps {
  type: ContactType;
  value: string;
  description?: string;
  id: string;
}

export function ContactCard({
  type,
  value,
  description = "",
  id,
}: ContactCardProps) {
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
    // ищем существующий контакт в состоянии
    const existing = contactList.find((c) => c.id === id);
    if (!existing) return;

    updateContact({ ...existing, ...data }); // сохраняем createdAt и остальные поля
    setShowModal(false);
  };

  return (
    <>
      <Card
        className="d-flex flex-row align-items-center p-2 gap-3 shadow-sm"
        as="li"
        style={{ cursor: "pointer" }}
      >
        <Image
          src={avatar.toDataUri()}
          alt={`${type} ${value}`}
          roundedCircle
          width={64}
          height={64}
          onClick={handleClick}
        />

        <div className="d-flex flex-column flex-grow-1" onClick={handleClick}>
          <div className="fw-semibold fs-5">
            {type} {value}
          </div>
          <div className="text-muted">{description}</div>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            Редактировать
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </Card>

      <ContactModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode="edit"
        defaultValues={{ id, type, value, description }}
      />
    </>
  );
}

"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ContactForm from "./contact-form";
import { ContactFormData } from "./contact-form";

interface ContactModalProps {
  show: boolean;
  onHide: () => void;
  defaultValues?: Partial<ContactFormData>;
  mode?: "create" | "edit";
}

export default function ContactModal({
  show,
  onHide,
  defaultValues,
  mode = "create",
}: ContactModalProps) {
  const title = mode === "edit" ? "Редактировать контакт" : "Создать контакт";

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm onSuccess={onHide} defaultValues={defaultValues} />
      </Modal.Body>
    </Modal>
  );
}

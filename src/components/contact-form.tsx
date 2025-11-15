"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container, Alert } from "react-bootstrap";

import { useContacts } from "@/components/contacts-store";
import z from "zod";

export enum ContactType {
  PHONE = "phone",
  EMAIL = "email",
}

export const ContactSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.nativeEnum(ContactType, { message: "Выберите тип контакта" }),
  value: z
    .string()
    .min(3, "Слишком короткое значение")
    .max(100, "Слишком длинное значение"),
  description: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactForm({
  onSuccess,
}: {
  onSuccess?: () => void; // удобно для закрытия модалки
}) {
  const { addContact } = useContacts();

  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema.omit({ id: true })),
  });

  const onSubmit = (data: ContactFormData) => {
    addContact(data);

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      reset();
      onSuccess?.(); // закрыть модалку/оффканвас
    }, 1500);
  };

  return (
    <Container style={{ maxWidth: 500 }}>
      <h3>Создать контакт</h3>

      {showAlert && (
        <Alert variant="success" className="mt-3">
          Контакт создан
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        {/* Тип */}
        <Form.Group className="mb-3">
          <Form.Label>Тип</Form.Label>
          <Form.Select {...register("type")} isInvalid={!!errors.type}>
            <option value="">Выберите тип</option>
            <option value={ContactType.PHONE}>Телефон</option>
            <option value={ContactType.EMAIL}>Email</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.type?.message as string}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Значение */}
        <Form.Group className="mb-3">
          <Form.Label>Значение</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите значение"
            {...register("value")}
            isInvalid={!!errors.value}
          />
          <Form.Control.Feedback type="invalid">
            {errors.value?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Описание */}
        <Form.Group className="mb-3">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите описание"
            {...register("description")}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
}

"use client";

import React, { useState, useEffect } from "react";
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

interface ContactFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ContactFormData>; // сюда передаем контакт для редактирования
}

export default function ContactForm({
  onSuccess,
  defaultValues,
}: ContactFormProps) {
  const { addContact, updateContact, state } = useContacts();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema.omit({ id: true })),
    defaultValues: defaultValues || {}, // устанавливаем defaultValues
  });

  // Если defaultValues пришли позже (например, при открытии модалки), обновляем форму
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: ContactFormData) => {
    const { contactList } = state;

    if (defaultValues?.id) {
      // редактируем существующий контакт
      const existing = contactList.find((c) => c.id === defaultValues.id);
      if (!existing) return;

      updateContact({ ...existing, ...data }); // сохраняем createdAt
    } else {
      // создаем новый контакт, id будет создан внутри стора
      addContact({ ...data, createdAt: Date.now() });
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      reset();
      onSuccess?.();
    }, 1500);
  };

  return (
    <Container style={{ maxWidth: 500 }}>
      <h3>{defaultValues?.id ? "Редактировать контакт" : "Создать контакт"}</h3>

      {showAlert && (
        <Alert variant="success" className="mt-3">
          Контакт {defaultValues?.id ? "обновлен" : "создан"}
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

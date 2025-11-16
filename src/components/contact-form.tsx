"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container } from "react-bootstrap";
import { useContacts } from "@/components/contacts-store";
import z from "zod";
import { toast } from "sonner";

export enum ContactType {
  PHONE = "phone",
  EMAIL = "email",
}

export const ContactSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().optional(),
    createdAt: z.number().optional(),
    type: z.literal(ContactType.EMAIL),
    value: z.email(),
    description: z.string().optional(),
  }),

  z.object({
    id: z.string().optional(),
    createdAt: z.number().optional(),
    type: z.literal(ContactType.PHONE),
    value: z.e164(),
    description: z.string().optional(),
  }),
]);

export type ContactFormData = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ContactFormData>; // передаем контакт для редактирования
}

export default function ContactForm({
  onSuccess,
  defaultValues,
}: ContactFormProps) {
  const { addContact, updateContact, state } = useContacts();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  // Обновление формы, если defaultValues меняются
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const type = watch("type");

  const onSubmit = (data: ContactFormData) => {
    const { contactList } = state;

    // если есть id → это редактирование
    if (data.id) {
      const existing = contactList.find((c) => c.id === data.id);
      if (!existing) return;

      updateContact({
        ...existing,
        ...data,
        createdAt: existing.createdAt, // сохраняем дату создания
      });

      toast.success("Contact updated!");
    } else {
      // создание нового
      addContact({
        ...data,
        createdAt: Date.now(),
      });

      toast.success("Contact created!");
    }

    setTimeout(() => {
      onSuccess?.();
    }, 1500);
  };

  return (
    <Container style={{ maxWidth: 500 }}>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-5">
        {/* Тип */}
        <Form.Group className="mb-3">
          <Form.Label className="w-100">
            Type
            <Form.Select {...register("type")} isInvalid={!!errors.type}>
              <option value="">Select type of contact</option>
              <option value={ContactType.PHONE}>Phone</option>
              <option value={ContactType.EMAIL}>Email</option>
            </Form.Select>
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors.type?.message as string}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Значение */}
        <Form.Group className="mb-3">
          <Form.Label className="w-100">
            Value
            <Form.Control
              type="text"
              placeholder={
                type === ContactType.EMAIL
                  ? "example@mail.com"
                  : type === ContactType.PHONE
                    ? "+1234567890"
                    : ""
              }
              {...register("value")}
              isInvalid={!!errors.value}
            />
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors.value?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Описание */}
        <Form.Group className="mb-3">
          <Form.Label className="w-100">
            Description
            <Form.Control
              as="textarea"
              placeholder="Enter a description"
              {...register("description")}
              isInvalid={!!errors.description}
            />
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Кнопка */}
        <Button variant="primary" type="submit" className="w-100">
          Save
        </Button>
      </Form>
    </Container>
  );
}

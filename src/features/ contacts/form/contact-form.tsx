"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { useContacts } from "@/features/ contacts/store/contacts-store";
import { ContactSchema, ContactType } from "./schema";

export type ContactFormData = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ContactFormData>;
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

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const type = watch("type");

  const onSubmit = (data: ContactFormData) => {
    const { contactList } = state;
    if (data.id) {
      const existing = contactList.find((c) => c.id === data.id);
      if (!existing) return;

      updateContact({
        ...existing,
        ...data,
        createdAt: existing.createdAt,
      });

      toast.success("Contact updated!");
    } else {
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
        <Form.Group className="mb-3">
          <Form.Label className="w-100">
            Value
            <Form.Control
              type={
                type === ContactType.EMAIL
                  ? "email"
                  : type === ContactType.PHONE
                    ? "phone"
                    : ""
              }
              autoComplete={
                type === ContactType.EMAIL
                  ? "email"
                  : type === ContactType.PHONE
                    ? "phone"
                    : ""
              }
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
        <Button variant="primary" type="submit" className="w-100">
          Save
        </Button>
      </Form>
    </Container>
  );
}

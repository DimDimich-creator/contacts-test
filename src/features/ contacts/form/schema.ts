import z from "zod";

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

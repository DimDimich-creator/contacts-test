import type { ContactType } from "../form/schema";

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
  description?: string;
  createdAt: number;
}

export interface State {
  contactList: Contact[];
}

export type Action =
  | { type: "add"; payload: Omit<Contact, "id" | "createdAt"> }
  | { type: "update"; payload: Contact }
  | { type: "remove"; payload: { id: string } }
  | { type: "set"; payload: Contact[] };

export interface ContactsContextType {
  state: State;
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  setContacts: (contacts: Contact[]) => void;
}

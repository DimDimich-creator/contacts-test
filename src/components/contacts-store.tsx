"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { nanoid } from "nanoid";

// Тип контакта
export type ContactType = "email" | "phone" | "telegram" | "other";

// Модель контакта
export interface Contact {
  id: string;
  type: ContactType;
  value: string;
  description?: string;
}

// State
interface State {
  contactList: Contact[];
}

// Action
type Action =
  | { type: "add"; payload: Omit<Contact, "id"> }
  | { type: "update"; payload: Contact }
  | { type: "remove"; payload: { id: string } }
  | { type: "set"; payload: Contact[] };

// Инициализация со storage
function initState(): State {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("contacts");
      if (raw) return { contactList: JSON.parse(raw) };
    } catch {}
  }
  return { contactList: [] };
}

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const newContact: Contact = { id: nanoid(), ...action.payload };
      return { contactList: [newContact, ...state.contactList] };
    }
    case "update": {
      return {
        contactList: state.contactList.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    }
    case "remove": {
      return {
        contactList: state.contactList.filter(
          (c) => c.id !== action.payload.id,
        ),
      };
    }
    case "set": {
      return { contactList: action.payload };
    }
    default:
      return state;
  }
}

// Контекст
interface ContactsContextType {
  state: State;
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  setContacts: (contacts: Contact[]) => void;
}

const ContactsContext = createContext<ContactsContextType | null>(null);

// Provider
export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  // Синхронизация с localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state.contactList));
  }, [state.contactList]);

  const addContact = (contact: Omit<Contact, "id">) =>
    dispatch({ type: "add", payload: contact });

  const updateContact = (contact: Contact) =>
    dispatch({ type: "update", payload: contact });

  const removeContact = (id: string) =>
    dispatch({ type: "remove", payload: { id } });

  const setContacts = (contacts: Contact[]) =>
    dispatch({ type: "set", payload: contacts });

  return (
    <ContactsContext.Provider
      value={{ state, addContact, updateContact, removeContact, setContacts }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

// Хук
export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}

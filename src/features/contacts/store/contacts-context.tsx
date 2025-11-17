"use client";

import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initState, reducer } from "./contacts.reducer";
import type { Contact, ContactsContextType } from "./types";

const ContactsContext = createContext<ContactsContextType | null>(null);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  // sync with localStorage
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

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}

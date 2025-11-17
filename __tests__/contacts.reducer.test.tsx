import { describe, expect, it } from "vitest";
import type { ContactType } from "@/features/contacts/form/schema";
import type { State } from "@/features/contacts/store";
import { initState, reducer } from "@/features/contacts/store/contacts.reducer";

describe("contacts.reducer", () => {
  it("initState returns an empty list if localStorage is empty", () => {
    const state = initState();
    expect(state).toEqual({ contactList: [] });
  });

  it('adds a new contact with "add" action', () => {
    const state: State = { contactList: [] };
    const action = {
      type: "add" as const,
      payload: { type: "email" as ContactType, value: "test@mail.com" },
    };
    const newState = reducer(state, action);

    expect(newState.contactList).toHaveLength(1);
    const contact = newState.contactList[0];
    expect(contact).toMatchObject({ type: "email", value: "test@mail.com" });
    expect(typeof contact.id).toBe("string");
    expect(typeof contact.createdAt).toBe("number");
  });

  it('updates a contact with "update" action', () => {
    const contact = {
      id: "1",
      type: "email" as ContactType,
      value: "old@mail.com",
      createdAt: Date.now(),
    };
    const state: State = { contactList: [contact] };
    const action = {
      type: "update" as const,
      payload: { ...contact, value: "new@mail.com" },
    };
    const newState = reducer(state, action);

    expect(newState.contactList[0].value).toBe("new@mail.com");
  });

  it('removes a contact with "remove" action', () => {
    const contact = {
      id: "1",
      type: "email" as ContactType,
      value: "delete@mail.com",
      createdAt: Date.now(),
    };
    const state: State = { contactList: [contact] };
    const action = { type: "remove" as const, payload: { id: "1" } };
    const newState = reducer(state, action);

    expect(newState.contactList).toHaveLength(0);
  });

  it('replaces the contact list with "set" action', () => {
    const state: State = { contactList: [] };
    const newContacts = [
      {
        id: "2",
        type: "phone" as ContactType,
        value: "123",
        createdAt: Date.now(),
      },
    ];
    const action = { type: "set" as const, payload: newContacts };
    const newState = reducer(state, action);

    expect(newState.contactList).toEqual(newContacts);
  });

  it("returns the same state for unknown action", () => {
    const state: State = { contactList: [] };
    // @ts-expect-error testing unknown action type
    const newState = reducer(state, { type: "unknown", payload: {} });
    expect(newState).toEqual(state);
  });
});

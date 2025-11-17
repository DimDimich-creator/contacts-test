// __tests__/contacts.reducer.test.ts
import { describe, it, expect } from "vitest";
import { initState, reducer } from "@/features/contacts/store/contacts.reducer";
import { State } from "@/features/contacts/store";
import { ContactType } from "@/features/contacts/form/schema";

describe("contacts.reducer", () => {
  it("initState возвращает пустой список, если нет localStorage", () => {
    const state = initState();
    expect(state).toEqual({ contactList: [] });
  });

  it('добавляет новый контакт через "add"', () => {
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

  it('обновляет контакт через "update"', () => {
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

  it('удаляет контакт через "remove"', () => {
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

  it('заменяет список контактов через "set"', () => {
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

  it("неизвестный action возвращает исходное состояние", () => {
    const state: State = { contactList: [] };
    // @ts-expect-error проверяем неизвестный тип
    const newState = reducer(state, { type: "unknown", payload: {} });
    expect(newState).toEqual(state);
  });
});

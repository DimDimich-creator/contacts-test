import { nanoid } from "nanoid";
import type { Action, State } from "./types";

// Инициализация состояния
export function initState(): State {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("contacts");
      if (raw) return { contactList: JSON.parse(raw) };
    } catch {}
  }
  return { contactList: [] };
}

// Reducer
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const newContact = {
        id: nanoid(),
        createdAt: Date.now(),
        ...action.payload,
      };
      return { contactList: [newContact, ...state.contactList] };
    }
    case "update":
      return {
        contactList: state.contactList.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    case "remove":
      return {
        contactList: state.contactList.filter(
          (c) => c.id !== action.payload.id,
        ),
      };
    case "set":
      return { contactList: action.payload };
    default:
      return state;
  }
}

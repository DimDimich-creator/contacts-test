import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Contact } from "@/features/contacts/store/types";

// 1️⃣ Мокаем Next.js хуки
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// 2️⃣ Мокаем useContacts
const removeContactMock = vi.fn();
vi.mock("@/features/contacts/store", () => ({
  useContacts: () => ({
    removeContact: removeContactMock,
    state: { contactList: [] },
  }),
}));

// 3️⃣ Импортируем компонент после моков
import { ContactCard } from "@/features/contacts/list/contact-card";

describe("ContactCard", () => {
  const contact: Contact = {
    id: "1",
    type: "email",
    value: "test@mail.com",
    createdAt: Date.now(),
  };

  beforeEach(() => {
    removeContactMock.mockClear();
  });

  it("рендерит данные контакта", () => {
    render(<ContactCard contact={contact} />);
    console.log(container.innerHTML);

    expect(screen.getByText("test@mail.com")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /email test@mail\.com/i }),
    ).toBeInTheDocument();
  });

  // it("открывает модалку при клике Edit", () => {
  //   render(<ContactCard contact={contact} />);

  //   const editButton = screen.getByRole("button", { name: /edit/i });
  //   fireEvent.click(editButton);

  //   // Проверяем, что модалка открыта через кнопку Save/Cancel
  //   expect(
  //     screen.getByText(/save/i) || screen.getByText(/cancel/i),
  //   ).toBeInTheDocument();
  // });

  // it("вызывает removeContact при клике Delete", () => {
  //   render(<ContactCard contact={contact} />);

  //   const deleteButton = screen.getByTestId("delete-button");
  //   fireEvent.click(deleteButton);

  //   expect(removeContactMock).toHaveBeenCalledTimes(1);
  //   expect(removeContactMock).toHaveBeenCalledWith(contact.id);
  // });
});

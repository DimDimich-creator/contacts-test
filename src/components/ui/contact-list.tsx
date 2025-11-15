import React from "react";

import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { ContactCard } from "./contact-card";

export default function ContactList() {
  return (
    <ul className="list-unstyled d-flex flex-column gap-3 flex-grow-1">
      <ContactCard
        firstName="Ivan"
        lastName="Petrov"
        email="ivan.petrov@example.com"
      />
      <ContactCard
        firstName="Ivan"
        lastName="Petrov"
        email="ivan.petrov@example.com"
      />
    </ul>
  );
}

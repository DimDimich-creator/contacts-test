import React from "react";

import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { ContactCard } from "./contact-card";

export default function ContactList() {
  return (
    <div>
      <h2>Contact List</h2>
      <ContactCard
        firstName="Ivan"
        lastName="Petrov"
        email="ivan.petrov@example.com"
      />
    </div>
  );
}

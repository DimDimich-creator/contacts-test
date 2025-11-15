import { Card, Image, Form, Button } from "react-bootstrap";

import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface ContactDetailsPanelProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
  onNotesChange?: (value: string) => void;
}

export function ContactDetailsPanel({
  firstName,
  lastName,
  email,
  phone = "",
  notes = "",
  onNotesChange,
}: ContactDetailsPanelProps) {
  const avatar = createAvatar(lorelei, {
    seed: email,
  });

  return (
    <Card
      className="p-4 shadow-sm h-100 flex-shrink-0"
      style={{ width: "350px" }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        <Image
          src={avatar.toDataUri()}
          alt={`${firstName} ${lastName}`}
          roundedCircle
          width={120}
          height={120}
        />

        <h3 className="fw-semibold mb-0">
          {firstName} {lastName}
        </h3>

        <div className="text-muted">{email}</div>

        {phone && <div className="text-muted">📞 {phone}</div>}

        <hr className="w-100" />

        <div className="w-100">
          <Form.Label className="fw-semibold">Заметка</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Оставьте заметку…"
            value={notes}
            onChange={(e) => onNotesChange?.(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}

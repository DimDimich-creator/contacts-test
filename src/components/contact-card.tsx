import { Card, Image } from "react-bootstrap";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

interface ContactCardProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function ContactCard({ firstName, lastName, email }: ContactCardProps) {
  const avatar = createAvatar(lorelei, {
    seed: email,
  });
  
  return (
    <Card
      className="d-flex flex-row align-items-center p-2 gap-3 shadow-sm"
      as={"li"}
    >
      <Image
        src={avatar.toDataUri()}
        alt={`${firstName} ${lastName}`}
        roundedCircle
        width={64}
        height={64}
      />

      <div className="d-flex flex-column">
        <div className="fw-semibold fs-5">
          {firstName} {lastName}
        </div>

        <div className="text-muted">{email}</div>
      </div>
    </Card>
  );
}

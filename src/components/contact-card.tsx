'use client";';
import { Card, Image } from "react-bootstrap";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface ContactCardProps {
  type: string;
  value: string;
  description: string;
  id: string;
}

export function ContactCard({
  type,
  value,
  description,
  id,
}: ContactCardProps) {
  const avatar = createAvatar(lorelei, {
    seed: id,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    // клонируем текущие query параметры
    const params = new URLSearchParams(searchParams.toString());
    params.set("contactId", id);

    // обновляем URL (Page Router)
    router.push(`?${params.toString()}`);
  };

  return (
    <Card
      className="d-flex flex-row align-items-center p-2 gap-3 shadow-sm"
      as={"li"}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={avatar.toDataUri()}
        alt={`${type} ${value}`}
        roundedCircle
        width={64}
        height={64}
      />

      <div className="d-flex flex-column">
        <div className="fw-semibold fs-5">
          {type} {value}
        </div>

        <div className="text-muted">{description}</div>
      </div>
    </Card>
  );
}

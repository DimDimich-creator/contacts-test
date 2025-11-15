import React from "react";
import { Card } from "react-bootstrap";

export default function EmptyState() {
  return (
    <Card
      className="p-4 shadow-sm h-100 flex-shrink-0"
      style={{ width: "350px", minHeight: "400px" }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        <h3 className="fw-semibold mb-0">Нет контактов</h3>

        <div className="text-muted text-center">
          Похоже, у вас еще нет контактов. Начните с добавления нового контакта,
          чтобы управлять своей адресной книгой.
        </div>
      </div>
    </Card>
  );
}

import { Card } from "react-bootstrap";

export default function EmptyState() {
  return (
    <Card
      className="d-flex flex-col align-items-center p-2 gap-3 shadow-sm"
      as="li"
      // style={{ cursor: "pointer" }}
    >
      <h4 className="fw-semibold mb-0">Нет контактов</h4>

      <p className="text-muted text-center">
        Похоже, у вас еще нет контактов. Начните с добавления нового контакта,
        чтобы управлять своей адресной книгой.
      </p>
    </Card>
  );
}

import { Card } from "react-bootstrap";

export default function EmptyState() {
  return (
    <Card
      className="d-flex flex-col align-items-center p-2 gap-3 shadow-sm"
      as="li"
      // style={{ cursor: "pointer" }}
    >
      <h4 className="fw-semibold mb-0">No contacts</h4>

      <p className="text-muted text-center">
        It looks like you don't have any contacts yet. Start by adding a new
        contact to manage your address book.
      </p>
    </Card>
  );
}

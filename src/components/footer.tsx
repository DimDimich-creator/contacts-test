import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="py-3 mt-4 border-top">
      <Container className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <span className="text-muted">
          {new Date().getFullYear()} ♡ Dmitry Kashirin
        </span>
      </Container>
    </footer>
  );
}

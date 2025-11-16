import { Container, Navbar } from "react-bootstrap";
import { ModeToggleBootstrap } from "./mode-toggle";

export default function Header() {
  return (
    <Navbar className="bg-body-tertiary" as={"header"}>
      <Container>
        <Navbar.Brand>IT-LINK Contacts</Navbar.Brand>
        <ModeToggleBootstrap />
      </Container>
    </Navbar>
  );
}

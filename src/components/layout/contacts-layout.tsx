import { Button } from "react-bootstrap";
import ContactsSplitView from "../contacts-split-view";
import { useState } from "react";
import ContactModal from "../contact-modal";

export default function ContactsLayout() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Contact
      </Button>
      <ContactsSplitView />
      <ContactModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

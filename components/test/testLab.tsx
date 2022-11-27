import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapTitle from "atoms/capTitle";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

export default function TestLab({ language = "pt" }: { language?: "pt" }) {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    return <>
        <CapTitle base="lab" label="close" />
        <CapBtn kind="next" variant="light" />
        <Form /* noValidate */ validated={validated} onSubmit={handleSubmit}><CapForm required={true} /></Form>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        {/* <Button type="submit">Submit form</Button> */}
        </Form>
    </>;
}

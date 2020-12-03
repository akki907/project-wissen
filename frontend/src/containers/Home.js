import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Spinner";
import FormContainer from "../components/FormContainer";
import { createUser } from "../actions/user";

const Home = () => {
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    SSN: "",
    address: "",
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const createUserData = useSelector((state) => state.createUser);
  const { loading, error } = createUserData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!data.phone) {
      setMessage("Phone no is required!");
    } else if (!data.SSN) {
      setMessage("SSN no is required!");
    } else if (!data.firstName || !data.lastName) {
      setMessage("Name  is required!");
    } else {
      setMessage(null)
      dispatch(
        createUser(
          {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            SSN: data.SSN,
            address: data.SSN,
          },
          setdata,
          setMessage
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Add User</h1>
      {message && <Message >{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First name"
            value={data.firstName}
            onChange={(e) => setdata({ ...data, firstName: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last name"
            value={data.lastName}
            onChange={(e) => setdata({ ...data, lastName: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Phone"
            value={data.phone}
            onChange={(e) => setdata({ ...data, phone: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="SSN">
          <Form.Label>SSN</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter SSN"
            value={data.SSN}
            onChange={(e) => setdata({ ...data, SSN: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="SSN">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Address"
            value={data.address}
            onChange={(e) => setdata({ ...data, address: e.target.value })}
            rows={3}
          />
        </Form.Group>

        <Button disabled={loading} type="submit" variant="primary">
          Add User
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Home;

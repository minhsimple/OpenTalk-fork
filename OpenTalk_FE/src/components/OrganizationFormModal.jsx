import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const OrganizationFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(initialData?.name || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>
          {initialData ? 'Update Organization' : 'Create Organization'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="branchName">Branch Name</Label>
            <Input
              id="branchName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default OrganizationFormModal;

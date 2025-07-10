import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

const DepartmentFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    setDepartmentName(initialData?.departmentName || initialData?.name || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ departmentName });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>
          {initialData ? 'Edit Department' : 'Add Department'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="departmentName">Department Name</Label>
            <Input
              id="departmentName"
              name="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {initialData ? 'Edit' : 'Add'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default DepartmentFormModal;

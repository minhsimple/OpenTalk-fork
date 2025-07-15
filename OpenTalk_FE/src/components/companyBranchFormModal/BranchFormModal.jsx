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

const BranchFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName(''); // Reset form after submit
  };

  const handleToggle = () => {
    setName(''); // Reset form when closing
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={handleToggle}>
          {initialData ? 'Update Branch' : 'Create Branch'}
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
          <Button color="secondary" onClick={handleToggle} type="button">
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

export default BranchFormModal;

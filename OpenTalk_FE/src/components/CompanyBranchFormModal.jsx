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

const CompanyBranchFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    branchName: '',
    country: '',
    city: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    setFormData({
      branchName: initialData?.branchName || '',
      country: initialData?.country || '',
      city: initialData?.city || '',
      email: initialData?.email || '',
      address: initialData?.address || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>
          {initialData ? 'Update Branch' : 'Add Branch'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="branchName">Branch Name</Label>
            <Input id="branchName" name="branchName" value={formData.branchName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="country">Country</Label>
            <Input id="country" name="country" value={formData.country} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {initialData ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CompanyBranchFormModal;

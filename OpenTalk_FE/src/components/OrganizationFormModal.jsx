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
  Row,
  Col,
} from 'reactstrap';

const OrganizationFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    country: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    fax: '',
    totalEmployee: '',
    totalDepartment: '',
    websiteUrl: '',
  });

  useEffect(() => {
    setFormData({
      companyName: initialData?.companyName || '',
      address: initialData?.address || '',
      country: initialData?.country || '',
      city: initialData?.city || '',
      postalCode: initialData?.postalCode || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      fax: initialData?.fax || '',
      totalEmployee: initialData?.totalEmployee || '',
      totalDepartment: initialData?.totalDepartment || '',
      websiteUrl: initialData?.websiteUrl || '',
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
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>
          {initialData ? 'Update Organization' : 'Create Organization'}
        </ModalHeader>
        <ModalBody>
          <Row className="g-3">
                <Col md="6">
                  <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="fax">Fax</Label>
                    <Input
                      id="fax"
                      name="fax"
                      value={formData.fax}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="totalEmployee">Total Employee</Label>
                    <Input
                      id="totalEmployee"
                      name="totalEmployee"
                      value={formData.totalEmployee}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="totalDepartment">Total Department</Label>
                    <Input
                      id="totalDepartment"
                      name="totalDepartment"
                      value={formData.totalDepartment}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="websiteUrl">Website Url</Label>
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
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

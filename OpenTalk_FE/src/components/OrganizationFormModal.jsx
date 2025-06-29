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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';

const OrganizationFormModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const [activeTab, setActiveTab] = useState('profile');
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
  const [filters, setFilters] = useState({ employee: '', department: '', head: '' });

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
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === 'profile' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'departments' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('departments')}
              >
                Departments
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="mt-3">
            <TabPane tabId="profile">
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
            </TabPane>
            <TabPane tabId="departments">
              <Row className="g-2 mb-3 align-items-end">
                <Col md="4">
                  <FormGroup>
                    <Label for="filterEmployee">Employee Name</Label>
                    <Input
                      id="filterEmployee"
                      value={filters.employee}
                      onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
                      placeholder="Employee Name"
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label for="filterDepartment">Department</Label>
                    <Input
                      id="filterDepartment"
                      type="select"
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                      <option value="">All</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label for="filterHead">Head Of Department</Label>
                    <Input
                      id="filterHead"
                      type="select"
                      value={filters.head}
                      onChange={(e) => setFilters({ ...filters, head: e.target.value })}
                    >
                      <option value="">All</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <Button color="primary" className="w-100">
                    <FaSearch />
                  </Button>
                </Col>
              </Row>
              <Table bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Head Of Department</th>
                    <th>Total Employee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">No data</td>
                  </tr>
                </tbody>
              </Table>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} type="button">
            Cancel
          </Button>
          {activeTab === 'profile' && (
            <Button color="primary" type="submit">
              {initialData ? 'Update' : 'Create'}
            </Button>
          )}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default OrganizationFormModal;

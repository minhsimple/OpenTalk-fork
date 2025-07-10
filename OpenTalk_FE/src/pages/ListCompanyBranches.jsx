import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyBranchFormModal from '../components/CompanyBranchFormModal';

const ListCompanyBranches = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleCreate = async (payload) => {
    // TODO: call API
    setModalOpen(false);
  };

  const handleUpdate = async (payload) => {
    // TODO: call API
    setModalOpen(false);
    setSelected(null);
  };

  const handleViewDepartments = (branchId) => {
    navigate(`/organization/${companyId}/branches/${branchId}/departments`);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Company Branches</h2>
        <Button color="primary" onClick={() => { setSelected(null); setModalOpen(true); }}>
          Add Branch
        </Button>
      </div>
      <Table bordered hover>
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Branch Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.branchName}</td>
              <td>{b.country}</td>
              <td>{b.city}</td>
              <td className="d-flex gap-1">
                <Button size="sm" color="secondary" onClick={() => { setSelected(b); setModalOpen(true); }}>
                  Edit
                </Button>
                <Button size="sm" color="info" onClick={() => handleViewDepartments(b.id)}>
                  View Departments
                </Button>
                <Button size="sm" color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CompanyBranchFormModal
        isOpen={modalOpen}
        toggle={() => { setModalOpen(false); setSelected(null); }}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
      />
    </div>
  );
};

export default ListCompanyBranches;

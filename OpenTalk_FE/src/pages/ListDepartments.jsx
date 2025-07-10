import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import DepartmentFormModal from '../components/DepartmentFormModal';

const ListDepartments = () => {
  const { companyId, branchId } = useParams();
  const [departments, setDepartments] = useState([]);
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Departments</h2>
        <Button
          color="primary"
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
        >
          Add Department
        </Button>
      </div>
      <Table bordered hover>
        <thead className="table-light">
          <tr>
            <th>Department Name</th>
            <th>Head Of Department</th>
            <th>Total Employees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.head}</td>
              <td>{d.totalEmployees}</td>
              <td className="d-flex gap-1">
                <Button
                  size="sm"
                  color="secondary"
                  onClick={() => {
                    setSelected(d);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button size="sm" color="info">View Employees</Button>
                <Button size="sm" color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DepartmentFormModal
        isOpen={modalOpen}
        toggle={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
      />
    </div>
  );
};

export default ListDepartments;

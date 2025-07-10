import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';

const ListDepartments = () => {
  const { companyId, branchId } = useParams();
  const [departments, setDepartments] = useState([]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Departments</h2>
        <Button color="primary">Add Department</Button>
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
                <Button size="sm" color="secondary">Edit</Button>
                <Button size="sm" color="info">View Employees</Button>
                <Button size="sm" color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListDepartments;

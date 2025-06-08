import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import BranchFormModal from '../components/BranchFormModal';
import {
  getCompanyBranches,
  createCompanyBranch,
  updateCompanyBranch,
} from '../api/companyBranch';

const BranchListPage = () => {
  const [branches, setBranches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    try {
      const data = await getCompanyBranches();
      setBranches(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (payload) => {
    await createCompanyBranch(payload);
    setModalOpen(false);
    loadData();
  };

  const handleUpdate = async (payload) => {
    if (!selected) return;
    await updateCompanyBranch(selected.id, payload);
    setModalOpen(false);
    setSelected(null);
    loadData();
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
            <th>#</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td className="text-end">
                <Button size="sm" color="secondary" onClick={() => { setSelected(b); setModalOpen(true); }}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BranchFormModal
        isOpen={modalOpen}
        toggle={() => { setModalOpen(false); setSelected(null); }}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
      />
    </div>
  );
};

export default BranchListPage;

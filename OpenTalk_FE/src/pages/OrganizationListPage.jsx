import React, { useEffect, useState } from 'react';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';
import BranchFormModal from '../components/BranchFormModal';
import DeleteModal from '../components/deleteModal/DeleteModal.jsx';
import {
  getCompanyBranches,
  createCompanyBranch,
  updateCompanyBranch,
} from '../api/companyBranch';
import './styles/OrganizationListPage.css';

const mockBranches = [
  { id: 1, name: 'Unpixel HQ' },
  { id: 2, name: 'North Branch' },
  { id: 3, name: 'South Branch' },
  { id: 4, name: 'East Branch' },
  { id: 5, name: 'West Branch' },
];

const OrganizationListPage = () => {
  const [branches, setBranches] = useState(mockBranches);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

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

  const handleDelete = () => {
    alert(`${selectedBranch?.name} deleted.`);
    setShowDelete(false);
  };

  return (
    <div className="organization-page">
      <div className="header">
        <div>
          <h1 className="header-title">Organization</h1>
          <p className="header-subtitle">Manage your Company Branches</p>
        </div>
        <div className="header-buttons">
          <button className="btn btn-primary" onClick={() => { setSelected(null); setModalOpen(true); }}>
            <FaPlus />
            Add Company
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Company Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(branches) ? branches : []).map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => { setSelected(b); setModalOpen(true); }}
                      className="action-btn action-btn-view"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => { setSelectedBranch(b); setShowDelete(true); }}
                      className="action-btn action-btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DeleteModal
          isOpen={showDelete}
          title="Delete Branch"
          message={`Are you sure you want to delete ${selectedBranch?.name}?`}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      </div>

      <BranchFormModal
        isOpen={modalOpen}
        toggle={() => { setModalOpen(false); setSelected(null); }}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
      />
    </div>
  );
};

export default OrganizationListPage;

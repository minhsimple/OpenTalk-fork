import React, { useEffect, useState } from 'react';
import {
  FaPlus,
  FaEye,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import BranchFormModal from '../components/companyBranchFormModal/BranchFormModal.jsx';
import DeleteModal from '../components/deleteModal/DeleteModal.jsx';
import {
  getCompanyBranches,
  createCompanyBranch,
  updateCompanyBranch,
  deleteCompanyBranch,
  getCompanyBranch,
} from '../api/companyBranch';
import './styles/OrganizationListPage.css';

const OrganizationListPage = () => {
  const [branches, setBranches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

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

  function isDuplicateName(name) {
    return branches.some((branch) => branch.name.toLowerCase() === name.toLowerCase() && branch.id !== (selected ? selected.id : null));
  }

  const handleCreate = async (payload) => {
    if (isDuplicateName(payload.name)) {
      setError('Branch name already exists');
    } else {
      setError(null);
      await createCompanyBranch(payload);
      setModalOpen(false);
      loadData();
    }
  };

  const handleUpdate = async (payload) => {
    if (!selected) return;
    if (isDuplicateName(payload.name)) {
      setError('Branch name already exists');
    } else {
      setError(null);
      await updateCompanyBranch(selected.id, payload);
      setModalOpen(false);
      setSelected(null);
      loadData();
    }
  };

  const handleDelete = async () => {
    if (!selectedBranch) return;
    await deleteCompanyBranch(selectedBranch.id);
    setShowDelete(false);
    setSelectedBranch(null);
    loadData();
  };

  const itemsPerPage = 8;
  const filteredBranches = (Array.isArray(branches) ? branches : []).filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBranches = filteredBranches.slice(startIndex, startIndex + itemsPerPage);

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
            Add Branch
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search branch"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
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
            {paginatedBranches.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={async () => {
                        const data = await getCompanyBranch(b.id);
                        setSelected(data);
                        setModalOpen(true);
                      }}
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

        <div className="pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBranches.length)} of {filteredBranches.length} results
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      <BranchFormModal
        isOpen={modalOpen}
        toggle={() => { setModalOpen(false); setSelected(null); }}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
        error={error}
      />
    </div>
  );
};

export default OrganizationListPage;

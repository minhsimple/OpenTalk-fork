import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaEnvelope, FaPhone, FaClock, FaEdit, FaChevronRight } from "react-icons/fa"
import "./styles/EditEmployeePage.css"

const EditEmployeePage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState("general")
    const [employee, setEmployee] = useState({
        id: 1,
        name: "Pristia Candra Nelson",
        jobTitle: "3D Designer",
        email: "lincoln@gmail.com",
        phone: "089318298493",
        timezone: "GMT +07:00",
        department: "Designer",
        office: "Unpixel Studio",
        lineManager: "Skylar Calzoni",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg?height=120&width=120",
        gender: "Female",
        dateOfBirth: "23 May 1997",
        nationality: "Indonesia",
        healthCare: "AXA Insurance",
        maritalStatus: "",
        personalTaxId: "",
        socialInsurance: "",
    })

    const [formData, setFormData] = useState({
        fullName: employee.name,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        emailAddress: employee.email,
        phoneNumber: employee.phone,
        nationality: employee.nationality,
        healthCare: employee.healthCare,
        maritalStatus: employee.maritalStatus,
        personalTaxId: employee.personalTaxId,
        socialInsurance: employee.socialInsurance,
    })

    useEffect(() => {
        console.log("Loading employee with ID:", id)
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = () => {
        console.log("Saving employee data:", formData)
        alert("Employee updated successfully!")
    }

    const tabs = [
        { id: "general", label: "General" },
        { id: "job", label: "Job" },
        { id: "payroll", label: "Payroll" },
        { id: "documents", label: "Documents" },
        { id: "setting", label: "Setting" },
    ]

    return (
        <div className="edit-employee-page">
            {/* Header */}
            <div className="page-header">
                <button onClick={() => navigate("/employee")} className="back-button">
                    <FaArrowLeft size={16} />
                </button>
                <h1 className="page-title">Detail Employee</h1>
            </div>

            <div className="content-grid">
                {/* Employee Profile Card */}
                <div className="profile-card">
                    <div className="profile-header">
                        <img src={employee.avatar || "/placeholder.svg"} alt={employee.name} className="profile-avatar" />
                        <h2 className="profile-name">{employee.name}</h2>
                        <p className="profile-title">{employee.jobTitle}</p>
                        <span className="status-badge status-active">{employee.status.toUpperCase()}</span>
                    </div>

                    <div className="contact-info">
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>{employee.email}</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>{employee.phone}</span>
                        </div>
                        <div className="contact-item">
                            <FaClock className="contact-icon" />
                            <span>{employee.timezone}</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <div className="info-item">
                            <span className="info-label">Department</span>
                            <div className="info-value">
                                <span className="info-text">{employee.department}</span>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Office</span>
                            <div className="info-value">
                                <span className="info-text">{employee.office}</span>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Line Manager</span>
                            <div className="info-value">
                                <img src="/placeholder.svg?height=24&width=24" alt="Manager" className="info-avatar" />
                                <span className="info-text">{employee.lineManager}</span>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </div>
                    </div>

                    <button className="action-button">Action</button>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Tabs */}
                    <div className="tabs-header">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === "general" && (
                            <div>
                                <div className="section-header">
                                    <h3 className="section-title">Personal Info</h3>
                                    <button className="edit-button">
                                        <FaEdit size={14} />
                                    </button>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Full Name <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Date of Birth <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Gender <span className="required">*</span>
                                        </label>
                                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-select">
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Phone Number <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Email Address <span className="required">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                value={formData.emailAddress}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <select
                                                name="nationality"
                                                value={formData.nationality}
                                                onChange={handleInputChange}
                                                className="form-select"
                                            >
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="field-note">
                                            Nationality <span className="required">*</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Health Care <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="healthCare"
                                            value={formData.healthCare}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Marital Status <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="maritalStatus"
                                            value={formData.maritalStatus}
                                            onChange={handleInputChange}
                                            placeholder="Input here"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Personal Tax ID <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="personalTaxId"
                                            value={formData.personalTaxId}
                                            onChange={handleInputChange}
                                            placeholder="Input here"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group form-grid-full">
                                        <label className="form-label">
                                            Social Insurance <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="socialInsurance"
                                            value={formData.socialInsurance}
                                            onChange={handleInputChange}
                                            placeholder="Input here"
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <button onClick={handleSave} className="save-button">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "job" && (
                            <div className="placeholder-content">
                                <h3 className="placeholder-title">Job Information</h3>
                                <p className="placeholder-text">This section will contain job-related information</p>
                            </div>
                        )}

                        {activeTab === "payroll" && (
                            <div className="placeholder-content">
                                <h3 className="placeholder-title">Payroll Information</h3>
                                <p className="placeholder-text">This section will contain payroll information</p>
                            </div>
                        )}

                        {activeTab === "documents" && (
                            <div className="placeholder-content">
                                <h3 className="placeholder-title">Documents</h3>
                                <p className="placeholder-text">This section will contain employee documents</p>
                            </div>
                        )}

                        {activeTab === "setting" && (
                            <div className="placeholder-content">
                                <h3 className="placeholder-title">Settings</h3>
                                <p className="placeholder-text">This section will contain account settings</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployeePage

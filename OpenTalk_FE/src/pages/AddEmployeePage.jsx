import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./styles/AddEmployeePage.css"

const AddEmployeeNew = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        emailAddress: "",
        dateOfBirth: "",
        maritalStatus: "",
        gender: "",
        nationality: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        console.log("Form Data:", formData)
        alert("Employee added successfully!")
    }

    const tabs = [
        { id: "personal", label: "Personal Information", icon: "👤" },
        { id: "professional", label: "Professional Information", icon: "💼" },
        { id: "documents", label: "Documents", icon: "📄" },
        { id: "account", label: "Account Access", icon: "🔒" },
    ]

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: "📊", active: false },
        { id: "employees", label: "All Employees", icon: "👥", active: true },
        { id: "departments", label: "All Departments", icon: "🏢", active: false },
        { id: "attendance", label: "Attendance", icon: "📅", active: false },
        { id: "payroll", label: "Payroll", icon: "💰", active: false },
        { id: "jobs", label: "Jobs", icon: "💼", active: false },
        { id: "candidates", label: "Candidates", icon: "👤", active: false },
        { id: "leaves", label: "Leaves", icon: "🏖️", active: false },
        { id: "holidays", label: "Holidays", icon: "🎉", active: false },
        { id: "settings", label: "Settings", icon: "⚙️", active: false },
    ]

    return (
        <div className="hrms-container">

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <div className="header-left">
                        <h1 className="page-title">Add New Employee</h1>
                        <div className="breadcrumb">
                            <span>All Employee</span>
                            <span className="breadcrumb-separator">›</span>
                            <span>Add New Employee</span>
                        </div>
                    </div>
                </div>
                {/* Form Container */}
                <div className="form-container">
                    {/* Tabs */}
                    <div className="tabs-header">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="tab-icon">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="form-content">
                        {activeTab === "personal" && (
                            <>
                                {/* Profile Upload */}
                                <div className="profile-upload">
                                    <div className="upload-area">
                                        <span className="upload-icon">📷</span>
                                        <button className="upload-button">+</button>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-input"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-input"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            className="form-input"
                                            placeholder="Mobile Number"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            className="form-input"
                                            placeholder="Email Address"
                                            value={formData.emailAddress}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Date of Birth</label>
                                        <div className="date-input-container">
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="form-input"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                            />
                                            <span className="date-icon">📅</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Marital Status</label>
                                        <select
                                            name="maritalStatus"
                                            className="form-select"
                                            value={formData.maritalStatus}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Marital Status</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Gender</label>
                                        <select name="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
                                            <option value="">Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Nationality</label>
                                        <select
                                            name="nationality"
                                            className="form-select"
                                            value={formData.nationality}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Nationality</option>
                                            <option value="vietnamese">Vietnamese</option>
                                            <option value="american">American</option>
                                            <option value="british">British</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group form-grid-full">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-input"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-grid-three">
                                    <div className="form-group">
                                        <label className="form-label">City</label>
                                        <select name="city" className="form-select" value={formData.city} onChange={handleInputChange}>
                                            <option value="">City</option>
                                            <option value="hanoi">Hanoi</option>
                                            <option value="hcmc">Ho Chi Minh City</option>
                                            <option value="danang">Da Nang</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">State</label>
                                        <select name="state" className="form-select" value={formData.state} onChange={handleInputChange}>
                                            <option value="">State</option>
                                            <option value="north">North</option>
                                            <option value="central">Central</option>
                                            <option value="south">South</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">ZIP Code</label>
                                        <select
                                            name="zipCode"
                                            className="form-select"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">ZIP Code</option>
                                            <option value="10000">10000</option>
                                            <option value="70000">70000</option>
                                            <option value="50000">50000</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab !== "personal" && (
                            <div style={{ textAlign: "center", padding: "60px 20px" }}>
                                <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                                    {activeTab === "professional" && "💼"}
                                    {activeTab === "documents" && "📄"}
                                    {activeTab === "account" && "🔒"}
                                </div>
                                <h3 style={{ marginBottom: "8px", color: "#374151" }}>
                                    {activeTab === "professional" && "Professional Information"}
                                    {activeTab === "documents" && "Documents"}
                                    {activeTab === "account" && "Account Access"}
                                </h3>
                                <p style={{ color: "#6b7280" }}>This section will contain {activeTab} information</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button className="btn btn-secondary" onClick={() => navigate("/employee")}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeNew

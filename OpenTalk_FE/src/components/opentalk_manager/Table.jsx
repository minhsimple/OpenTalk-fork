import Row from './Row';

function Table({ meetings, onView, onEdit, onDelete }) {
  return (
    <div >
      <table className="table align-middle mb-0 custom-table">
        <thead>
          <tr className="table-header-light">
            <th>ID</th>
            <th>Meeting Title</th>
            <th>Host</th>
            <th>Company Branch</th>
            <th>Scheduled Date</th>
            <th>Meeting URL</th>
            <th>Status</th>
            <th>Attendance Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, idx) => (
            <Row
              key={meeting.id}
              meeting={meeting}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              isLast={idx === meetings.length - 1}
            />
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
export default Table;

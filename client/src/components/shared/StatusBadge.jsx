const StatusBadge = ({ status }) => {
  const map = {
    'Applied': 'badge-applied',
    'Under Review': 'badge-review',
    'Selected': 'badge-selected',
    'Rejected': 'badge-rejected',
    'Completed': 'badge-completed',
    'Pending': 'badge-pending',
    'Submitted': 'badge-review',
    'Reviewed': 'badge-applied',
    'Approved': 'badge-approved',
    'active': 'badge-selected',
    'closed': 'badge-rejected',
    'pending': 'badge-review',
  };
  return <span className={map[status] || 'badge bg-gray-500/20 text-gray-400'}>{status}</span>;
};

export default StatusBadge;

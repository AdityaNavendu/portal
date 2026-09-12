import '../../styles/Applicantable.css'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { APPLICATION_API_URL } from '@/utils/data';
import { setsingleApplications } from '@/redux/Applicationslice';

const Applicanttable = () => {
  const dispatch = useDispatch();
  const { allapplications } = useSelector((state) => state.application);
  const applicants = allapplications?.applicants ?? [];

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');






  const actionStatuses = useMemo(() => {
    return [
      { label: 'Accepted', value: 'accepted' },
      { label: 'Rejected', value: 'rejected' },
    ];
  }, []);

  const jobId = useMemo(() => allapplications?.jobId || allapplications?.id || null, [allapplications]);

  const updateStatus = async (applicationId, nextStatus) => {
    if (!applicationId) return;

    await axios.post(
      `${APPLICATION_API_URL}/status/${applicationId}/update`,
      { status: nextStatus },
      { withCredentials: true }
    );

    if (jobId) {
      const res = await axios.get(`${APPLICATION_API_URL}/${jobId}/applicants`, { withCredentials: true });
      dispatch(setsingleApplications(res.data.job));
    } else {
      dispatch(
        setsingleApplications({
          ...(allapplications || {}),
          applicants: applicants.map((a) =>
            a.applicationId === applicationId ? { ...a, status: nextStatus } : a
          ),
        })
      );
    }
  };

  const filteredApplicants = useMemo(() => {
    const q = (searchText || '').trim().toLowerCase();

    const normalizeStatus = (raw) => {
      const s = (raw ?? '').toString().toLowerCase().trim();

      if (!s) return 'pending';
      if (s === 'accepted' || s === 'rejected') return s;
      return s;
    };

    return (applicants || []).filter((applicant) => {
      const applicantStatus = normalizeStatus(applicant?.status);

      if (statusFilter !== 'all') {
        if (applicantStatus !== statusFilter) return false;
      }

      if (!q) return true;

      const fullName = (applicant?.fullname || applicant?.name || '').toString().toLowerCase();
      const email = (applicant?.email || '').toString().toLowerCase();
      const contact = (applicant?.contact || '').toString().toLowerCase();
      const jobTitle = (applicant?.jobTitle || applicant?.job || '').toString().toLowerCase();
      const companyName = (
        applicant?.companyName ||
        applicant?.company?.name ||
        applicant?.job?.company?.name ||
        ''
      ).toString().toLowerCase();

      return (
        fullName.includes(q) ||
        email.includes(q) ||
        contact.includes(q) ||
        jobTitle.includes(q) ||
        companyName.includes(q)
      );
    });
  }, [applicants, searchText, statusFilter]);

  return (
    <div>
      <div className="table-container">
        <div className="applicant-filters" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search applicants (name, email, contact, job title, company)"
            style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="all">Status: All</option>
            <option value="pending">Status: Pending</option>
            <option value="accepted">Status: Accepted</option>
            <option value="rejected">Status: Rejected</option>
          </select>
        </div>

        <table className="table">
          <caption>List of your recent applied Users</caption>

          <thead>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr key={applicant?.applicationId || index}>
                <td>{applicant.fullname || applicant.name || '-'}</td>
                <td>{applicant.email || '-'}</td>
                <td>{applicant.contact || '-'}</td>

                <td>
                  {applicant?.profile?.resume ? (
                    <a href={applicant.profile.resume} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  ) : applicant?.resume ? (
                    <a href={applicant.resume} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  ) : (
                    'No Resume'
                  )}
                </td>

                <td>{applicant.jobTitle || applicant.job || '-'}</td>

                <td>{applicant.status || 'pending'}</td>

                <td className="text-right">
                  {actionStatuses.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => updateStatus(applicant.applicationId, s.value)}
                      disabled={!applicant.applicationId}
                    >
                      {s.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))}

            {filteredApplicants.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 16 }}>
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicanttable;



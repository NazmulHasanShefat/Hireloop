import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import ManageJobsTable from './ManageJobsTable';
import { getAllJobs } from '@/lib/api/jobs';

const ManageJobsPage = async () => {
    const alljobs = await getAllJobs()
 
    return (
        <div>
            <DashboardNavbar />
            <ManageJobsTable jobs={alljobs}/>
            <h2>manage you jov</h2>
        </div>
    );
};

export default ManageJobsPage;
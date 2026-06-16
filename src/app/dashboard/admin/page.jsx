import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import { getUserToken } from '@/lib/core/session';
import React from 'react';

const AdminHomePage = async () => {
    const usertoken = await getUserToken();
    return (
        <div>
            <DashboardNavbar />
           
        </div>
    );
};

export default AdminHomePage;
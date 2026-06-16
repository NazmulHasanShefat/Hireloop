import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import UsersTable from './UsersTable';
import { getAllusers } from '@/lib/api/users';

const UsersPage = async () => {
    const users = await getAllusers()
    return (
        <div>
            <DashboardNavbar />
            <UsersTable users={users}/>
        </div>
    );
};

export default UsersPage;
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import UsersTable from './UsersTable';
import { getAllusers, getUsersList } from '@/lib/api/users';

const UsersPage = async () => {
    const {users, total} = await getUsersList();
    console.log(users)
    return (
        <div>
            <DashboardNavbar />
            <h2>total users {total}</h2>
            <UsersTable users={users}/>
        </div>
    );
};

export default UsersPage;
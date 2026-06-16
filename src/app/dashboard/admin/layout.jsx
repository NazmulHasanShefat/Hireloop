import Sidebar from '@/components/dashboard/Sidebar';
import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async ({children}) => {
    await requireRole("admin")
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 lg:ml-50'>
            {children}
            </div>
        </div>
    );
};

export default AdminLayout;
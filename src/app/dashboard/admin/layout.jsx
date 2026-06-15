import Sidebar from '@/components/dashboard/Sidebar';
import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async ({children}) => {
    await requireRole("admin")
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
};

export default AdminLayout;
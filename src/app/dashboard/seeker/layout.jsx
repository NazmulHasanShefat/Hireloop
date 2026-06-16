import Sidebar from '@/components/dashboard/Sidebar';
import { requireRole } from '@/lib/core/session';
import React from 'react';

const SeekerLayout = async ({children}) => {
    await requireRole("seeker")
    return (
        <div className='flex'>
          <Sidebar />
          <div className='flex-1 lg:ml-50 px-5'>
          {children}
          </div>
        </div>
    );
};

export default SeekerLayout;
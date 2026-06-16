import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import SeekerApplicationTable from './ApplicationTable';
import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';


const SeekerApplicationPage = async () => {
    const user = await getUserSession();
    const seekerApplications = await getApplicationByApplicant(user?.id)
    console.log(seekerApplications)
    return (
        <div>
            <DashboardNavbar />
            <SeekerApplicationTable applications={seekerApplications}/>
        </div>
    );
};

export default SeekerApplicationPage;
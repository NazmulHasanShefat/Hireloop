import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import CompaniesTable from './CompaniesTable';
import { getAllcompanies } from '@/lib/api/companys';

const CompaniesPage = async () => {
    const allCompanies = await getAllcompanies()
    return (
        <div>
           <DashboardNavbar />
           <CompaniesTable companies={allCompanies}/>
        </div>
    );
};

export default CompaniesPage;
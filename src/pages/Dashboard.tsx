import React from 'react';
import { FileText, Users, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import StatCard from '../components/Dashboard/StatCard';
import RecentInvoices from '../components/Dashboard/RecentInvoices';
import DashboardHeader from '../components/Dashboard/DashboardHeader';

const Dashboard: React.FC = () => {
  const { invoices, customers, products } = useStore();

  const stats = [
    {
      title: 'Total Invoices',
      value: invoices.length,
      icon: FileText,
      link: '/invoices',
    },
    {
      title: 'Total Customers',
      value: customers.length,
      icon: Users,
      link: '/customers',
    },
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      link: '/products',
    },
  ];

  return (
    <div>
      <DashboardHeader />
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <RecentInvoices invoices={invoices} />
    </div>
  );
};

export default Dashboard;
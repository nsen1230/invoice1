import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  link: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, link }) => {
  return (
    <Link
      to={link}
      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StatCard;
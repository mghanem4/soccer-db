import React from 'react';
import ScrollableTable from './ScrollableTable';
import { Manager } from '../api';

interface ManagerListProps {
  managers: Manager[];
}

const ManagerList: React.FC<ManagerListProps> = ({ managers }) => {
  const columns = [
    { id: 'manager_id' as keyof Manager, label: 'ID' },
    { id: 'manager_name' as keyof Manager, label: 'Name' },
    { id: 'age' as keyof Manager, label: 'Date of Birth' },
    { id: 'manager_country' as keyof Manager, label: 'Country' },
  ];

  const filterBy = (manager: Manager, query: string) => {
    const nameMatches = manager.manager_name.toLowerCase().includes(query);
    const idMatches = manager.manager_id.toString().includes(query);
    return nameMatches || idMatches;
  };
  
  return (
    <ScrollableTable<Manager>
      data={managers}
      columns={columns}
      filterBy={filterBy}
    />
  );
};

export default ManagerList;

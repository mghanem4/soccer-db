import React from 'react';
import ScrollableTable from './ScrollableTable';
import { Manager } from '../api';

// This is the interface for the ManagerListProps

interface ManagerListProps {
  managers: Manager[];
}

// This is the ManagerList component that displays a list of managers in a table

const ManagerList: React.FC<ManagerListProps> = ({ managers }) => {
  const columns = [
    { id: 'manager_id' as keyof Manager, label: 'ID' },
    { id: 'manager_name' as keyof Manager, label: 'Name' },
    { id: 'age' as keyof Manager, label: 'Date of Birth' },
    { id: 'manager_country' as keyof Manager, label: 'Country' },
  ];
  // filter the manager by the manager name or manager id

  const filterBy = (manager: Manager, query: string) => {
    const nameMatches = manager.manager_name.toLowerCase().includes(query);
    const idMatches = manager.manager_id.toString().includes(query);
    return nameMatches || idMatches;
  };
  // return the scrollable table with the managers data, columns, and filterBy function
  return (
    <ScrollableTable<Manager>
      data={managers}
      columns={columns}
      filterBy={filterBy}
    />
  );
};

export default ManagerList;

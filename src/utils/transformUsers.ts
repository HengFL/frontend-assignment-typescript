import { User, GroupedData, DepartmentData } from '../api/types';

export const transformUsers = (users: User[]): GroupedData => {
  const groupedData: GroupedData = {};

  users.forEach(user => {
    const department = user.company.department;
    
    if (!groupedData[department]) {
      groupedData[department] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {}
      };
    }

    // Update gender count
    if (user.gender === 'male') {
      groupedData[department].male += 1;
    } else {
      groupedData[department].female += 1;
    }

    // Update hair color count
    const hairColor = user.hair.color;
    groupedData[department].hair[hairColor] = (groupedData[department].hair[hairColor] || 0) + 1;

    // Update addressUser
    const fullName = `${user.firstName}${user.lastName}`;
    groupedData[department].addressUser[fullName] = user.address.postalCode;
  });

  // Calculate age ranges for each department
  Object.keys(groupedData).forEach(department => {
    const departmentUsers = users.filter(user => user.company.department === department);
    const ages = departmentUsers.map(user => user.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    groupedData[department].ageRange = `${minAge}-${maxAge}`;
  });

  return groupedData;
};
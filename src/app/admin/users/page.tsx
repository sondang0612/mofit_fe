import Table, { Column } from "@/components/Table";
import React from "react";
interface Employee {
  name: string;
  position: string;
  salary: string;
}

const employeeColumns: Column<Employee>[] = [
  { title: "Name", dataIndex: "name" },
  { title: "Position", dataIndex: "position" },
  { title: "Salary", dataIndex: "salary" },
];

const employeeData: Employee[] = [
  { name: "John Doe", position: "Developer", salary: "$2000" },
  { name: "Jane Smith", position: "Designer", salary: "$1800" },
];
const Page = () => {
  return <Table columns={employeeColumns} data={employeeData} />;
};

export default Page;

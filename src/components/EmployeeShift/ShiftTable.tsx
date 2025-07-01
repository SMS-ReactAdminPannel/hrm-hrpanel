import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Employee } from "../../components/EmployeeShift/employee";
import { FONTS } from "../../constants/uiConstants";

interface EmployeeShiftTableProps {
  employees: Employee[];
  groupBy: string | null;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
}

const EmployeeShiftTable: React.FC<EmployeeShiftTableProps> = ({
  employees,
  groupBy,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const groupEmployees = () => {
    if (!groupBy) return { "All Employees": employees };

    const grouped: Record<string, Employee[]> = {};

    employees.forEach((employee) => {
      let key: string;

      if (groupBy === "rotatingShift") {
        key = employee.title;
      } else {
        key = (employee[groupBy as keyof Employee] as string) ?? "Unknown";
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(employee);
    });

    return grouped;
  };

  const getGroupHeader = (groupKey: string) => {
    if (!groupBy) return groupKey;

    switch (groupBy) {
      case "rotatingShift":
        return `Shift Pattern: ${groupKey}`;
      case "department":
        return `Department: ${groupKey}`;
      case "jobRole":
        return `Job Role: ${groupKey}`;
      case "reportingManager":
        return `Reporting Manager: ${groupKey}`;
      default:
        return groupKey;
    }
  };

  const groupedEmployees = groupEmployees();

  return (
    <div className="flex-1  overflow-hidden mt-6 ">
      <div
        className="h-full overflow-auto rounded-md 
        [scrollbar-width:thin] 
        [::-webkit-scrollbar]:w-2 
        [::-webkit-scrollbar-track]:bg-black/10 
        [::-webkit-scrollbar-thumb]:rounded-full"
      >
        <table className="w-full">
          <thead className="!bg-[#4c469f] " style={{ ...FONTS.tableHeader }}>
            <tr>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium text-white min-w-[200px] sticky left-0 bg-[#4c469f]  border-white/20 z-20">
                Employee
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                Title
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                Department
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                SubDepartment
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                Based On
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                Rotate
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium !text-white min-w-[130px]">
                Start Date
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium text-white min-w-[130px]">
                Current Shift
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium text-white min-w-[130px]">
                Next Shift
              </th>
              <th className="px-4 lg:px-4 py-3 text-left text-md font-medium text-white min-w-[130px]">
                Next Switch
              </th>
              <th className="px-4 lg:px-4 py-3 text-center text-sm font-medium text-white min-w-[120px] sticky right-0 bg-[#4c469f] border-white/20 ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody
            className="!bg-white !divide-y !divide-gray-200"
            style={{ ...FONTS.tableBody }}
          >
            {Object.keys(groupedEmployees).length > 0 ? (
              Object.entries(groupedEmployees).map(
                ([groupKey, employeesInGroup]) => (
                  <React.Fragment key={groupKey}>
                    {groupBy && (
                      <tr className="hover:bg-gray-900/70">
                        <td
                          colSpan={1}
                          className="px-4 lg:px-4 py-3 font-semibold text-gray-900 bg-gray-50/80 sticky left-0 border-gray-200/50 z-10"
                        >
                          {getGroupHeader(groupKey)}
                        </td>
                        <td
                          colSpan={10}
                          className="px-4 lg:px-4 py-3 font-semibold text-gray-900 bg-gray-50/80"
                        ></td>
                      </tr>
                    )}

                    {employeesInGroup.map((employee) => (
                      <tr
                        key={employee.id}
                        className="group hover:bg-gray-100 hover: transition-colors duration-200"
                      >
                        <td
                          className="px-2 lg:px-4 py-1 sticky left-0 bg-white group-hover:bg-gray-100 backdrop-blur border-gray-200/50 z-10"
                          style={{ ...FONTS.tableBody }}
                        >
                          <div className="flex items-center">
                            <div>
                              <div
                                className="text-sm !font-medium text-gray-900"
                                style={{ ...FONTS.tableBody }}
                              >
                                {employee.name}
                              </div>
                              <div
                                className="text-xs text-gray-500"
                                style={{ ...FONTS.tableBody }}
                              >
                                {employee.employeeId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.title}
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.department}
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.subDepartment}
                        </td>

                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.basedOn}
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.rotate}
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.startDate}
                        </td>
                        <td className="px-4 lg:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              employee.currentShift === "None"
                                ? "bg-gray-100 !text-gray-800"
                                : employee.currentShift.includes("Morning")
                                ? "bg-blue-100 !text-blue-800"
                                : employee.currentShift.includes("Night")
                                ? "bg-purple-100 !text-purple-800"
                                : "bg-green-100 !text-green-800"
                            }`}
                            style={{ ...FONTS.subParagraph }}
                          >
                            {employee.currentShift}
                          </span>
                        </td>
                        <td className="px-4 lg:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              employee.nextShift === "None"
                                ? "bg-gray-100 !text-gray-800"
                                : employee.nextShift.includes("Morning")
                                ? "bg-blue-100 !text-blue-800"
                                : employee.nextShift.includes("Night")
                                ? "bg-purple-100 !text-purple-800"
                                : "bg-green-100 !text-green-800"
                            }`}
                            style={{ ...FONTS.subParagraph }}
                          >
                            {employee.nextShift}
                          </span>
                        </td>
                        <td
                          className="px-4 lg:px-4 py-3 text-sm !text-gray-900 whitespace-nowrap"
                          style={{ ...FONTS.tableBody }}
                        >
                          {employee.nextSwitch}
                        </td>
                        <td className="px-4 lg:px-4 py-3 sticky right-0 bg-white group-hover:bg-gray-100 backdrop-blur">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                              onClick={() => onEditEmployee(employee)}
                              title="Edit Employee"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                              onClick={() => onDeleteEmployee(employee)}
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-3 text-center !text-gray-500"
                  style={{ ...FONTS.header }}
                >
                  No employees found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeShiftTable;

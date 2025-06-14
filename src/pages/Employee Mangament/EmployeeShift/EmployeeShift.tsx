import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Edit, Copy, Calendar, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FONTS } from '../../../constants/uiConstants';

interface Employee {
    id: string;
    name: string;
    employeeId: string;
    title: string;
    basedOn: string;
    rotate: string;
    startDate: string;
    currentShift: string;
    nextShift: string;
    nextSwitch: string;
    department: string;
    jobRole: string;
    reportingManager: string;
    avatar?: string;
}

const RotatingShiftAssign: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
    const [groupBy, setGroupBy] = useState<string | null>(null);
    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
    const [showGroupFilter, setShowGroupFilter] = useState(false);
    const groupDropdownRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        employee: '',
        title: '',
        basedOn: 'After',
        rotate: '',
        startDate: '',
        currentShift: '',
        nextShift: ''
    });

    const employees: Employee[] = [
        {
            id: '1',
            name: 'Ruben Mani',
            employeeId: '(rub123)',
            title: 'Morning to Night',
            department: 'Production',
            jobRole: 'Operator',
            reportingManager: 'John Doe',
            basedOn: 'After',
            rotate: 'Rotate after 5 days',
            startDate: 'May. 29, 2025',
            currentShift: 'Night shift',
            nextShift: 'Morning',
            nextSwitch: 'Jun. 3, 2025'
        },
        {
            id: '2',
            name: 'Bessie Williams',
            employeeId: '(NF10104)',
            title: 'Night to Morning',
            department: 'Maintenance',
            jobRole: 'Technician',
            reportingManager: 'Jane Smith',
            basedOn: 'Weekend',
            rotate: 'Weekly every monday',
            startDate: 'Jun. 6, 2025',
            currentShift: 'None',
            nextShift: 'Night',
            nextSwitch: 'Jun. 9, 2025'
        },
        {
            id: '3',
            name: 'Gabriel Phillips',
            employeeId: '(PEP42)',
            title: 'Morning to Night',
            department: 'Production',
            jobRole: 'Supervisor',
            reportingManager: 'John Doe',
            basedOn: 'After',
            rotate: 'Rotate after 7 days',
            startDate: 'May. 16, 2025',
            currentShift: 'Regular Shift',
            nextShift: 'Night',
            nextSwitch: 'May. 23, 2025'
        },
        {
            id: '4',
            name: 'Ganapathi Bobbili',
            employeeId: '(UB001aaaaaaa)',
            title: 'Morning to Night',
            department: 'Quality Control',
            jobRole: 'Inspector',
            reportingManager: 'Robert Johnson',
            basedOn: 'Weekend',
            rotate: 'Weekly every friday',
            startDate: 'May. 11, 2025',
            currentShift: 'Regular Shift',
            nextShift: 'Morning',
            nextSwitch: 'May. 16, 2025'
        },
        {
            id: '5',
            name: 'Mangwana Benejeur',
            employeeId: '(95632)',
            title: 'Night to Morning',
            department: 'Production',
            jobRole: 'Operator',
            reportingManager: 'John Doe',
            basedOn: 'Weekend',
            rotate: 'Weekly every monday',
            startDate: 'May. 7, 2025',
            currentShift: 'Morning Shift',
            nextShift: 'Night',
            nextSwitch: 'May. 12, 2025'
        }
    ];

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target as Node)) {
                setIsGroupDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredEmployees = employees.filter(employee => {
        if (searchTerm === '') {
            return true;
        }
        return (
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Group employees based on selected criteria
    const groupEmployees = () => {
        if (!groupBy) return { 'All Employees': filteredEmployees };

        const grouped: Record<string, Employee[]> = {};

        filteredEmployees.forEach(employee => {
            let key: string;

            if (groupBy === 'rotatingShift') {
                key = employee.title;
            } else {
                key = employee[groupBy as keyof Employee] as string;
            }

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(employee);
        });

        return grouped;
    };

    const groupedEmployees = groupEmployees();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Get display name for group headers
    const getGroupHeader = (groupKey: string) => {
        if (!groupBy) return groupKey;

        switch (groupBy) {
            case 'rotatingShift':
                return `Shift Pattern: ${groupKey}`;
            case 'department':
                return `Department: ${groupKey}`;
            case 'jobRole':
                return `Job Role: ${groupKey}`;
            case 'reportingManager':
                return `Reporting Manager: ${groupKey}`;
            default:
                return groupKey;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsAssignModalOpen(false);
        setFormData({
            employee: '',
            title: '',
            basedOn: 'After',
            rotate: '',
            startDate: '',
            currentShift: '',
            nextShift: ''
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Edit submitted for:', employeeToEdit?.id, formData);
        setIsEditModalOpen(false);
    };

    const handleDelete = () => {
        console.log('Deleting employee:', employeeToDelete?.id);
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const openEditModal = (employee: Employee) => {
        setEmployeeToEdit(employee);
        setFormData({
            employee: employee.name,
            title: employee.title,
            basedOn: employee.basedOn,
            rotate: employee.rotate,
            startDate: employee.startDate,
            currentShift: employee.currentShift,
            nextShift: employee.nextShift
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const handleGroupBySelect = (group: string | null) => {
        setGroupBy(group);
        setIsGroupDropdownOpen(false);
        setShowGroupFilter(true);
    };

    return (
        <div className=" min-h-screen flex flex-col fixed w-[79%]">
            {/* Header */}
            <div className=" border-gray-200 py-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-black" style={FONTS.header}>Rotating Shift Assign</h1>
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative w-100 md:w-64">
                            <Search className="absolute left-3 top-1/2 
                            transform -translate-y-1/2 text-black  w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by employee name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                
                            />
                        </div>



                        {/* Group By Dropdown */}
                        <div className="relative" ref={groupDropdownRef} style={{ zIndex: 99 }}>
                            <button
                                className="flex items-center gap-2 px-3
                                 md:px-4 py-2 border border-gray-300 rounded-md
                                  hover:bg-[#005353] text-sm md:text-base bg-[#006666] text-white"
                               
                                onClick={() => {
                                    setIsGroupDropdownOpen(!isGroupDropdownOpen);
                                }}
                            >
                                <MoreVertical className="w-4 h-4" />
                                Group By
                                {isGroupDropdownOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>


                            {isGroupDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => handleGroupBySelect(null)}
                                    >
                                        None
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => handleGroupBySelect('rotatingShift')}
                                    >
                                        Rotating Shift
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => handleGroupBySelect('department')}
                                    >
                                        Department
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => handleGroupBySelect('jobRole')}
                                    >
                                        Job Role
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => handleGroupBySelect('reportingManager')}
                                    >
                                        Reporting Manager
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className="text-white px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
                            style={{
                                backgroundColor: '#006666',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005353')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#006666')}
                            onClick={() => setIsAssignModalOpen(true)}
                        >
                            Assign
                        </button>

                    </div>
                </div>

                {/* Group Filter Header */}

               
            {showGroupFilter && groupBy && (
  <div className="  absolute top-20 right-4 bg-gray-100 p-2 rounded border-b-2 border-blue-500 shadow mt-20">
    <span className="text-sm font-medium">
      {groupBy === 'rotatingShift' ? 'Rotating Shift' :
       groupBy === 'department' ? 'Department' :
       groupBy === 'jobRole' ? 'Job Role' :
       groupBy === 'reportingManager' ? 'Reporting Manager' : ''}
    </span>
    <button
      onClick={() => {
        setGroupBy(null);
        setShowGroupFilter(false);
      }}
      className="text-gray-500 hover:text-gray-700 ml-2 "
    >
      <X className="w-4 h-4" />
    </button>
  </div>
)}
</div>
            {/* Table Container */}
            <div className="flex-1 overflow-hidden mt-10">
                <div className="h-full overflow-auto rounded-md custom-scrollbar w-[100%]">
                    <table className="w-full ">
                        <thead className="bg-[#006666] border-b border-gray-200 sticky top-0">
                            <tr style={{fontSize:FONTS.paragraph.fontSize,
                                fontFamily:FONTS.header3.fontFamily
                            }}>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white min-w-[100px]">
                                    Employee
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white min-w-[100px]">
                                    Title
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white  min-w-[100px]">
                                    Based On
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white  min-w-[100px]">
                                    Rotate
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white min-w-[100px]">
                                    Start Date
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white  min-w-[100px]">
                                    Current Shift
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white min-w-[100px]">
                                    Next Shift
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white  min-w-[100px]">
                                    Next Switch
                                </th>
                                <th className="px-2 lg:px-3 py-3 text-left text-md font-medium text-white min-w-[100px] sticky right-0 bg-[#006666]">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-[#eff4f5] divide-y divide-gray-200">
                            {Object.keys(groupedEmployees).length > 0 ? (
                                Object.entries(groupedEmployees).map(([groupKey, groupEmployees]) => (
                                    <React.Fragment key={groupKey}>
                                        {groupBy && (
                                            <tr className="bg-gray-50">
                                                <td colSpan={9} className="px-4 lg:px-6 py-3 font-medium text-gray-900">
                                                    {getGroupHeader(groupKey)}
                                                </td>
                                            </tr>
                                        )}

                                        {groupEmployees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="px-4 lg:px-3 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.title}</td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.basedOn}</td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.rotate}</td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.startDate}</td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${employee.currentShift === 'None' ? 'bg-gray-100 text-gray-800' :
                                                            employee.currentShift.includes('Morning') ? 'bg-blue-100 text-blue-800' :
                                                                employee.currentShift.includes('Night') ? 'bg-purple-100 text-purple-800' :
                                                                    'bg-green-100 text-green-800'
                                                        }`}>
                                                        {employee.currentShift}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${employee.nextShift === 'None' ? 'bg-gray-100 text-gray-800' :
                                                            employee.nextShift.includes('Morning') ? 'bg-blue-100 text-blue-800' :
                                                                employee.nextShift.includes('Night') ? 'bg-purple-100 text-purple-800' :
                                                                    'bg-green-100 text-green-800'
                                                        }`}>
                                                        {employee.nextShift}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.nextSwitch}</td>
                                                <td className="px-4 lg:px-3 py-4 whitespace-nowrap sticky right-0 bg-[#eff4f5]">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                                                            onClick={() => openEditModal(employee)}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                            onClick={() => openDeleteModal(employee)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                        No employees found matching your search criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Assign Modal */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md w-full max-w-2xl
                    backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">Assign Rotating Shift</h2>
                            <button
                                onClick={() => setIsAssignModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="employee" className="block text-sm font-medium text-white">
                                        Employee
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="employee"
                                            id="employee"
                                            value={formData.employee}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-white">
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="basedOn" className="block text-sm font-medium text-white">
                                        Based On
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="basedOn"
                                            name="basedOn"
                                            value={formData.basedOn}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        >
                                            <option value="After">After</option>
                                            <option value="Weekend">Weekend</option>
                                            <option value="Month">Month</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="rotate" className="block text-sm font-medium text-white">
                                        Rotate
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="rotate"
                                            id="rotate"
                                            value={formData.rotate}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            placeholder="e.g. Rotate after 5 days"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-white">
                                        Start Date
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="currentShift" className="block text-sm font-medium text-white">
                                        Current Shift
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="currentShift"
                                            name="currentShift"
                                            value={formData.currentShift}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        >
                                            <option value="">Select shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Night">Night</option>
                                            <option value="Regular Shift">Regular Shift</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nextShift" className="block text-sm font-medium text-white">
                                        Next Shift
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="nextShift"
                                            name="nextShift"
                                            value={formData.nextShift}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        >
                                            <option value="">Select shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Night">Night</option>
                                            <option value="Regular Shift">Regular Shift</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-3 py-2 md:px-4 md:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Assign Shift
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && employeeToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Edit Rotating Shift</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                                        Employee
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="employee"
                                            id="employee"
                                            value={formData.employee}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="basedOn" className="block text-sm font-medium text-gray-700">
                                        Based On
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="basedOn"
                                            name="basedOn"
                                            value={formData.basedOn}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        >
                                            <option value="After">After</option>
                                            <option value="Weekend">Weekend</option>
                                            <option value="Month">Month</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="rotate" className="block text-sm font-medium text-gray-700">
                                        Rotate
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="rotate"
                                            id="rotate"
                                            value={formData.rotate}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            placeholder="e.g. Rotate after 5 days"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                        Start Date
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="currentShift" className="block text-sm font-medium text-gray-700">
                                        Current Shift
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="currentShift"
                                            name="currentShift"
                                            value={formData.currentShift}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        >
                                            <option value="">Select shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Night">Night</option>
                                            <option value="Regular Shift">Regular Shift</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nextShift" className="block text-sm font-medium text-gray-700">
                                        Next Shift
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="nextShift"
                                            name="nextShift"
                                            value={formData.nextShift}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            required
                                        >
                                            <option value="">Select shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Night">Night</option>
                                            <option value="Regular Shift">Regular Shift</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && employeeToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Confirm Deletion</h2>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete the rotating shift assignment for <span className="font-semibold">{employeeToDelete.name}</span>?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RotatingShiftAssign;
import React, { useState } from "react";
import type { Employee, Department, JobTitle } from "../../components/Employee/Employee";

type Props = {
    employee: Employee;
    onSave: (updated: Employee) => void;
    onCancel: () => void;
};

const departments: Department[] = [

    { id: "1", title: "Engineering" },
    { id: "2", title: "HR" },
];

const jobTitles: JobTitle[] = [
    { id: "1", department: "Manager" },
    { id: "2", department: "Designer" },
];

const EmployeeEditForm = ({ employee, onSave, onCancel }: Props) => {
    const [formData, setFormData] = useState<Employee>(employee);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "department") {
            const dept = departments.find((d) => d.id === value);
            if (dept) setFormData({ ...formData, department: dept });
        } else if (name === "jobTitle") {
            const job = jobTitles.find((j) => j.id === value);
            if (job) setFormData({ ...formData, jobTitle: job });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 bg-white rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">Edit Employee</h2>

            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
            />

            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="w-full border p-2 rounded"
            />

            <select
                name="department"
                value={formData.department.id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.name}
                    </option>
                ))}
            </select>

            <select
                name="jobTitle"
                value={formData.jobTitle.id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                {jobTitles.map((j) => (
                    <option key={j.id} value={j.id}>
                        {j.title}
                    </option>
                ))}
            </select>

            <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contractor">Contractor</option>
            </select>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EmployeeEditForm ;

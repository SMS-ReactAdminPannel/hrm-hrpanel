import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { PlusIcon, UserIcon, UsersIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type PositionType = 'manager' | 'team-lead' | 'member' | 'other';

interface Employee {
  id: string;
  name: string;
  position: string;
  type: 'employee';
  positionType: PositionType;
}

interface Department {
  id: string;
  name: string;
  type: 'department' | 'team';
  children: (Department | Employee)[];
  expanded?: boolean;
}

const initialData: Department = {
  id: '1',
  name: 'SQLS SENSATION',
  type: 'department',
  expanded: true,
  children: [
    {
      id: '2',
      name: 'Development Department',
      type: 'department',
      expanded: false,
      children: [
        {
          id: 'e1',
          name: 'Rajesh Kumar',
          position: 'Development Manager',
          type: 'employee',
          positionType: 'manager'
        },
        {
          id: '3',
          name: 'Frontend Team',
          type: 'team',
          expanded: false,
          children: [
            {
              id: 'e2',
              name: 'Priya Sharma',
              position: 'Frontend TL',
              type: 'employee',
              positionType: 'team-lead'
            },
            {
              id: 'e3',
              name: 'Amit Patel',
              position: 'React Developer',
              type: 'employee',
              positionType: 'member'
            },
            {
              id: 'e4',
              name: 'Neha Gupta',
              position: 'UI Developer',
              type: 'employee',
              positionType: 'member'
            }
          ]
        },
        {
          id: '4',
          name: 'Backend Team',
          type: 'team',
          expanded: false,
          children: [
            {
              id: 'e5',
              name: 'Sanjay Verma',
              position: 'Backend TL',
              type: 'employee',
              positionType: 'team-lead'
            },
            {
              id: 'e6',
              name: 'Deepak Singh',
              position: 'Node.js Developer',
              type: 'employee',
              positionType: 'member'
            }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Sales Department',
      type: 'department',
      expanded: false,
      children: [
        {
          id: 'e7',
          name: 'Anjali Mehta',
          position: 'Sales Manager',
          type: 'employee',
          positionType: 'manager'
        },
        {
          id: '6',
          name: 'North Region',
          type: 'team',
          expanded: false,
          children: [
            {
              id: 'e8',
              name: 'Vikram Joshi',
              position: 'Regional TL',
              type: 'employee',
              positionType: 'team-lead'
            },
            {
              id: 'e9',
              name: 'Rahul Nair',
              position: 'Sales Executive',
              type: 'employee',
              positionType: 'member'
            }
          ]
        }
      ]
    }
  ]
};

const positionStyles: Record<PositionType, string> = {
  'manager': 'bg-blue-100 border-blue-300 text-blue-800',
  'team-lead': 'bg-green-100 border-green-300 text-green-800',
  'member': 'bg-purple-100 border-purple-300 text-purple-800',
  'other': 'bg-gray-100 border-gray-300 text-gray-800'
};

const positionIcons: Record<PositionType, JSX.Element> = {
  'manager': <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />,
  'team-lead': <UserIcon className="h-5 w-5 text-green-600 mr-2" />,
  'member': <UserIcon className="h-5 w-5 text-purple-600 mr-2" />,
  'other': <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
};

const DepartmentNode: React.FC<{
  data: Department;
  onAdd: (parentId: string, node: Department | Employee) => void;
  onToggleExpand: (id: string) => void;
}> = ({ data, onAdd, onToggleExpand }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = (newNode: { name: string; type: 'department' | 'team' | 'employee'; position?: string; positionType?: PositionType }) => {
    if (newNode.type === 'employee') {
      onAdd(data.id, {
        id: `e${Math.floor(Math.random() * 10000)}`,
        name: newNode.name,
        position: newNode.position || '',
        type: 'employee',
        positionType: newNode.positionType || 'other'
      });
    } else {
      onAdd(data.id, {
        id: `${Math.floor(Math.random() * 10000)}`,
        name: newNode.name,
        type: newNode.type,
        children: [],
        expanded: false
      });
    }
  };

  const toggleExpand = () => {
    onToggleExpand(data.id);
  };

  return (
    <>
      <div className={`bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center relative group ${data.type === 'department' ? 'border-blue-200' : 'border-green-200'}`}>
        <div className="flex items-center mb-1 w-full">
          {data.children.length > 0 && (
            <button onClick={toggleExpand} className="mr-2 text-gray-500 hover:text-gray-700">
              {data.expanded ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
          )}
          <div className="flex items-center flex-grow">
            {data.type === 'department' ? (
              <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
            ) : (
              <UserIcon className="h-5 w-5 text-green-600 mr-2" />
            )}
            <h3 className="font-semibold text-gray-800">{data.name}</h3>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            title="Add"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 self-start ml-7">
          {data.type === 'department' ? 'Department' : 'Team'} • {data.children.length} members
        </p>
      </div>

      {isAddModalOpen && (
        <AddNodeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
          parentType={data.type}
        />
      )}

      {data.expanded && data.children.map((child) => (
        <TreeNode
          key={child.id}
          label={
            child.type === 'employee' ? (
              <EmployeeNode data={child} />
            ) : (
              <DepartmentNode
                data={child}
                onAdd={onAdd}
                onToggleExpand={onToggleExpand}
              />
            )
          }
        />
      ))}
    </>
  );
};

const EmployeeNode: React.FC<{ data: Employee }> = ({ data }) => {
  return (
    <div className={`border rounded-lg p-3 shadow-sm flex flex-col items-center ${positionStyles[data.positionType]}`}>
      <div className="flex items-center mb-1">
        {positionIcons[data.positionType]}
        <h3 className="font-medium">{data.name}</h3>
      </div>
      <p className="text-xs">{data.position}</p>
    </div>
  );
};

const AddNodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; type: 'department' | 'team' | 'employee'; position?: string; positionType?: PositionType }) => void;
  parentType?: 'department' | 'team';
}> = ({ isOpen, onClose, onSubmit, parentType }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'department' | 'team' | 'employee'>('employee');
  const [position, setPosition] = useState('');
  const [positionType, setPositionType] = useState<PositionType>('other');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, position: type === 'employee' ? position : undefined, positionType });
    setName('');
    setPosition('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {parentType && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={type}
                onChange={(e) => setType(e.target.value as 'department' | 'team' | 'employee')}
              >
                {parentType === 'department' && (
                  <>
                    <option value="department">Sub-department</option>
                    <option value="team">Team</option>
                  </>
                )}
                <option value="employee">Employee</option>
              </select>
            </div>
          )}

          {type === 'employee' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={positionType}
                  onChange={(e) => setPositionType(e.target.value as PositionType)}
                >
                  <option value="manager">Manager</option>
                  <option value="team-lead">Team Lead</option>
                  <option value="member">Team Member</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OrganizationChart: React.FC = () => {
  const [data, setData] = useState<Department>(initialData);

  const handleAddNode = (parentId: string, newNode: Department | Employee) => {
    const updateTree = (node: Department): Department => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }

      return {
        ...node,
        children: node.children.map((child) =>
          child.type !== 'employee' ? updateTree(child as Department) : child
        ),
      };
    };

    setData(updateTree(data));
  };

  const handleToggleExpand = (id: string) => {
    const updateTree = (node: Department): Department => {
      if (node.id === id) {
        return {
          ...node,
          expanded: !node.expanded,
        };
      }

      return {
        ...node,
        children: node.children.map((child) =>
          child.type !== 'employee' ? updateTree(child as Department) : child
        ),
      };
    };

    setData(updateTree(data));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Company Organizational Chart</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Tree
            lineWidth="2px"
            lineColor="#93c5fd"
            lineBorderRadius="10px"
            label={
              <div className="bg-white border border-blue-300 rounded-lg p-4 shadow-md flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <UsersIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                </div>
                <p className="text-sm text-gray-500">Root Organization</p>
              </div>
            }
          >
            {data.children.map((child) =>
              child.type === 'employee' ? (
                <TreeNode key={child.id} label={<EmployeeNode data={child} />} />
              ) : (
                <TreeNode
                  key={child.id}
                  label={
                    <DepartmentNode
                      data={child as Department}
                      onAdd={handleAddNode}
                      onToggleExpand={handleToggleExpand}
                    />
                  }
                />
              )
            )}
          </Tree>
        </div>
      </div>
    </div>
  );
};

export default OrganizationChart;
import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

const RecruitmentModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Create New Recruitment</h2>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <Input placeholder="e.g. Engineering" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input type="date" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" rows={4} />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button className="bg-blue-600 text-white">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruitmentModal;
import React from "react";

type AnnouncementType = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Props = {
  formData: AnnouncementType;
  setFormData: (data: AnnouncementType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isEditing: boolean;
};

const AnnouncementForm: React.FC<Props> = ({ formData, setFormData, onSubmit, onClose, isEditing }) => {
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  <div className="border w-full max-w-xl rounded-lg p-6 shadow-lg relative backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-clip-padding animate-fade-in">
    <h2 className="text-xl font-semibold text-white mb-4">
      {isEditing ? "Edit Announcement" : "Add New Announcement"}
    </h2>

    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">Title</label>
        <input
          title="Announcement Title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-1">Start Date</label>
          <input
            title="Announcement Start Date"
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-1">End Date</label>
          <input
            title="Announcement End Date"
            type="date"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Description</label>
        <textarea
          title="Announcement Description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
        ></textarea>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#4c469f] text-white rounded-md hover:bg-[#3b3880]"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AnnouncementForm;

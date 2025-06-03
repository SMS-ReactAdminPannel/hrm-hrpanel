type Announcement = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

type AnnouncementFormProps = {
  formData: Announcement;
  onChange: (field: keyof Announcement, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

const AnnouncementForm = ({ formData, onChange, onSubmit, onCancel }: AnnouncementFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          title="Add Title"
          required
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059212]"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            title="Start Date"
            required
            value={formData.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059212]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            title="End Date"
            required
            value={formData.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059212]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          title="Add Description"
          required
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059212]"
        ></textarea>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#059212] text-white rounded-md hover:bg-[#006666]"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;

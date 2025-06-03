import { useState } from "react";
import { announcements as initialAnnouncements } from "../AnnouncementDatas/AnnouncementsData";
import AnnouncementTable from "./AnnouncementTable";
import AnnouncementForm from "./AnnouncementForm";

const Announcement = () => {
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sliced = filtered.slice(0, entriesToShow);

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setData((prev) => [...prev, formData]);
    setFormData({ title: "", startDate: "", endDate: "", description: "" });
    setShowModal(false);
  };

  return (
    <div className="p-5 text-[17px] relative">
      <section className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Announcements</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#059212] text-white hover:bg-[#006666] px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add Announcement
        </button>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gray-200 w-full max-w-xl rounded-lg p-6 shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Announcement
            </h2>

            <AnnouncementForm
              formData={formData}
              onChange={(field, value) => setFormData({ ...formData, [field]: value })}
              onSubmit={handleAddAnnouncement}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <div className="my-4 p-4 rounded-lg bg-gray-200">
        <section className="flex justify-between gap-4 py-6 bg-white rounded-lg px-4">
          <aside className="flex items-center gap-2 text-gray-700">
            <label htmlFor="entries" className="font-medium">
              Show
            </label>
            <select
              id="entries"
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#059212]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-600">Entries</span>
          </aside>

          <aside className="flex items-center gap-2 text-gray-700">
            <label htmlFor="search" className="font-medium">
              Search
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search by title..."
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#059212]"
            />
          </aside>
        </section>

        <AnnouncementTable data={sliced} />
      </div>
    </div>
  );
};

export default Announcement;

import { useState } from "react";
import { announcements as initialAnnouncements } from "../AnnouncementDatas/AnnouncementsData";
import AnnouncementTable from "./AnnouncementTable";
import AnnouncementForm from "./AnnouncementForm";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FONTS } from "../../../constants/uiConstants";
import { Search } from "lucide-react";

type AnnouncementType = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

const Announcement = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<AnnouncementType[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<AnnouncementType>({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filtered.slice(startIndex, startIndex + entriesPerPage);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = formData;
      setData(updated);
    } else {
      setData((prev) => [...prev, formData]);
    }
    setFormData({ title: "", startDate: "", endDate: "", description: "" });
    setEditIndex(null);
    setShowModal(false);
    setCurrentPage(1);
  };

  const handleEdit = (announcement: AnnouncementType, index: number) => {
    const globalIndex = (currentPage - 1) * entriesPerPage + index;
    setFormData(announcement);
    setEditIndex(globalIndex);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className=" text-[17px] relative" style={{ fontFamily: FONTS.paragraph.fontFamily }}>
      <section className="flex justify-between items-center mb-4">
        <h1 className=" text-black" style={FONTS.header}>Announcements</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setFormData({ title: "", startDate: "", endDate: "", description: "" });
            setEditIndex(null);
          }}
          className="bg-[#006666] text-white px-4 py-2 rounded-md text-sm"
        >
          Add Announcement
        </button>
      </section>

      <div className="my-4 rounded-lg">
        <section className="flex justify-between gap-4 py-6  rounded-lg px-4">
          <aside className="flex items-center gap-2 text-gray-700">
            <label htmlFor="entries" className="font-medium">Show</label>
            <select
              id="entries"
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-black rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#006666]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-black">Entries</span>
          </aside>

          <aside className="flex items-center gap-2 text-gray-700">
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 mt-1.5 text-gray-500">
      <Search className="w-4 h-4" />
    </span>
    <input
      id="search"
      type="text"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Search by title..."
      className="pl-9 bg-[#eff4f5] rounded-md px-3 py-1  focus:outline-none focus:ring-2 focus:ring-[#006666]"
    />
  </div>
  </aside>
        </section>

        {showModal && (
          <AnnouncementForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddOrUpdate}
            onClose={() => {
              setShowModal(false);
              setEditIndex(null);
            }}
            isEditing={editIndex !== null}
          />
        )}
        <AnnouncementTable data={currentData} onEdit={handleEdit} onDelete={handleDelete} />

        {totalPages > 1 && (
          <div className="flex justify-between bg-white p-2 rounded-b-lg">
            <div className="text-sm text-gray-600 p-2">
              Showing {currentData.length} announcements
            </div>
            <div className="flex gap-2">
              <button
                title="previous"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded hover:bg-gray-400 text-[#006666] disabled:opacity-50"
              >
                <TbPlayerTrackPrevFilled />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? "bg-[#006666] text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                title="Next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50 text-[#006666]"
              >
                <TbPlayerTrackNextFilled />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;

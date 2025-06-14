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
    <div
      className=" text-[17px] relative"
      style={{ fontFamily: FONTS.paragraph.fontFamily }}
    >
      <section className="flex justify-between items-center mb-4">
        <h1 className=" text-black" style={FONTS.header}>
          Announcements
        </h1>
        
      </section>
      {/* button */}
<div className="flex justify-between"> 
<div className="flex  gap-4  rounded-lg ">
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
                className="pl-9 bg-gray-100 rounded-md px-8 py-2.5  focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
              />
            </div>
          </aside>
        </div>
         <div>
   <button
  onClick={() => {
    setShowModal(true);
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditIndex(null);
  }}
            className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-[#006666]  rounded-md group"
>
  {/* <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#3e3a85] rounded-full group-hover:w-56 group-hover:h-56"></span> */}

  <span className="absolute bottom-0 left-0 h-full -ml-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-auto h-full opacity-100 object-stretch"
      viewBox="0 0 487 487"
    >
      <path
        fillOpacity=".1"
        fillRule="nonzero"
        fill="#FFF"
        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
      />
    </svg>
  </span>

  <span className="absolute top-0 right-0 w-12 h-full -mr-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="object-cover w-full h-full"
      viewBox="0 0 487 487"
    >
      <path
        fillOpacity=".1"
        fillRule="nonzero"
        fill="#FFF"
        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
      />
    </svg>
  </span>

  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>

  <span className="relative text-base font-semibold"
  
  >Add Announcement</span>
</button>
 </div>
</div>
      <div className="my-4 rounded-lg">

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
        <AnnouncementTable
          data={currentData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {totalPages > 1 && (
          <div className="flex justify-end  mt-2 p-2 rounded-b-lg">
            {/* <div className="text-sm text-gray-600 p-2">
              Showing {currentData.length} announcements
            </div> */}
            <div className="flex gap-2">
              <button
                title="previous"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-full hover:bg-[#a6a3cf] text-[#4c469f] disabled:opacity-50"
              >
                <TbPlayerTrackPrevFilled />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === i + 1
                      ? "bg-[#4c469f] text-white"
                      : "bg-gray-300 hover:bg-[#a6a3cf]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                title="Next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-full hover:bg-[#a6a3cf] disabled:opacity-50 text-[#4c469f]"
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

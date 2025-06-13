import { useState, useRef, useEffect } from 'react';
import LeaveTypeCard from './LeaveCards';
import { FONTS } from '../../constants/uiConstants';

type Card = {
  id: number;
  title: string;
  periodIn: string;
  totalDays: number;
  reset: string;
  carryforwardType: string;
  isPaid: string;
  requireApproval: string;
  requireAttachment: string;
  excludeCompanyLeaves: string;
  excludeHolidays: string;
  isEncashable: string;
};

type NewCard = {
  title: string;
  periodIn: string;
  totalDays: string;
  reset: string;
  carryforwardType: string;
  isPaid: string;
  requireApproval: string;
  requireAttachment: string;
  excludeCompanyLeaves: string;
  excludeHolidays: string;
  isEncashable: string;
};

const getRandomColor = () => {
  const colors = [
    'bg-red-200', 'bg-blue-200', 'bg-green-200',
    'bg-yellow-200', 'bg-purple-200', 'bg-pink-200',
    'bg-indigo-200', 'bg-teal-200', 'bg-orange-200',
    'bg-amber-200', 'bg-lime-200', 'bg-emerald-200',
    'bg-cyan-200', 'bg-sky-200', 'bg-violet-200',
    'bg-fuchsia-200', 'bg-rose-200'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function LeaveTypes() {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem('leaveTypeCards');
    return savedCards ? JSON.parse(savedCards) : [
      {
        id: 1,
        title: "Working Saturday",
        periodIn: "Day",
        totalDays: 30,
        reset: "No",
        carryforwardType: "No Carry Forward",
        isPaid: "Unpaid",
        requireApproval: "Yes",
        requireAttachment: "No",
        excludeCompanyLeaves: "No",
        excludeHolidays: "No",
        isEncashable: "No"
      },
      {
        id: 2,
        title: "Annual Leave",
        periodIn: "Day",
        totalDays: 20,
        reset: "Yearly",
        carryforwardType: "Carry Forward with Limit",
        isPaid: "Paid",
        requireApproval: "Yes",
        requireAttachment: "No",
        excludeCompanyLeaves: "Yes",
        excludeHolidays: "Yes",
        isEncashable: "Yes"
      },
      {
        id: 3,
        title: "Sick Leave",
        periodIn: "Day",
        totalDays: 10,
        reset: "Yearly",
        carryforwardType: "No Carry Forward",
        isPaid: "Paid",
        requireApproval: "Yes",
        requireAttachment: "Yes",
        excludeCompanyLeaves: "No",
        excludeHolidays: "No",
        isEncashable: "No"
      }
    ];
  });

  const [cardColors, setCardColors] = useState<Record<number, string>>(() => {
    const colors: Record<number, string> = {};
    const savedCards = localStorage.getItem('leaveTypeCards') || '[]';
    JSON.parse(savedCards).forEach((card: Card) => {
      colors[card.id] = getRandomColor();
    });
    return colors;
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newCard, setNewCard] = useState<NewCard>({
    title: "",
    periodIn: "Day",
    totalDays: "",
    reset: "No",
    carryforwardType: "No Carry Forward",
    isPaid: "Unpaid",
    requireApproval: "Yes",
    requireAttachment: "No",
    excludeCompanyLeaves: "No",
    excludeHolidays: "No",
    isEncashable: "No"
  });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [showDropdownId, setShowDropdownId] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const detailsModalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem('leaveTypeCards', JSON.stringify(cards));
  }, [cards]);

  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdownId(null);
      }

      // Close modal if clicked outside
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }

      // Close details modal if clicked outside
      if (isDetailsModalOpen && detailsModalRef.current && !detailsModalRef.current.contains(event.target as Node)) {
        closeDetailsModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, isDetailsModalOpen]);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.isPaid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (title: string) => {
    return title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleAddCard = () => {
    if (newCard.title && newCard.totalDays) {
      if (editingCard) {
        // Update existing card
        const updatedCards = cards.map(card =>
          card.id === editingCard.id ? {
            ...newCard,
            id: editingCard.id,
            totalDays: parseFloat(newCard.totalDays) || 0
          } : card
        );
        setCards(updatedCards);
        setEditingCard(null);
      } else {
        // Add new card
        const newId = Math.max(0, ...cards.map(card => card.id)) + 1;
        const cardToAdd: Card = {
          id: newId,
          title: newCard.title,
          periodIn: newCard.periodIn,
          totalDays: parseFloat(newCard.totalDays) || 0,
          reset: newCard.reset,
          carryforwardType: newCard.carryforwardType,
          isPaid: newCard.isPaid,
          requireApproval: newCard.requireApproval,
          requireAttachment: newCard.requireAttachment,
          excludeCompanyLeaves: newCard.excludeCompanyLeaves,
          excludeHolidays: newCard.excludeHolidays,
          isEncashable: newCard.isEncashable
        };

        setCards([...cards, cardToAdd]);
        setCardColors(prev => ({ ...prev, [newId]: getRandomColor() }));
      }

      setNewCard({
        title: "",
        periodIn: "Day",
        totalDays: "",
        reset: "No",
        carryforwardType: "No Carry Forward",
        isPaid: "Unpaid",
        requireApproval: "Yes",
        requireAttachment: "No",
        excludeCompanyLeaves: "No",
        excludeHolidays: "No",
        isEncashable: "No"
      });
      setIsModalOpen(false);
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setNewCard({
      title: card.title,
      periodIn: card.periodIn,
      totalDays: card.totalDays.toString(),
      reset: card.reset,
      carryforwardType: card.carryforwardType,
      isPaid: card.isPaid,
      requireApproval: card.requireApproval,
      requireAttachment: card.requireAttachment,
      excludeCompanyLeaves: card.excludeCompanyLeaves,
      excludeHolidays: card.excludeHolidays,
      isEncashable: card.isEncashable
    });
    setIsModalOpen(true);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
    setShowDropdownId(null);
  };

  const toggleDropdown = (id: number) => {
    setShowDropdownId(showDropdownId === id ? null : id);
  };

  const closeModal = () => {
    setEditingCard(null);
    setNewCard({
      title: "",
      periodIn: "Day",
      totalDays: "",
      reset: "No",
      carryforwardType: "No Carry Forward",
      isPaid: "Unpaid",
      requireApproval: "Yes",
      requireAttachment: "No",
      excludeCompanyLeaves: "No",
      excludeHolidays: "No",
      isEncashable: "No"
    });
    setIsModalOpen(false);
  };

  const showCardDetails = (card: Card) => {
    setSelectedCard(card);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedCard(null);
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="relative" >

      {/* Main content */}
      <div className={` transition-all duration-300 ${(isModalOpen || isDetailsModalOpen) ? 'blur-sm' : ''}`}>
        {/* Search and Add Card */}
        <div className="flex  md:flex-row justify-between mb-6 gap-4">
          <div className=' font-bold ' style={FONTS.header} >
            Leave Types
          </div>
          <div className=" flex gap-5 ml-auto">
            <div className="relative">
              <div className="absolute inset-y-0 pb-2 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            <button
              className=" ml-auto w-38 rounded-md text-white px-4 py-2 h-9 shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => {
                setEditingCard(null);
                setIsModalOpen(true);
              }}
              style={{ backgroundColor: '#006666' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Leave Type
            </button>

          </div>


        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <LeaveTypeCard
              key={card.id}
              card={card}
              color={cardColors[card.id] || 'bg-blue-200'}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onShowDetails={showCardDetails}
              dropdownRef={dropdownRef}
              showDropdown={showDropdownId === card.id}
              toggleDropdown={() => toggleDropdown(card.id)}
              getInitials={getInitials}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-clip-padding backdrop-filter border rounded-md  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl w-[400px]"
          >
            <div className="p-4 px-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {editingCard ? "Edit Leave Type" : "Create New Leave Type"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white rounded hover:text-gray-600 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">Title<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                    value={newCard.title}
                    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    placeholder="Enter leave type title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">Description<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                    placeholder="Description"
                  />
                </div>

                {/* Total Days */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">Total Days<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                    value={newCard.totalDays}
                    onChange={(e) => setNewCard({ ...newCard, totalDays: e.target.value })}
                    placeholder="Enter total days"
                    required
                  />
                </div>

                {/* Is Paid */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">Is Paid</label>
                  <select
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition text-gray-700"
                    value={newCard.isPaid}
                    onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="px-5 border border-gray-300 text-white rounded-lg hover:bg-gray-100 transition"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={`px-5 py-1 rounded-lg text-white transition ${!newCard.title || !newCard.totalDays
                      ? 'bg-[#006666] opacity-50 cursor-not-allowed'
                      : 'bg-[#006666] hover:bg-[#004d4d]'
                    }`}
                  onClick={handleAddCard}
                  type="button"
                  disabled={!newCard.title || !newCard.totalDays}
                >
                  {editingCard ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Details Modal */}
      {isDetailsModalOpen && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={detailsModalRef}
            className="bg-gray-50 rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${cardColors[selectedCard.id] || 'bg-blue-200'} flex items-center justify-center text-black text-xl font-bold mr-4`}>
                    {getInitials(selectedCard.title)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedCard.title}</h3>
                </div>
                <button
                  onClick={closeDetailsModal}
                  className="text-gray-500 px-4 py-2 rounded-md hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Period In" value={selectedCard.periodIn} />
                <DetailItem label="Is Paid" value={selectedCard.isPaid} />
                <DetailItem label="Total Days" value={selectedCard.totalDays.toString()} />
                <DetailItem label="Is Paid" value={selectedCard.isPaid} />

                {/* <DetailItem label="Require Approval" value={selectedCard.requireApproval} />
                <DetailItem label="Require Attachment" value={selectedCard.requireAttachment} />
                <DetailItem label="Exclude Company Leaves" value={selectedCard.excludeCompanyLeaves} />
                <DetailItem label="Exclude Holidays" value={selectedCard.excludeHolidays} />
                <DetailItem label="Is Encashable" value={selectedCard.isEncashable} /> */}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-1 bg-[#006666] text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={closeDetailsModal}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for detail items
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b pb-3">
      <span className="text-gray-500 text-sm">{label}:</span>
      <span className="ml-2 font-medium text-gray-800">{value}</span>
    </div>
  );
}
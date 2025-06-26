import { useState, useRef, useEffect } from 'react';
import LeaveTypeCard from './LeaveTypeCard';
import LeaveTypeModal from './LeaveTypeModal';
import LeaveTypeDetailsModal from './LeaveTypeDetailsModal';
import { type Card, type NewCard, FONTS } from './types';
import { createLeaveType, deleteLeaveType, getAllLeaveTypes } from '../../features/leaveTypes/services';



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

export default function LeaveTypesComponent() {

  const [leave,setLeaves] = useState<any []>()
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);


   const fetchLeaveTypes = async () => {
       try {
         const response: any = await getAllLeaveTypes();
         const leave = response;
         setLeaves(leave)
         console.log("Leaves fetched:", leave);
       } catch (error) {
         console.error("Error fetching leaves:", error);
       }
     };
   
     useEffect(() => {
       fetchLeaveTypes();
     }, []);

     
    
const handleAddEvent = async (eventData: {
  totalDays: number;
  title: string;
  description: string;
}) => {
  try {
    if (editingCard) {
      await updateLeaveType(editingCard.uuid, {
        title: eventData.title,
        max_days: Number(eventData.totalDays),
        description: eventData.description
      });
      console.log("Leave type updated:", editingCard.uuid);
    } else {
      await createLeaveType({
        title: eventData.title,
        max_days: Number(eventData.totalDays),
        description: eventData.description
      });
      console.log("Leave type created");
    }

    await fetchLeaveTypes();
    setEditingCard(null); // clear edit state
    setIsModalOpen(false); // close modal
  } catch (error) {
    console.error("Failed to create/update leave type:", error);
  }
};
     
const handleDeleteLeaveType = async (leaveId: string) => {
    console.log('delete handler triggered for:', leaveId);
  try {
    await deleteLeaveType(leaveId);
    console.log("Deleted:", leaveId);
    await fetchLeaveTypes();
  } catch (error) {
    console.error("Error deleting leave type:", error);
  }
};

  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem('leaveTypeCards');
    return savedCards ? JSON.parse(savedCards) : [

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
    isEncashable: "No",
    description: "none"
  });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [showDropdownId, setShowDropdownId] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem('leaveTypeCards', JSON.stringify(cards));
  }, [cards]);

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
          isEncashable: newCard.isEncashable,
          description: ''
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
        isEncashable: "No",
        description: "None"
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
      isEncashable: card.isEncashable,
      description: card.description
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
      isEncashable: "No",
      description: "None"
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
    <div className="relative">
      <div className={`transition-all duration-300 ${(isModalOpen || isDetailsModalOpen) ? 'blur-sm' : ''}`}>
        <div className="flex md:flex-row justify-between mb-6 gap-4">
          <div className='font-bold' style={FONTS.header}>
            Leave Types
          </div>
          <div className="flex gap-5 ml-auto">
            <div className="relative">
              <div className="absolute inset-y-0 pb-2 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
              className="ml-auto w-38 rounded-md text-white px-4 py-2 h-9 shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
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

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(leave ?? []).map((card) => (
            <LeaveTypeCard
              key={card.id}
              card={card}
              color={cardColors[card.id] || 'bg-blue-200'}
              onEdit={handleEditCard}
              onDelete={handleDeleteLeaveType}
              onShowDetails={showCardDetails}
              dropdownRef={dropdownRef}
              showDropdown={showDropdownId === card.uuid}
              toggleDropdown={() => toggleDropdown(card.uuid)}
              getInitials={getInitials}
            />
          ))}
        </div>
      </div>

      <LeaveTypeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(card) => {
          handleAddEvent({
            title: card.title,
            totalDays: Number(card.totalDays),
            description: card.description
          });
        }}
        newCard={newCard}
        setNewCard={setNewCard}
        editingCard={editingCard}
        
      />

      <LeaveTypeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        selectedCard={selectedCard}
        cardColors={cardColors}
        getInitials={getInitials}
      />
    </div>
  );
}
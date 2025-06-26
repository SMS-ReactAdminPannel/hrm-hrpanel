import { useState, useRef, useEffect } from 'react';
import LeaveTypeCard from './LeaveTypeCard';
import LeaveTypeModal from './LeaveTypeModal';
import LeaveTypeDetailsModal from './LeaveTypeDetailsModal';
import { type Card, type NewCard } from './types';
import { FONTS } from '../../constants/uiConstants';
import { leavetypeapi } from '../../features/LeaveType/services';

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
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (title: string) => {
    return title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const [newCard, setNewCard] = useState<NewCard>({
    _id: "",
    title: "",
    max_days: "",
    description: "",
    isPaid: "",
    reset: "No",
    periodIn: "Day",
    carryforwardType: "No Carry Forward",
    requireApproval: "Yes",
    requireAttachment: "No",
    excludeCompanyLeaves: "No",
    excludeHolidays: "No",
    isEncashable: "No"
  });

  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const handleAddCard = () => {
    if (newCard.title && newCard.max_days) {
      if (editingCard) {
        const updatedCards = cards.map((card) =>
          card.title === editingCard.title ? {
            ...newCard,
            _id: editingCard.title,
            color: editingCard.color || getRandomColor()
          } : card
        );
        setCards(updatedCards);
        setEditingCard(null);
      } else {
        const cardToAdd: Card = {
          ...newCard,
          color: getRandomColor()
        };
        setCards([...cards, cardToAdd]);
      }

      setNewCard({
        _id: "",
        title: "",
        periodIn: "Day",
        isPaid: "",
        reset: "No",
        max_days: "",
        description:"",
        carryforwardType: "No Carry Forward",
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
      _id: card._id || "",
      title: card.title || "",
      max_days: card.max_days || "",
      description: card.description || "",
      isPaid: card.isPaid || "",
      reset: card.reset || "No",
      periodIn: card.periodIn || "Day",
      carryforwardType: card.carryforwardType || "No Carry Forward",
      requireApproval: card.requireApproval || "Yes",
      requireAttachment: card.requireAttachment || "No",
      excludeCompanyLeaves: card.excludeCompanyLeaves || "No",
      excludeHolidays: card.excludeHolidays || "No",
      isEncashable: card.isEncashable || "No"
    });
    setIsModalOpen(true);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card._id !== id.toString()));
    setShowDropdownId(null);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdownId(showDropdownId === id ? null : id);
  };

  const closeModal = () => {
    setEditingCard(null);
    setNewCard({
      _id: "",
      title: "",
      max_days: "",
      description: "",
      isPaid: "",
      reset: "No",
      periodIn: "Day",
      carryforwardType: "No Carry Forward",
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

  
  //for filter basic of title 
  const [allCards, setAllCards] = useState<Card[]>([]);
  //get backend data
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchLeaveType = async () => {
    try {
      const response= await leavetypeapi();
      const visitors = response?.data ?? [];
      console.log("Fetched leave types:", visitors);
      setAllCards(visitors);
      setFilteredCards(visitors);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  useEffect(() => {
    fetchLeaveType();
  }, []);

  useEffect(() => {
    const filtered = allCards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, allCards]);

  

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${(isModalOpen || isDetailsModalOpen) ? 'blur-sm' : ''}`}>
        <div className="flex md:flex-row justify-between mb-6 gap-4">
          <div className='font-bold' style={{ ...FONTS.header }}>
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
                placeholder="Search leave types..."
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
              style={{ backgroundColor: '#3a357f'  }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Leave Type
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <LeaveTypeCard
              key={card._id}
              card={card}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onShowDetails={showCardDetails}
              dropdownRef={dropdownRef}
              showDropdown={showDropdownId === card._id}
              toggleDropdown={() => toggleDropdown(card._id)}
              getInitials={getInitials}
              color={card.color} 
            />
          ))}
        </div>
      </div>

      <LeaveTypeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddCard}
        newCard={newCard}
        setNewCard={setNewCard}
        editingCard={editingCard}
      />

      <LeaveTypeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        selectedCard={selectedCard}
        getInitials={getInitials}
        
      />
    </div>
  );
}

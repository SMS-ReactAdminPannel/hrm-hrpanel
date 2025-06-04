import { useState, useRef, useEffect } from 'react';
import { FONTS } from '../../constants/uiConstants';

type Card = {
  id: number;
  title: string;
  isPretax: string;
  isRecurring: string;
  deductionType: string;
  isConditionBased: string;
  calculationType: string;
  employerRate: number;
  employeeRate: number;
  hasMaxLimit: string;
  eligibilityCondition: string;
  eligibilityValue: number;
};

type NewCard = {
  title: string;
  isPretax: string;
  isRecurring: string;
  deductionType: string;
  isConditionBased: string;
  calculationType: string;
  employerRate: string;
  employeeRate: string;
  hasMaxLimit: string;
  eligibilityCondition: string;
  eligibilityValue: string;
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

// Custom Select Component
const CustomSelect = ({ 
  label, 
  value, 
  options, 
  onChange,
  className = ""
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[] | string[];
  onChange: (value: string) => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const normalizedOptions = options.map(option => 
    typeof option === 'string' ? { value: option, label: option } : option
  );

  const selectedLabel = normalizedOptions.find(opt => opt.value === value)?.label || value;

  return (
    <div className={`space-y-2 relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Custom dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
      >
        {selectedLabel}
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {normalizedOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`p-3 hover:bg-blue-100 cursor-pointer transition-colors ${
                value === option.value ? 'bg-blue-50 font-medium' : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// DeductionCard component (unchanged)
function DeductionCard({
  card,
  color,
  onEdit,
  onDelete,
  onShowDetails,
  getInitials
}: {
  card: Card;
  color: string;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
  onShowDetails: (card: Card) => void;
  getInitials: (title: string) => string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-black text-lg font-bold mr-4`}>
            {getInitials(card.title)}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(card);
                      setShowDropdown(false);
                    }}
                    className="block w-full rounded-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(card.id);
                      setShowDropdown(false);
                    }}
                    className="block w-full rounded-md text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800" style={{fontFamily:FONTS.header2.fontFamily, fontSize:FONTS.header2.fontSize, fontWeight:FONTS.header2.fontWeight}}>{card.title}</h3>
          <p className="text-sm text-black mt-1">{card.deductionType}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-black">Employer Rate</p>
            <p className="text-gray-800 font-medium" style={{fontFamily:FONTS.header2.fontFamily, fontSize:FONTS.header2.fontSize, fontWeight:FONTS.header2.fontWeight}}>{card.employerRate}%</p>
          </div>
          <div>
            <p className="text-sm text-black">Employee Rate</p>
            <p className="text-gray-800 font-medium" style={{fontFamily:FONTS.header2.fontFamily, fontSize:FONTS.header2.fontSize, fontWeight:FONTS.header2.fontWeight}}>{card.employeeRate}%</p>
          </div>
        </div>
        
        <button
          onClick={() => onShowDetails(card)}
          className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-200 text-black rounded-md transition-colors text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default function Deduction() {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem('deductionCards');
    return savedCards ? JSON.parse(savedCards) : [
      {
        id: 1,
        title: "Provident Fund",
        isPretax: "Yes",
        isRecurring: "Yes",
        deductionType: "Percentage",
        isConditionBased: "No",
        calculationType: "Amount",
        employerRate: 6.0,
        employeeRate: 10.0,
        hasMaxLimit: "No",
        eligibilityCondition: "If Basic Pay Greater Than (>)",
        eligibilityValue: 0.0
      },
      {
        id: 2,
        title: "Professional Tax",
        isPretax: "No",
        isRecurring: "Monthly",
        deductionType: "Fixed Amount",
        isConditionBased: "Yes",
        calculationType: "Amount",
        employerRate: 0.0,
        employeeRate: 200.0,
        hasMaxLimit: "Yes",
        eligibilityCondition: "If Basic Pay Greater Than (>)",
        eligibilityValue: 15000.0
      }
    ];
  });

  const [cardColors, setCardColors] = useState<Record<number, string>>(() => {
    const colors: Record<number, string> = {};
    const savedCards = localStorage.getItem('deductionCards') || '[]';
    JSON.parse(savedCards).forEach((card: Card) => {
      colors[card.id] = getRandomColor();
    });
    return colors;
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newCard, setNewCard] = useState<NewCard>({
    title: "",
    isPretax: "Yes",
    isRecurring: "One Time deduction",
    deductionType: "Amount",
    isConditionBased: "No",
    calculationType: "Amount",
    employerRate: "",
    employeeRate: "",
    hasMaxLimit: "No",
    eligibilityCondition: "If Basic Pay Greater Than (>)",
    eligibilityValue: "0.0"
  });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const detailsModalRef = useRef<HTMLDivElement>(null);

  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem('deductionCards', JSON.stringify(cards));
  }, [cards]);

  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
      
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
    card.deductionType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (title: string) => {
    return title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleAddCard = () => {
    if (newCard.title) {
      if (editingCard) {
        // Update existing card
        const updatedCards = cards.map(card => 
          card.id === editingCard.id ? { 
            ...newCard, 
            id: editingCard.id,
            employerRate: parseFloat(newCard.employerRate) || 0,
            employeeRate: parseFloat(newCard.employeeRate) || 0,
            eligibilityValue: parseFloat(newCard.eligibilityValue) || 0
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
          isPretax: newCard.isPretax,
          isRecurring: newCard.isRecurring,
          deductionType: newCard.deductionType,
          isConditionBased: newCard.isConditionBased,
          calculationType: newCard.calculationType,
          employerRate: parseFloat(newCard.employerRate) || 0,
          employeeRate: parseFloat(newCard.employeeRate) || 0,
          hasMaxLimit: newCard.hasMaxLimit,
          eligibilityCondition: newCard.eligibilityCondition,
          eligibilityValue: parseFloat(newCard.eligibilityValue) || 0
        };
        
        setCards([...cards, cardToAdd]);
        setCardColors(prev => ({ ...prev, [newId]: getRandomColor() }));
      }
      
      setNewCard({
        title: "",
        isPretax: "Yes",
        isRecurring: "One Time deduction",
        deductionType: "Amount",
        isConditionBased: "No",
        calculationType: "Amount",
        employerRate: "",
        employeeRate: "",
        hasMaxLimit: "No",
        eligibilityCondition: "If Basic Pay Greater Than (>)",
        eligibilityValue: "0.0"
      });
      setIsModalOpen(false);
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setNewCard({
      title: card.title,
      isPretax: card.isPretax,
      isRecurring: card.isRecurring,
      deductionType: card.deductionType,
      isConditionBased: card.isConditionBased,
      calculationType: card.calculationType,
      employerRate: card.employerRate.toString(),
      employeeRate: card.employeeRate.toString(),
      hasMaxLimit: card.hasMaxLimit,
      eligibilityCondition: card.eligibilityCondition,
      eligibilityValue: card.eligibilityValue.toString()
    });
    setIsModalOpen(true);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const closeModal = () => {
    setEditingCard(null);
    setNewCard({
      title: "",
      isPretax: "Yes",
      isRecurring: "One Time deduction",
      deductionType: "Amount",
      isConditionBased: "No",
      calculationType: "Amount",
      employerRate: "",
      employeeRate: "",
      hasMaxLimit: "No",
      eligibilityCondition: "If Basic Pay Greater Than (>)",
      eligibilityValue: "0.0"
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
      
      <div className={` transition-all duration-300 ${(isModalOpen || isDetailsModalOpen) ? 'blur-sm' : ''}`}>
        {/* Search and Add Card */}
        <div className="flex md:flex-row justify-between mb-6 gap-4">
          <div className='text-2xl font-bold px-2 py-2' >
            Deduction Management
          </div>
          <div className="flex gap-5 ml-auto">
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
              className="rounded-md w-38 h-9 text-white px-4 py-2 shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => {
                setEditingCard(null);
                setIsModalOpen(true);
              }}
             style={{ backgroundColor: '#006666' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Deduction
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
          {filteredCards.map((card) => (
            <DeductionCard
              key={card.id}
              card={card}
              color={cardColors[card.id] || 'bg-blue-200'}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onShowDetails={showCardDetails}
              getInitials={getInitials}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingCard ? "Edit Deduction" : "Create New Deduction"}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 rounded-md hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Title*</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.title}
                      onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                      placeholder="Enter deduction title"
                      required
                    />
                  </div>
                  
                  {/* Is Pretax */}
                  <CustomSelect
                    label="Is Pretax"
                    value={newCard.isPretax}
                    options={["Yes", "No"]}
                    onChange={(value) => setNewCard({...newCard, isPretax: value})}
                  />
                  
                  {/* Is Recurring */}
                  <CustomSelect
                    label="Is Recurring"
                    value={newCard.isRecurring}
                    options={["One Time deduction", "Monthly", "Yearly"]}
                    onChange={(value) => setNewCard({...newCard, isRecurring: value})}
                  />
                  
                  {/* Deduction Type */}
                  <CustomSelect
                    label="Deduction Type"
                    value={newCard.deductionType}
                    options={["Amount", "Percentage", "Fixed Amount"]}
                    onChange={(value) => setNewCard({...newCard, deductionType: value})}
                  />
                  
                  {/* Is Condition Based */}
                  <CustomSelect
                    label="Is Condition Based"
                    value={newCard.isConditionBased}
                    options={["Yes", "No"]}
                    onChange={(value) => setNewCard({...newCard, isConditionBased: value})}
                  />
                  
                  {/* Calculation Type */}
                  <CustomSelect
                    label="Calculation Type"
                    value={newCard.calculationType}
                    options={["Amount", "Percentage"]}
                    onChange={(value) => setNewCard({...newCard, calculationType: value})}
                  />
                  
                  {/* Employer Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Employer Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.employerRate}
                      onChange={(e) => setNewCard({...newCard, employerRate: e.target.value})}
                      placeholder="Enter employer rate"
                    />
                  </div>
                  
                  {/* Employee Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Employee Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.employeeRate}
                      onChange={(e) => setNewCard({...newCard, employeeRate: e.target.value})}
                      placeholder="Enter employee rate"
                    />
                  </div>
                  
                  {/* Has Maximum Limit */}
                  <CustomSelect
                    label="Has Maximum Limit"
                    value={newCard.hasMaxLimit}
                    options={["Yes", "No"]}
                    onChange={(value) => setNewCard({...newCard, hasMaxLimit: value})}
                  />
                  
                  {/* Eligibility Condition */}
                  <CustomSelect
                    label="Eligibility Condition"
                    value={newCard.eligibilityCondition}
                    options={[
                      "If Basic Pay Greater Than (>)",
                      "If Basic Pay Less Than (<)",
                      "Always"
                    ]}
                    onChange={(value) => setNewCard({...newCard, eligibilityCondition: value})}
                  />
                  
                  {/* Eligibility Value */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Eligibility Value</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.eligibilityValue}
                      onChange={(e) => setNewCard({...newCard, eligibilityValue: e.target.value})}
                      placeholder="Enter eligibility value"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={closeModal}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button 
                    className={`px-6 py-2.5 rounded-md text-white transition-colors ${!newCard.title ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={handleAddCard}
                    type="button"
                    disabled={!newCard.title}
                  >
                    {editingCard ? "Update" : "Create"}
                  </button>
                </div>
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
            className="bg-white rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
                  className="text-gray-500 rounded-md hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Is Pretax" value={selectedCard.isPretax} />
                <DetailItem label="Is Recurring" value={selectedCard.isRecurring} />
                <DetailItem label="Deduction Type" value={selectedCard.deductionType} />
                <DetailItem label="Is Condition Based" value={selectedCard.isConditionBased} />
                <DetailItem label="Calculation Type" value={selectedCard.calculationType} />
                <DetailItem label="Employer Rate" value={`${selectedCard.employerRate}%`} />
                <DetailItem label="Employee Rate" value={`${selectedCard.employeeRate}%`} />
                <DetailItem label="Has Maximum Limit" value={selectedCard.hasMaxLimit} />
                <DetailItem label="Eligibility Condition" value={selectedCard.eligibilityCondition} />
                <DetailItem label="Eligibility Value" value={selectedCard.eligibilityValue.toString()} />
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
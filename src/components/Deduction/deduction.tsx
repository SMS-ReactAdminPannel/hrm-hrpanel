"use client"

import { useState, useEffect } from "react"
import type { Card, NewCard } from "./types"
import { getRandomColor } from "./utils"
import { SearchBar } from "./search-bar"
import { DeductionCard } from "./deduction-card"
import { FormModal } from "./form-modal"
import { DetailsModal } from "./details-modal"

const initialCardData: Card[] = [
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
    eligibilityValue: 0.0,
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
    eligibilityValue: 15000.0,
  },
]

const initialNewCard: NewCard = {
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
  eligibilityValue: "0.0",
}

export default function DeductionPage() {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem("deductionCards")
    return savedCards ? JSON.parse(savedCards) : initialCardData
  })

  const [cardColors, setCardColors] = useState<Record<number, string>>(() => {
    const colors: Record<number, string> = {}
    const savedCards = localStorage.getItem("deductionCards") || JSON.stringify(initialCardData)
    JSON.parse(savedCards).forEach((card: Card) => {
      colors[card.id] = getRandomColor()
    })
    return colors
  })

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [newCard, setNewCard] = useState<NewCard>(initialNewCard)
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem("deductionCards", JSON.stringify(cards))
  }, [cards])

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.deductionType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCard = () => {
    if (newCard.title) {
      if (editingCard) {
        // Update existing card
        const updatedCards = cards.map((card) =>
          card.id === editingCard.id
            ? {
                ...newCard,
                id: editingCard.id,
                employerRate: Number.parseFloat(newCard.employerRate) || 0,
                employeeRate: Number.parseFloat(newCard.employeeRate) || 0,
                eligibilityValue: Number.parseFloat(newCard.eligibilityValue) || 0,
              }
            : card,
        )
        setCards(updatedCards)
        setEditingCard(null)
      } else {
        // Add new card
        const newId = Math.max(0, ...cards.map((card) => card.id)) + 1
        const cardToAdd: Card = {
          id: newId,
          title: newCard.title,
          isPretax: newCard.isPretax,
          isRecurring: newCard.isRecurring,
          deductionType: newCard.deductionType,
          isConditionBased: newCard.isConditionBased,
          calculationType: newCard.calculationType,
          employerRate: Number.parseFloat(newCard.employerRate) || 0,
          employeeRate: Number.parseFloat(newCard.employeeRate) || 0,
          hasMaxLimit: newCard.hasMaxLimit,
          eligibilityCondition: newCard.eligibilityCondition,
          eligibilityValue: Number.parseFloat(newCard.eligibilityValue) || 0,
        }

        setCards([...cards, cardToAdd])
        setCardColors((prev) => ({ ...prev, [newId]: getRandomColor() }))
      }

      setNewCard(initialNewCard)
      setIsModalOpen(false)
    }
  }

  const handleEditCard = (card: Card) => {
    setEditingCard(card)
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
      eligibilityValue: card.eligibilityValue.toString(),
    })
    setIsModalOpen(true)
  }

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const closeModal = () => {
    setEditingCard(null)
    setNewCard(initialNewCard)
    setIsModalOpen(false)
  }

  const showCardDetails = (card: Card) => {
    setSelectedCard(card)
    setIsDetailsModalOpen(true)
  }

  const closeDetailsModal = () => {
    setSelectedCard(null)
    setIsDetailsModalOpen(false)
  }

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isModalOpen || isDetailsModalOpen ? "blur-sm" : ""}`}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => {
            setEditingCard(null)
            setIsModalOpen(true)
          }}
        />

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <DeductionCard
              key={card.id}
              card={card}
              color={cardColors[card.id] || "bg-blue-200"}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onShowDetails={showCardDetails}
            />
          ))}
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        editingCard={editingCard}
        newCard={newCard}
        onClose={closeModal}
        onSubmit={handleAddCard}
        onCardChange={setNewCard}
      />

      <DetailsModal
        isOpen={isDetailsModalOpen}
        card={selectedCard}
        cardColor={selectedCard ? cardColors[selectedCard.id] || "bg-blue-200" : ""}
        onClose={closeDetailsModal}
      />
    </div>
  )
}

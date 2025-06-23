export type Card = {
  id: number
  title: string
  isPretax: string
  isRecurring: string
  deductionType: string
  isConditionBased: string
  calculationType: string
  employerRate: number
  employeeRate: number
  hasMaxLimit: string
  eligibilityCondition: string
  eligibilityValue: number
}

export type NewCard = {
  title: string
  isPretax: string
  isRecurring: string
  deductionType: string
  isConditionBased: string
  calculationType: string
  employerRate: string
  employeeRate: string
  hasMaxLimit: string
  eligibilityCondition: string
  eligibilityValue: string
}

export type SelectOption = {
  value: string
  label: string
}

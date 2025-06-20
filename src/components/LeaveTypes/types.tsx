export type Card = {
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

export type NewCard = {
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

export const FONTS = {
  header: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
  }
};
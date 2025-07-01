export type Card = {
  _id:string
  title: string;
   isPaid: string;
   max_days: string;
   description:string;
   reset: boolean;
  periodIn: string;
  carryforwardType: string;
  requireApproval: string;
  requireAttachment: string;
  excludeCompanyLeaves: string;
  excludeHolidays: string;
  isEncashable: string;
  color: string;
};

export type NewCard = {

  _id: string;
  title: string;
  isPaid: string; 
  max_days: string; 
  reset: boolean;
  description: string;
  periodIn: string;
  carryforwardType: string;
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
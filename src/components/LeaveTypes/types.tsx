export type Card = {
  _id: number;//id:number
  holiday_name: string;//title: string;
  holiday_type: string; //isPaid: string
  holiday_date: string; //totalDays: number
  is_active: string; // reset: string;
  periodIn: string;
  carryforwardType: string;
  requireApproval: string;
  requireAttachment: string;
  excludeCompanyLeaves: string;
  excludeHolidays: string;
  isEncashable: string;
};

export type NewCard = {
  // title: string;
  // isPaid: string;
  // totalDays: string;
  // reset: string;

  _id: number;
  holiday_name: string;
  holiday_type: string; 
  holiday_date: string; 
  is_active: string;
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
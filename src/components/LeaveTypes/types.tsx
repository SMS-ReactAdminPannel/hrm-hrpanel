export type Card = {
  // _id: string;//id:number
  // holiday_name: string;//title: string;
  // holiday_type: string; //isPaid: string
  // holiday_date: string; //totalDays: number
  // is_active: "yes" | "no"; // reset: string;
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
  // title: string;
  // isPaid: string;
  // totalDays: string;
  // reset: string;

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
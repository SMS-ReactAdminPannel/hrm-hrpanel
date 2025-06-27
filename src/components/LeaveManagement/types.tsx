export type Customer = {
  uuid: string;
  id: string;
  date: Date;
  day: string;
  avatar: string;
  holiday: string;
};

export interface WorkEvent {
  color: any;
  id: string;
  title: string;
  date: Date;
  type: string;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: WorkEvent[];
}

export interface Holiday {
  id: string;
  holiday_name: string;
  holiday_date: string; 
}
export type Customer = {
  id: string;
  date: Date;
  day: string;
  avatar: string;
  holiday: string;
};

export interface WorkEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: WorkEvent[];
}
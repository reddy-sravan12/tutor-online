import React, { useState, createContext, useContext } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import BookingModal from '@/components/Popup';
import Calendar from '@/components/Calender';
import Header from '@/components/Header';

export type Slot = {
  student: string;
  subject: string;
} | null;

export type Availability = {
  [date: string]: {
    [hour: number]: Slot;
  };
};

export type BookSlotParams = {
  day: string;
  hour: number;
  student: string;
  subject: string;
} | null;

export type AppContextType = {
  role: 'student' | 'tutor';
  setRole: (role: 'student' | 'tutor') => void;
  availability: Availability;
  bookSlot: (params: BookSlotParams) => void;
  selectedSlot: { date: string; hour: number } | null;
  setSelectedSlot: (slot: { date: string; hour: number } | null) => void;
};

export const AppContext = createContext<AppContextType|undefined>(undefined);

export const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9AM to 5PM
export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const initialAvailability: Availability = {};
const today = new Date();
export const startWeek = startOfWeek(today, { weekStartsOn: 1 });

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

for (let d = 0; d < 5; d++) {
  const day = format(addDays(startWeek, d), 'yyyy-MM-dd');
  initialAvailability[day] = {};
  for (let h of hours) {
    initialAvailability[day][h] = null;
  }
}

function App() {
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [availability, setAvailability] = useState<Availability>(initialAvailability);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; hour: number } | null>(null);

  const bookSlot = (params: BookSlotParams): void => {
    if (!params) {
      setSelectedSlot(null);
      return;
    }
    
    const { day, hour, student, subject } = params;
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: { student, subject },
      }
    }));
    setSelectedSlot(null);
  };

  const contextValue: AppContextType = {
    role,
    setRole,
    availability,
    bookSlot,
    selectedSlot,
    setSelectedSlot
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="p-4">
        <Header />
        <Calendar />
        <BookingModal />
      </div>
    </AppContext.Provider>
  );
}

export default App
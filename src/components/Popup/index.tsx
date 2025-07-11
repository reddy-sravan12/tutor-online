import { useAppContext } from "@/pages";
import { Dialog } from "@mui/material";
import { FormEvent, ReactElement,  useState } from "react";

const BookingModal = (): ReactElement => {
    const { selectedSlot, bookSlot } = useAppContext();
    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');

  
    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(selectedSlot){
            const params={day:selectedSlot.date,hour:selectedSlot.hour,student,subject}
            bookSlot(params);
            setStudent('');
            setSubject('');
        }
        
    };
  
    return (
      <Dialog open={!!selectedSlot} onClose={() => bookSlot(null)}>
        <form className="p-4" onSubmit={handleConfirm}>
          <h2 className="mb-2 font-bold">Book Slot</h2>
          <input placeholder="Your Name" value={student} onChange={(e) => setStudent(e.target.value)} className="block border p-1 mb-2 w-full" required />
          <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="block border p-1 mb-2 w-full" required />
          <button className="bg-blue-500 text-white px-4 py-1" type='submit'>Confirm</button>
        </form>
      </Dialog>
    );
}

export default BookingModal;
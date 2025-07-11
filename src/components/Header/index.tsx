import { useAppContext } from "@/pages";

const Header=()=> {
  const { role, setRole } = useAppContext();
  return (
    <div className="mb-4">
      <div className="flex border border-gray-300 rounded overflow-hidden w-max">
        <button
          className={`px-4 py-2 ${role === 'student' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setRole('student')}
        >
          Student
        </button>
        <button
          className={`px-4 py-2 ${role === 'tutor' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setRole('tutor')}
        >
          Tutor
        </button>
      </div>
    </div>
  );
}

export default Header
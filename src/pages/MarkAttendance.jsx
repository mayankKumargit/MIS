import { useState } from 'react';

const MarkAttendance = () => {
  const [program, setProgram] = useState('');
  const [semester, setSemester] = useState('');

  // const handleProgramChange = (e) => {
  //   setProgram(e.target.value);
  //   //setSemester('');
  // };
  console.log(program,semester)
  return (
    <div className="mt-4">
      <select
        className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={program}
        onChange={(e)=>setProgram(e.target.value)}
      >
        <option value="">Select Program</option>
        <option value="BT">BTech</option>
        <option value="MT">MTech</option>
        <option value="PHD">PHD</option>
      </select>

      {program === 'BT' && (
        <select
          className="mt-2 block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              Semester {index + 1}
            </option>
          ))}
        </select>
      )}

      {(program === 'MT' || program === 'PHD') && (
        <select
          className="mt-2 block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {[...Array(4)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              Semester {index + 1}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MarkAttendance;

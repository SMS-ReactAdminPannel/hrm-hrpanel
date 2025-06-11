// import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
// import { candidates, type Candidate } from "../../../assets/Cadidates";
// import { useNavigate } from "react-router-dom";

// // type Candidate is now imported from "../../../assets/Cadidates"

// const CandidatesList = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filteredCandidates: Candidate[] = candidates.filter((c: Candidate) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

<<<<<<< HEAD
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Candidates</h1>
//         <input
//           type="text"
//           placeholder="Search candidates..."
//           className="border border-gray-300 rounded-md px-4 py-2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCandidates.map((candidate) => (
//           <div
//             key={candidate.id}
//             onClick={() => navigate(`/candidates/${candidate.id}`)}
//             className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800">
//               {candidate.name}
//             </h2>
//             <p className="text-sm text-gray-500">{candidate.role}</p>
//             <p className="mt-2 text-sm text-gray-700">
//               Status: <span className="font-medium">{candidate.status}</span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
=======
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <input
          type="text"
          placeholder="Search candidates..."
          className="bg-[#eff4f5]  rounded-md px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => navigate(`/candidates/${candidate.id}`)}
            className="bg-[#eff4f5]  rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {candidate.name}
            </h2>
            <p className="text-sm text-gray-500">{candidate.role}</p>
            <p className="mt-2 text-sm text-gray-700">
              Status: <span className="font-medium">{candidate.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
>>>>>>> e89ce5580217647442d6b25accd030d6f878305d

// export default CandidatesList;
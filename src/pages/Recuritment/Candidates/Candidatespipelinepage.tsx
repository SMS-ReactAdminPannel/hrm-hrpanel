import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { candidates } from "../../../assets/Cadidates"; // make sure this path is correct

type Candidate = {
  id: string;
  name: string;
  role: React.ReactNode;
  status: string;
};

const CandidatePipelinePage = () => {
  const navigate = useNavigate();

  const [pipeline] = useState([
    {
      stage: "Applied",
      candidates: candidates.filter((c: Candidate) => c.status === "Applied"),
    },
    {
      stage: "Interviewing",
      candidates: candidates.filter((c: Candidate) => c.status === "Interviewing"),
    },
    {
      stage: "Hired",
      candidates: candidates.filter((c: Candidate) => c.status === "Hired"),
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Candidate Pipeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pipeline.map((stage) => (
          <div
            key={stage.stage}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2 text-primary">
              {stage.stage}
            </h2>

            {stage.candidates.length === 0 ? (
              <p className="text-sm text-gray-500">No candidates</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {stage.candidates.map((candidate: Candidate) => (
                  <li
                    key={candidate.id}
                    className="bg-gray-50 p-2 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                  >
                    <div className="font-medium text-gray-700">
                      {candidate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.role}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatePipelinePage;
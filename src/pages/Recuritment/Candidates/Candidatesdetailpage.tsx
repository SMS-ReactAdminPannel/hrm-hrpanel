import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { ArrowLeft } from "lucide-react";

const dummyCandidates = [
  {
    id: "1",
    name: "Aisha Khan",
    email: "aisha.khan@example.com",
    phone: "+91 9876543210",
    status: "Screening",
    appliedRole: "Frontend Developer",
    resumeLink: "https://example.com/resume/aisha-khan",
    notes: "Has 3 years of experience in React and TailwindCSS."
  },
  {
    id: "2",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 9998887776",
    status: "Interview Scheduled",
    appliedRole: "Backend Developer",
    resumeLink: "https://example.com/resume/rahul-mehta",
    notes: "Strong with Node.js and MongoDB."
  }
];

export default function CandidateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);

  useEffect(() => {
    const found = dummyCandidates.find((c) => c.id === id);
    if (found) {
      setCandidate(found);
    } else {
      navigate("/candidates");
    }
  }, [id, navigate]);

  if (!candidate) return null;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h2 className="text-xl font-semibold">Candidate Details</h2>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="space-y-4 pt-4">
          <div>
            <h3 className="font-medium text-lg">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.appliedRole}</p>
          </div>

          <div className="text-sm space-y-1">
            <p><span className="font-medium">Email:</span> {candidate.email}</p>
            <p><span className="font-medium">Phone:</span> {candidate.phone}</p>
            <p><span className="font-medium">Status:</span> {candidate.status}</p>
            <p><span className="font-medium">Resume:</span> <a href={candidate.resumeLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View</a></p>
          </div>

          <div>
            <h4 className="font-medium text-sm">Notes</h4>
            <p className="text-sm text-gray-700">{candidate.notes}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

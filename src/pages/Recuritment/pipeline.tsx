
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Tabs from "../../components/ui/tabs";
import TabsList from "../../components/ui/tabsList.tsx";
import TabsTrigger from "../../components/ui/tabsTrigger";
import ScrollArea from "../../components/ui/ScrollArea";
import Avatar from "../../components/ui/Avatar";
import { Star } from "lucide-react";

const stages = [
  "Initial Screening",
  "Technical Test",
  "Interview - Tech",
  "Interview - Behavioural",
  "Final Offer Released",
  "Cancelled / Not Hired"
];

const candidates = [
  {
    name: "Siva",
    email: "sivashank...",
    job: "Django Dev - (S/W Dev...",
    contact: "09360761063",
    interviews: 0,
    rating: 3,
    stage: "Final Offer Released"
  },
  {
    name: "Sumathi",
    email: "sivasanka...",
    job: "Django Dev - (S/W Dev...",
    contact: "09360761063",
    interviews: 0,
    rating: 3,
    stage: "Final Offer Released"
  }
];

export default function RecruitmentPipeline() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Recruitments</h1>
        <Button className="bg-red-500 text-white">+ Recruitment</Button>
      </div>

      <div className="flex gap-2 items-center mb-4">
        <Input placeholder="Search" className="w-1/3" />
        <Button className="border border-gray-300 bg-white text-gray-800 hover:bg-gray-100">Filter</Button>
        <div className="flex items-center gap-1">
          <span className="text-sm">Filters:</span>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Closed: false</span>
        </div>
      </div>

      <Tabs tabs={[]} activeTab={""} onTabChange={function (tabId: string): void {
              throw new Error("Function not implemented.");
          } } />
      <TabsList>
        <div className="gap-2 flex">
          <TabsTrigger
            value="Finance Manager"
            isActive={false}
            onClick={() => {}}
          >
            Finance Manager (7)
          </TabsTrigger>
          <TabsTrigger
            value="Test Job - Engineer"
            isActive={false}
            onClick={() => {}}
          >
            Test Job - Engineer (4)
          </TabsTrigger>
          <TabsTrigger
            value="CEO"
            isActive={false}
            onClick={() => {}}
          >
            CEO (2)
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="mt-4 h-[70vh] pr-2">
        <ScrollArea>
          {stages.map((stage) => (
            <Card key={stage} className="mb-4">
              <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">
                  {stage.includes("Cancelled") ? (
                    <span className="text-red-600">{stage}</span>
                  ) : (
                    stage
                  )}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <Avatar />
                  </div>
                  <Button>+</Button>
                </div>
              </div>

              <div className="grid grid-cols-7 font-semibold text-sm border-b py-2">
                <div>Candidate</div>
                <div>Email</div>
                <div>Job Position</div>
                <div>Contact</div>
                <div>Scheduled Interviews</div>
                <div>Rating</div>
                <div>Stage</div>
              </div>

              {candidates
                .filter((c) => c.stage === stage)
                .map((c, idx) => (
                  <div key={idx} className="grid grid-cols-7 py-2 border-b text-sm items-center">
                    <div className="flex items-center gap-2">
                      <span className="cursor-move">↕️</span>
                      {c.name}
                    </div>
                    <div>{c.email}</div>
                    <div>{c.job}</div>
                    <div>{c.contact}</div>
                    <div>Interviews Scheduled: {c.interviews}</div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < c.rating ? "#FACC15" : "none"} stroke="#FACC15" />
                      ))}
                    </div>
                    <div>{c.stage}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
          
        ))}
        </ScrollArea>
      </div>
    </div>
  );
}
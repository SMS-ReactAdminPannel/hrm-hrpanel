import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Tabs from "../../components/ui/tabs";
import TabsList from "../../components/ui/tabsList";
import TabsTrigger from "../../components/ui/tabsTrigger";
import ScrollArea from "../../components/ui/ScrollArea";
import Avatar from "../../components/ui/Avatar";
import { Star, X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import Toggle from "../../components/ui/toggle";



const stages = [
  "Initial Screening",
  "Technical Test",
  "Interview - Tech",
  "Interview - Behavioural",
  "Final Offer Released",
  "Cancelled / Not Hired",
];

const candidates = [
  {
    name: "Siva",
    email: "sivashank...",
    job: "Django Dev - (S/W Dev...",
    contact: "09360761063",
    interviews: 0,
    rating: 3,
    stage: "Final Offer Released",
  },
  {
    name: "Sumathi",
    email: "sivasanka...",
    job: "Django Dev - (S/W Dev...",
    contact: "09360761063",
    interviews: 0,
    rating: 3,
    stage: "Final Offer Released",
  },
];

// Dropdown component (NOT exported as default)
function Dropdown({
  options,
  selected,
  onSelect,
  label,
  placeholder = "Select an option",
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div
        className="border px-3 py-2 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || placeholder}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RecruitmentPipeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [newStage, setNewStage] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    startDate: "",
    endDate: "",
    description: "",
    managers: "",
    vacancy: "",
    company: "",
    surveyTemplates: "",
    skills: "",
    isInternal: false, // Added to match usage in form
    isPublished: false,
    isImage: false,      // <-- Add this
    isOptional: false, // Added to fix the error
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      jobTitle: "",
      department: "",
      startDate: "",
      endDate: "",
      description: "",
      managers: "",
      vacancy: "",
      company: "",
      surveyTemplates: "",
      skills: "",
      isInternal: false,
      isPublished: false,
      isImage: false,       
      isOptional: false, 
    });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Recruitments</h1>
        <Button className=" text-white" onClick={() => setIsModalOpen(true)}>
          + Recruitment
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded-md shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto p-6 scrollbar-hide">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Create Recruitment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  placeholder="e.g. Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <Editor
                  apiKey="your_tinymce_api_key"
                  value={formData.description}
                  onEditorChange={(newContent) =>
                    setFormData({ ...formData, description: newContent })
                  }
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | table",
                    font_formats:
                      "Poppins=Poppins, sans-serif;Arial=arial,helvetica,sans-serif;Times New Roman=times new roman,times;Courier New=courier new,courier;",
                    content_style: "body { font-family: Poppins,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Position</label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Managers</label>
                  <Input
                    value={formData.managers}
                    onChange={(e) => setFormData({ ...formData, managers: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vacancy</label>
                  <Input
                    value={formData.vacancy}
                    onChange={(e) => setFormData({ ...formData, vacancy: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Survey Templates</label>
                  <Input
                    value={formData.surveyTemplates}
                    onChange={(e) =>
                      setFormData({ ...formData, surveyTemplates: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
              <Dropdown
                label="LinkdIn Account"
                options={["hr ofc", "HR", "merlin", "TECH TEAM"]}
                selected={formData.department}
                onSelect={(val) => setFormData({ ...formData, department: val })}
              />

              {/* Example dropdown usage */}
              <Toggle
                label="post on linkdIn"
                checked={formData.isInternal}
                onChange={(value) => setFormData({ ...formData, isInternal: value })}
              />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3">
             
              <Toggle
                label="is Published?"
                checked={formData.isPublished}
                onChange={(value) => setFormData({ ...formData, isPublished: value })}
              />
              <Toggle
                label="optional profile image"
                checked={formData.isImage}
                onChange={(value) => setFormData({ ...formData, isImage: value })}
              />
              <Toggle
                label="optional resumae"
                checked={formData.isOptional}
                onChange={(value) => setFormData({ ...formData, isOptional: value })}
              />
                
                </div>

              <div className="flex justify-end">
                <Button className="bg-red-500 hover:bg-red-600 text-white mt-2 mb-2">Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}

{isStageModalOpen && (
  <div className="fixed inset-0 z-80 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-md shadow-2xl w-full max-w-md p-8 relative">
      <button
        onClick={() => setIsStageModalOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <X size={20} />
      </button>
      <h2 className="text-xl font-semibold mb-4">Create Stage</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newStage.trim()) {
            stages.push(newStage.trim()); // In real app, use useState for stages
            setNewStage("");
            setIsStageModalOpen(false);
          }
        }}
        className="space-y-4"
      >
        {/* <div>
          <label className="block text-sm font-medium mb-1">Stage Name</label>
          <Input
            placeholder="e.g. HR Interview"
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
          />
        </div> */}





        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stage</label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Recruitment</label>
            <Input
              value={formData.managers}
              onChange={(e) => setFormData({ ...formData, managers: e.target.value })}
            />
          </div>
        </div>




        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stage Managers</label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stage Type</label>
            <Input
              value={formData.managers}
              onChange={(e) => setFormData({ ...formData, managers: e.target.value })}
            />
          </div>
        </div>




              
        <div className="flex justify-end">
          <Button className="bg-red-500 hover:bg-red-600 text-white">Add Stage</Button>
        </div>
      </form>
    </div>
  </div>
)}











      {/* Filters */}
      <div className="flex gap-2 items-center mb-4">
        <Input placeholder="Search" className="w-1/3" />
        <Button className=" text-gray-800 text-white hover:bg-gray-100">
          Filter
        </Button>
        <div className="flex items-center gap-1">
          <button className="bg-[#006666] hover:bg-[#004C4C]  text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
       onClick={() => setIsStageModalOpen(true)}> +stage </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={[]} activeTab={""} onTabChange={() => {}} />
      <TabsList>
        <div className="gap-2 flex">
          <TabsTrigger value="Finance Manager" isActive={false} onClick={() => {}}>
            Finance Manager (7)
          </TabsTrigger>
          <TabsTrigger value="Test Job - Engineer" isActive={false} onClick={() => {}}>
            Test Job - Engineer (4)
          </TabsTrigger>
          <TabsTrigger value="CEO" isActive={false} onClick={() => {}}>
            CEO (2)
          </TabsTrigger>
        </div>
      </TabsList>

      {/* Candidate Pipeline */}
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
                    {/* <div className="w-6 h-6"> */}
                      <h1>HR</h1>
                    {/* </div> */}
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
                    <div
                      key={idx}
                      className="grid grid-cols-7 py-2 border-b text-sm items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="cursor-move">↕️</span>
                        {c.name}
                      </div>
                      <div>{c.email}</div>
                      <div>{c.job}</div>
                      <div>{c.contact}</div>
                      <div>{c.interviews}</div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < c.rating ? "#FACC15" : "none"}
                            stroke="#FACC15"
                          />
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
  )

}
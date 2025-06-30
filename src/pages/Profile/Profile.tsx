import React, { useEffect, useState } from "react";
import { FONTS } from "../../constants/uiConstants";
import { PersonalInfoComponent } from "../../components/Profile/Personal-Info";
import { EmergencyContactComponent } from "../../components/Profile/Emergency-Contact";
import { EducationComponent } from "../../components/Profile/Eduction";
import { ExperienceComponent } from "../../components/Profile/Experance";
import { BankInfoComponent } from "../../components/Profile/BankInfo";
import { PassportInfoComponent } from "../../components/Profile/Passport-Info";
import { CertificatesComponent } from "../../components/Profile/Certificate";
import {
  getEmployeeDetailsById,
  updateEmployeeDetails,
} from "../../features/Employeedetails/service";

const Profile: React.FC = () => {
  const [employeeDetailId] = useState("6862385e95746819ca93e328");

  
  // const { employeeDetailId } = useParams(); after connected connect this
  //to route page
  //  <Route path="/profile/:employeeDetailId" element={<Profile />} />
  //to navigate page 
  // navigate(`/profile/${employee._id}`);

  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployeeDetailsById(employeeDetailId);
        console.log("Employee Data fetched:", data);
        setEmployeeData(data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeDetailId]);

  const handleUpdate = async (section: string, updatedSectionData: any) => {
    if (!employeeData) return;
    try {
      const updatedData = { ...employeeData, [section]: updatedSectionData };
      await updateEmployeeDetails(employeeDetailId, { [section]: updatedSectionData });
      setEmployeeData(updatedData);
    } catch (error) {
      console.error(`Failed to update ${section}:`, error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!employeeData) return <div className="text-center mt-10 text-red-500">No employee data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#006666]/5 to-[#006666]/10 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <h1
          className="text-4xl font-bold text-white bg-[#f5f5f5] bg-clip-text text-transparent mb-4"
          style={FONTS.header}
        >
          Employee Profile
        </h1>

        <div className="flex flex-wrap gap-4">
          {employeeData.personal && (
            <PersonalInfoComponent
              data={employeeData.personal}
              onUpdate={(data) => handleUpdate("personal", data)}
            />
          )}
          {employeeData.emergency && (
            <EmergencyContactComponent
              data={employeeData.emergency}
              onUpdate={(data) => handleUpdate("emergency", data)}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {employeeData.education && (
            <EducationComponent
              data={employeeData.education}
              onUpdate={(data) => handleUpdate("education", data)}
            />
          )}
          {employeeData.experience && (
            <ExperienceComponent
              data={employeeData.experience}
              onUpdate={(data) => handleUpdate("experience", data)}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {employeeData.bank && (
            <BankInfoComponent
              data={employeeData.bank}
              onUpdate={(data) => handleUpdate("bank", data)}
            />
          )}
          {employeeData.passport && (
            <PassportInfoComponent
              data={employeeData.passport}
              onUpdate={(data) => handleUpdate("passport", data)}
            />
          )}
          {employeeData.certificates && (
            <CertificatesComponent
              data={employeeData.certificates}
              onUpdate={(data) => handleUpdate("certificates", data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

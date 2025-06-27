import { useParams, useNavigate } from "react-router-dom";
import { EmployeeDetails } from "../../components/EmplyoeeDetails/EmployeeDetails";

const EmployeeDetailsPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  return <EmployeeDetails employeeId={employeeId} onBack={() => navigate(-1)} />;
};

export default EmployeeDetailsPage;

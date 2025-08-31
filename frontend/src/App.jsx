import { useState, useEffect } from "react";
import axios from "axios";
import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
//import { FaCalendarAlt } from "react-icons/fa";
import "/index.css";

function App() {
  const [status, setStatus] = useState("");
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/appointments");
        console.log("Fetched appointments:", response.data.appointments);
        setAppointments(response.data.appointments);
        setError("");
      } catch (error) {
        console.error("Error fetching appointments:", error.message, error.response?.data);
        setError("Failed to fetch appointments. Please try again.");
      }
    };

    fetchAppointments();
    const intervalId = setInterval(fetchAppointments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log("Current appointments state:", appointments);
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: `delete appointment ${id}`,
        session_id: "default",
      });
      console.log("Delete response:", response.data);
    } catch (error) {
      console.error("Error deleting appointment:", error.message, error.response?.data);
      setError("Failed to delete appointment.");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-start pt-8 sm:pt-6 pb-8 px-4 sm:px-8 bg-pink-200 min-h-screen font-sans">
      <h1 className="text-5xl sm:text-4xl font-bold pt-8 mb-8 text-center">AI Assistant</h1>
      <div className="flex flex-col items-center w-full max-w-xl">    
        <UploadBox onUpload={setStatus} />
        {status && <p className="mb-4 text-center">{status}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <ChatBox />
        <button
          onClick={toggleModal}
          className="mt-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-colors">
          View Appointments
        </button>
      </div>

      {/* Modal for Appointments Table */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Scheduled Appointments</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>
            {appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 px-1 sm:px-2">ID</th>
                      <th className="py-2 px-1 sm:px-2">Name</th>
                      <th className="py-2 px-1 sm:px-3 truncate">Email</th>
                      <th className="py-2 px-1 sm:px-2">Phone</th>
                      <th className="py-2 px-1 sm:px-2">Date</th>
                      <th className="py-2 px-1 sm:px-2">Time</th>
                      <th className="py-2 px-1 sm:px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt) => (
                      <tr key={appt.id} className="border-b border-gray-700">
                        <td className="py-2 px-1 sm:px-2">{appt.id}</td>
                        <td className="py-2 px-1 sm:px-2 truncate max-w-[100px] sm:max-w-[150px]">
                          {appt.name}
                        </td>
                        <td className="py-2 px-1 sm:px-3 truncate max-w-[120px] sm:max-w-[200px]">
                          {appt.email}
                        </td>
                        <td className="py-2 px-1 sm:px-2 truncate max-w-[100px] sm:max-w-[150px]">
                          {appt.phone}
                        </td>
                        <td className="py-2 px-1 sm:px-2">{appt.date}</td>
                        <td className="py-2 px-1 sm:px-2 truncate max-w-[80px] sm:max-w-[100px]">
                          {appt.time}
                        </td>
                        <td className="py-2 px-1 sm:px-2">
                          <button
                            onClick={() => deleteAppointment(appt.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm sm:text-base">No appointments scheduled.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
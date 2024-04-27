import { useState, useEffect } from "react";
import { BASE_URL } from "./config/config";

interface Alert {
  id: string;
  message: string;
  // Add other properties here based on the structure of your publications
}

function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const userEmail = localStorage.getItem("emailId");
      let res = await fetch(`${BASE_URL}/api/v1/auth/view?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = await res.json();
      const userId = userData.id;
      res = await fetch(`${BASE_URL}/api/v1/notifications/all/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      data = data.filter((alert: { status: number }) => alert.status !== 1);
      setAlerts(data);
    };

    fetchAlerts();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Alerts</h1>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <p style={{ textAlign: "center" }}>{alert.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;

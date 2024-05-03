import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../config/config";

interface Alert {
  id: string;
  message: string;
}

function NotificationsDropdown() {
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
    <div className="profile-recents">
        <div className="recents">
            <h1>Recents:</h1>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id}>
                <h3>{alert.message}</h3>
              </div>
            ))
          ) : (
            <h1>No new message</h1>
          )}
        </div>
    </div>
  );
}

export default NotificationsDropdown;
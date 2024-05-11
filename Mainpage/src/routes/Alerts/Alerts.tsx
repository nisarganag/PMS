import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../config/config";
import { MdNotificationsNone } from "react-icons/md";
import './Alerts.css'

interface Alert {
  id: string;
  message: string;
}

function NotificationsDropdown() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className={"dropdown"}>
      <button className="dropbtn-alert" onClick={toggleDropdown}>
        <MdNotificationsNone className="alert-logo"/>
      </button>
      
      {showDropdown && (
        <div className="dropdown-alert" ref={dropdownRef}>
          <div className="notify-top">
            <h2 >
              <MdNotificationsNone className="drop-alert-logo" />
              Notification:
            </h2>
            <button className="notify-button" onClick={toggleDropdown}>
              <span className="notify-X"></span>
              <span className="notify-Y"></span>
            </button>
          </div>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id}>
                <h3 className="notify-bottom">{alert.message}</h3>
              </div>
            ))
          ) : (
            <p>No new Notification</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;
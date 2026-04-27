import React from 'react';
import type { SlotDetail } from '../api/slotsApi';
import { TrendingUp, Clock, AlertCircle } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  slots: SlotDetail[];
  onCityClick: (location: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slots, onCityClick }) => {
  // Sort slots by count descending
  const highestCountCities = [...slots]
    .filter(s => s.slots > 0)
    .sort((a, b) => b.slots - a.slots)
    .slice(0, 3);

  // Sort slots by most recently updated
  const recentlyUpdatedCities = [...slots]
    .sort((a, b) => new Date(b.createdon).getTime() - new Date(a.createdon).getTime())
    .slice(0, 3);

  const calculateMinsAgo = (dateStr: string) => {
    const mins = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 60000);
    return mins <= 0 ? 'Just now' : `${mins}m ago`;
  };

  return (
    <aside className="sidebar">
      {/* Highest Availability Section */}
      <div className="sidebar-widget">
        <div className="widget-header">
          <TrendingUp size={16} className="widget-icon" />
          <h3>Highest Availability</h3>
        </div>
        <ul className="widget-list">
          {highestCountCities.length > 0 ? (
            highestCountCities.map(slot => (
              <li key={`highest-${slot.visa_location}`} onClick={() => onCityClick(slot.visa_location)} className="widget-item clickable">
                <div className="item-content">
                  <span className="item-title">{slot.visa_location}</span>
                  <span className="item-meta text-green">{slot.slots} slots</span>
                </div>
              </li>
            ))
          ) : (
            <li className="widget-item empty">No slots available</li>
          )}
        </ul>
      </div>

      {/* Recently Updated Section */}
      <div className="sidebar-widget">
        <div className="widget-header">
          <Clock size={16} className="widget-icon" />
          <h3>Recently Updated</h3>
        </div>
        <ul className="widget-list">
          {recentlyUpdatedCities.map(slot => (
            <li key={`recent-${slot.visa_location}`} onClick={() => onCityClick(slot.visa_location)} className="widget-item clickable">
              <div className="item-content">
                <span className="item-title">{slot.visa_location}</span>
                <span className="item-meta">{calculateMinsAgo(slot.createdon)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Visa Tips Section */}
      <div className="sidebar-widget bg-surface">
        <div className="widget-header">
          <AlertCircle size={16} className="widget-icon text-orange" />
          <h3 className="text-orange">Visa Tips</h3>
        </div>
        <p className="widget-text">
          U.S. Embassy and Consulates in India have occasionally been releasing bulk slots for B1/B2. Keep notifications on!
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

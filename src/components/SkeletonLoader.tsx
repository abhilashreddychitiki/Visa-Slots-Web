import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-badge"></div>
          </div>
          <div className="skeleton-date"></div>
          <div className="skeleton-footer">
            <div className="skeleton-text"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;

import React from "react";
import badgeMapping from "./BadgeMapping"; // 배지 매핑 정보

const BadgeList = ({ badges }) => {
  return (
    <div className="badge-list-container">
      <div className="badge-list">
        {badges.map((badge, index) => {
          const badgeInfo = badgeMapping[badge.badge_name];

          if (!badgeInfo) return null;

          return (
            <div key={index} className="badge-item">
              <img
                src={badgeInfo.image}
                alt={badgeInfo.name}
                className="badge-image"
              />
              <span className="badge-name">{badgeInfo.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeList;

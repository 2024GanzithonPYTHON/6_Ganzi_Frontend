import React from "react";
import "./FamilyList.css";

const FamilyList = ({ family = [] }) => {
  return (
    <div className="family-list-container">
      <div className="family-list">
        {family && family.length > 0 ? (
          family.map((member, index) => (
            <div key={index} className="family-item">
              <img
                src={member.profile_img}
                alt={`${member.nickname}'s profile`}
                className="family-profile-img"
              />
              <span className="family-nickname">{member.nickname}</span>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default FamilyList;

/*import React from "react";
import "./FamilyList.css";

const FamilyList = ({ family }) => {
  return (
    <div className="family-list-container">
      <div className="family-list">
        {family.map((member, index) => (
          <div key={index} className="family-item">
            <img
              src={member.profile_img}
              alt={`${member.nickname}'s profile`}
              className="family-profile-img"
            />
            <span className="family-nickname">{member.nickname}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyList;
*/
import { useState } from "react";
import FamilyMembers from "./components/FamilyMember";

const FamilyMemberTabs = ({ familyMembersList, addNewMember, deleteMember, handleSelect, selectedFamilyMember }) => {

  return (<>
    <div className="d-flex align-items-left mb-3 ml-20 gap-1">
      {familyMembersList.map((member, index) => (
        <div key={index}>
          <FamilyMembers name={member.memberName} select={() => handleSelect(member.memberId)} />
        </div>
      ))}
      <input type="button" className="btn btn-secondary" value="+" onClick={addNewMember} />
    </div>
  </>
  );
};

export default FamilyMemberTabs;

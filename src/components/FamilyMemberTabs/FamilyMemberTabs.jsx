import { useState } from "react";
import FamilyMembers from "./components/FamilyMember";


const FamilyMemberTabs = ({ familyMembersList, newMember }) => {

  const handleAddMember = () => {
    const personsName = document.getElementById("personsName").value;
    const personsNetto = document.getElementById("calculatedNetto").innerText;
    const nm = {
      memberName: personsName,
      memberNetto: parseInt(personsNetto)
    };
    newMember(nm);
  };

  return (<>
    <div>FamilyMemberTabs</div>
    {familyMembersList.map((member, index) => (
      <div key={index}>
        <FamilyMembers name={member.memberName} />
      </div>
    ))}
    <input type="button" value="+" onClick={handleAddMember} />
  </>
  );
};

export default FamilyMemberTabs;

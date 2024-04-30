import { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

var id = 0;

const HouseholdSalaryCalculator = () => {
  const [familyMembersList, setFamilyMembersList] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(0)

  const handleSelect = (id) => {
    const newSelectedFamilyMember = familyMembersList.find((elem) => elem.memberId == id);
    setSelectedFamilyMember(newSelectedFamilyMember);

    document.getElementById("personsName").value = newSelectedFamilyMember.memberName;
    document.getElementById("bruttoInput").value = newSelectedFamilyMember.memberBrutto;
    document.getElementById("calculatedNetto").innerHTML = newSelectedFamilyMember.memberNetto;
    document.getElementById("under25").checked = newSelectedFamilyMember.memberIsUnder25;
    document.getElementById("newlywed").checked = newSelectedFamilyMember.memberIsNewlywed;
    document.getElementById("personal-tax-discount").checked = newSelectedFamilyMember.memberPersonalDiscount;
    document.getElementById("family-tax-discount").checked = newSelectedFamilyMember.memberFamilyDiscount;
    document.getElementById("additional-dependent-count").innerHTML = newSelectedFamilyMember.memberAdditionalDependentCount;
    document.getElementById("dependent-count").innerHTML = newSelectedFamilyMember.memberDependentCount;

  }

  const handleAddMember = () => {
    const personsName = document.getElementById("personsName").value;
    const personsNetto = document.getElementById("calculatedNetto").innerText;
    const personsBrutto = document.getElementById("bruttoInput").value;
    const personUnder25 = document.getElementById("under25").checked;
    const personIsNewlyWed = document.getElementById("newlywed").checked;
    const personPersonalDiscount = document.getElementById("personal-tax-discount").checked;
    const personFamilyDiscount = document.getElementById("family-tax-discount").checked;
    const personsAdditionDependentCount = document.getElementById("additional-dependent-count").innerHTML;
    const personsDependentCount = document.getElementById("dependent-count").innerHTML;

    const newMember = {
      memberId: id,
      memberName: personsName,
      memberNetto: parseInt(personsNetto),
      memberBrutto: parseInt(personsBrutto),
      memberIsUnder25: personUnder25,
      memberIsNewlywed: personIsNewlyWed,
      memberPersonalDiscount: personPersonalDiscount,
      memberFamilyDiscount: personFamilyDiscount, 
      memberAdditionalDependentCount: personsAdditionDependentCount,
      memberDependentCount: personsDependentCount
    }

    setFamilyMembersList([...familyMembersList, newMember]);
    id++;
  };

  const deleteMember = () => {
    const newFamilyList = familyMembersList.filter((_, memberId) => memberId !== selectedFamilyMember.memberId);
    console.log("Delete -> selectedMember id", selectedFamilyMember.memberId)
    console.log("Delete -> newfamily list", newFamilyList)
    setFamilyMembersList(newFamilyList);
    setSelectedFamilyMember(0);
  }

  return (
    <div className="container-fluid mt-5">
    <div className="row justify-content-center mb-5">
      <div className="col-md-5 pt-2 custom-background-card rounded">
        <FamilyMemberTabs
          familyMembersList={familyMembersList}
          addNewMember={handleAddMember}
          handleSelect={handleSelect}
        />
        <SalaryCalculator
          deleteMember={deleteMember}
          selected={selectedFamilyMember}
        />
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-5 custom-background-card rounded">
        <HouseholdSummary familyMembersList={familyMembersList} />
      </div>
    </div>
  </div>
  );
};

export default HouseholdSalaryCalculator;

import { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
  const [familyMembersList, setFamilyMembersList] = useState([{ memberName: "Rómeó", memberNetto: 100000, isActive: false }, { memberName: "A", memberNetto: 200000, isActive: false }]);

  const addMember = (newMember) => {
    setFamilyMembersList([...familyMembersList, newMember]);
  };

  const deleteMember = (index) => {
    const newFamilyList = familyMembersList.filter((_, i) => i !== index);
    setFamilyMembersList(newFamilyList);
  }

  const handleIsActive = (index) => {
    const newFamilyList = familyMembersList.map((member, i) => {
      if (i === index) {
        // Az aktuális tag isActive értékét megváltoztatjuk az ellentettére
        return { ...member, isActive: !member.isActive };
      }
      return member;
    });

    // Az új tömb beállítása a setFamilyMembersList segítségével
    setFamilyMembersList(newFamilyList);
  }

  return (
    <>
      <header>
        <FamilyMemberTabs familyMembersList={familyMembersList} newMember={addMember} />
      </header>
      <main>
        <SalaryCalculator familyMembersList={familyMembersList} deleteMember={deleteMember} />
        <HouseholdSummary familyMembersList={familyMembersList} />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;

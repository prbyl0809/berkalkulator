import { useState } from "react";
import Dependents from "./components/Dependents";
import NameInput from "./components/NameInput";

const SalaryCalculator = ( { deleteMember } ) => {
  const [brutto, setBrutto] = useState(0);
  const [isUnder25, setIsUnder25] = useState(false);
  const [isNewlywed, setIsNewlywed] = useState(false);
  const [personalDiscount, setPersonalDiscount] = useState(false);
  const [familyDiscount, setFamilyDiscount] = useState(false);
  const [dependentsCount, setDependentsCount] = useState(0);
  const [additionalDependentsCount, setAdditionalDependentsCount] = useState(0);

  const calculateNetto = (brutto, dependentsCount, additionalDependentsCount) => {
    let taxBase = brutto;
    if (familyDiscount) {
      if (dependentsCount == 1) {
        taxBase -= (10000 * additionalDependentsCount);
      } else if (dependentsCount == 2) {
        taxBase -= 20000 * additionalDependentsCount;
      } else if (dependentsCount == 3) {
        taxBase -= 33000 * additionalDependentsCount;
      }
      if (taxBase < 0) taxBase = 0;
    }

    let szja;
    let under25Limit = 499952;
    let personalDiscountMax = 77300;

    if (isUnder25) {
      if (brutto <= under25Limit) szja = 0;
      else if (taxBase - under25Limit < 0) szja = 0;
      else szja = (taxBase - under25Limit) * 0.15;
    }
    else szja = taxBase * 0.15;

    let tb = taxBase * 0.185;

    let tax = szja + tb;
    if (personalDiscount) {
      if (tax > personalDiscountMax) tax -= personalDiscountMax
      else tax = 0;
    }

    let netto = brutto - tax
    if (isNewlywed) netto += 5000;
    return parseInt(netto);
  }

  const handleBrutto = (event) => {
    setBrutto(event.target.value);
  }

  const handleIsUnder25 = () => {
    setIsUnder25(!isUnder25);
  }

  const handleIsNewlywed = () => {
    setIsNewlywed(!isNewlywed);
  }

  const handlePersonalDiscount = () => {
    setPersonalDiscount(!personalDiscount);
  }

  const handleFamilyDiscount = () => {
    setFamilyDiscount(!familyDiscount);
  }

  const handlePercentageChange = (percentageChange) => {
    let newBrutto = brutto * (1 + percentageChange / 100)
    setBrutto(newBrutto)
  }

  const handleDependentsCount = (v) => {
    if (dependentsCount == 0 && v == -1) return
    else if (dependentsCount == 3 && v == 1) return
    else setDependentsCount(dependentsCount + v)
  }

  const handleAdditionalDependentsCount = (v) => {
    if (additionalDependentsCount == 0 && v == -1) return
    else setAdditionalDependentsCount(additionalDependentsCount + v)
  }

  return (
    <div>
      <NameInput />

      <input type="button" value="-" onClick={deleteMember} />

      <h3>Bruttó bér</h3>
      <input type="number" name="Brutto" id="brutto" value={parseInt(brutto)} onChange={handleBrutto} />
      <input type="range" name="range" id="bruttoRange" max={1500000} value={brutto} onChange={handleBrutto} />
      <div>
        <button onClick={() => handlePercentageChange(-5)}>-5%</button>
        <button onClick={() => handlePercentageChange(-1)}>-1%</button>
        <button onClick={() => handlePercentageChange(1)}>+1%</button>
        <button onClick={() => handlePercentageChange(5)}>+5%</button>
      </div>
      <h1>Kedvezmények</h1>
      <label htmlFor="under25">
        <input type="checkbox" checked={isUnder25} name="Young" id="under25" onChange={handleIsUnder25} />
        <p>25 év alattiak SZJA mentessége</p>
      </label>
      <label htmlFor="newlywed">
        <input type="checkbox" checked={isNewlywed} name="Married" id="newlywed" onChange={handleIsNewlywed} />
        <p>Friss házasok kedvezménye</p>
      </label>
      <label htmlFor="personal-tax-discount">
        <input type="checkbox" checked={personalDiscount} name="Personal" id="personal-tax-discount" onChange={handlePersonalDiscount} />
        <p>Személyi adókedvezmény</p>
      </label>
      <label htmlFor="family-tax-discount">
        <input type="checkbox" checked={familyDiscount} name="Family" id="family-tax-discount" onChange={handleFamilyDiscount} />
        <p>Családi kedvezmény</p>
      </label>

      <Dependents dCount={dependentsCount} aCount={additionalDependentsCount} onAdditionalInput={handleAdditionalDependentsCount} onDependentInput={handleDependentsCount}></Dependents>

      <h1>Számított nettó bér</h1>
      <p id="calculatedNetto">{calculateNetto(brutto, dependentsCount, additionalDependentsCount)}</p>
    </div>
  )
};

export default SalaryCalculator;

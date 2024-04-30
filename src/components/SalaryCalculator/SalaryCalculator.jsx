import { useState } from "react";
import Dependents from "./components/Dependents";
import NameInput from "./components/NameInput";
import MarriageDateModal from "./components/MarriageDateModal";
import NewlywedsEligible from "./components/NewlywedsEligible";

const SalaryCalculator = ({ deleteMember, selected }) => {
  const [brutto, setBrutto] = useState(0);
  const [isUnder25, setIsUnder25] = useState(false);
  const [isNewlywed, setIsNewlywed] = useState(false);
  const [personalDiscount, setPersonalDiscount] = useState(false);
  const [familyDiscount, setFamilyDiscount] = useState(false);
  const [dependentsCount, setDependentsCount] = useState(0);
  const [additionalDependentsCount, setAdditionalDependentsCount] = useState(0);
  const [showMarriageDateModal, setShowMarriageDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const formattedTwoYearsAgo = twoYearsAgo.toISOString().split('T')[0];

  const weddingDate = new Date(selectedDate);
  const nextMonthAfterWedding = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), 1);

  const isInTwoYears = (selectedDate <= formattedToday && selectedDate >= formattedTwoYearsAgo)
  const sameMonth = today.getFullYear() == nextMonthAfterWedding.getFullYear() && today.getMonth() == nextMonthAfterWedding.getMonth()
  
  const eligibleForADiscountForNewlyweds = (
    isInTwoYears && !sameMonth
  )

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

    if (isNewlywed && eligibleForADiscountForNewlyweds) netto += 5000;
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

  const handleShowModal = () => setShowMarriageDateModal(true);
  const handleCloseModal = () => setShowMarriageDateModal(false);
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowMarriageDateModal(false);
  };

  return (
    <div className="container mt-4">
      <NameInput />

      <h4>Bruttó bér</h4>
      <div className="input-group mb-3">
        <input type="number" className="form-control" id="bruttoInput" step={1000} value={parseInt(brutto)} onChange={handleBrutto} />
        <span className="input-group-text">Ft</span>
      </div>
      <input type="range" className="form-range mb-3 range" max={1500000} step={1000} value={brutto} onChange={handleBrutto} />
      <div>
        <button className="btn btn-secondary me-2" onClick={() => handlePercentageChange(-5)}>-5%</button>
        <button className="btn btn-secondary me-2" onClick={() => handlePercentageChange(-1)}>-1%</button>
        <button className="btn btn-secondary me-2" onClick={() => handlePercentageChange(1)}>+1%</button>
        <button className="btn btn-secondary" onClick={() => handlePercentageChange(5)}>+5%</button>
      </div>

      <h4 className="mt-3">Kedvezmények</h4>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={isUnder25} id="under25" onChange={handleIsUnder25} />
        <label className="form-check-label" htmlFor="under25">
          25 év alattiak SZJA mentessége
        </label>
      </div>


      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={isNewlywed} id="newlywed" onChange={handleIsNewlywed} />
        <label className="form-check-label" htmlFor="newlywed">
          Friss házasok kedvezménye
        </label>
        {isNewlywed && <button className="btn btn-secondary btn-sm" onClick={handleShowModal}>Dátum megadása</button>}
        {showMarriageDateModal && (
          <MarriageDateModal onSelect={handleSelectDate} show={showMarriageDateModal} handleClose={handleCloseModal} />
        )}

        <NewlywedsEligible selectedDate={selectedDate} eligibleForADiscountForNewlyweds={eligibleForADiscountForNewlyweds} />
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={personalDiscount} id="personal-tax-discount" onChange={handlePersonalDiscount} />
        <label className="form-check-label" htmlFor="personal-tax-discount">
          Személyi adókedvezmény
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={familyDiscount} id="family-tax-discount" onChange={handleFamilyDiscount} />
        <label className="form-check-label" htmlFor="family-tax-discount">
          Családi kedvezmény
        </label>
      </div>

      <Dependents dCount={dependentsCount} aCount={additionalDependentsCount} onAdditionalInput={handleAdditionalDependentsCount} onDependentInput={handleDependentsCount}></Dependents>

      <div className="text-center">
        <h3 className="mt-5">Számított nettó bér</h3>
        <button className="btn btn-secondary btn-block" id="calculatedNetto">{calculateNetto(brutto, dependentsCount, additionalDependentsCount)}</button>
      </div>
      <div className="d-flex justify-content-end">
        <input type="button" className="btn btn-danger mb-3" value="-" onClick={deleteMember} />
      </div>
    </div>
  )
};

export default SalaryCalculator;

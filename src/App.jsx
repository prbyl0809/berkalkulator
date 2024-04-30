import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";
import 'bootstrap/dist/css/bootstrap.min.css';
import './customStyle.css'

function App() {
  return (
    <div className="container-fluid custom-background-main">
      <h1 className="text-center">Bérkalkulátor alkalmazás</h1>
      <HouseholdSalaryCalculator />
    </div>
  );
}

export default App;

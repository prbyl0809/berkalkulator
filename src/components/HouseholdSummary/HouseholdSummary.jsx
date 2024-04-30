const HouseholdSummary = ({ familyMembersList }) => {
  const calculateTotalNetto = () => {
    let totalNetto = 0;
    familyMembersList.forEach(member => {
      totalNetto += member.memberNetto;
    });
    return totalNetto;
  };

  return (<div className="mt-5">
    <h2 className="text-center mb-4">Háztartás összesített jövedelme</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Családtag</th>
          <th>Nettó bér</th>
        </tr>
      </thead>
      <tbody>
        {familyMembersList.map((item, index) => (
          <tr key={index}>
            <td>{item.memberName}</td>
            <td>{item.memberNetto}</td>
          </tr>
        ))}
        <tr>
          <td><strong>Összesen:</strong></td>
          <td><strong>{calculateTotalNetto()}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  )
};

export default HouseholdSummary;

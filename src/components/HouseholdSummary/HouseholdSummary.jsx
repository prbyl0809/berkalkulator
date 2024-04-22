const HouseholdSummary = ({ familyMembersList }) => {
  console.log("táblázat: ", familyMembersList)

  const calculateTotalNetto = () => {
    let totalNetto = 0;
    familyMembersList.forEach(member => {
      totalNetto += member.memberNetto;
    });
    return totalNetto;
  };

  return (<div>
    <h2>Háztartás összesített jövedelme</h2>
    <table>
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
          <td>Összesen:</td>
          <td>{calculateTotalNetto()}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
};

export default HouseholdSummary;

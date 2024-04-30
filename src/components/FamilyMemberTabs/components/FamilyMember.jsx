const FamilyMembers = ( {name, id, select} ) => {
    return (<div>
        <button className="btn btn-outline-secondary" onClick={() => select(id)}>{name}</button>
    </div>
    );
}

export default FamilyMembers;
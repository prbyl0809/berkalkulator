const Dependents = ({ dCount, aCount, onAdditionalInput, onDependentInput }) => {
    return (
        <div className="mt-2 d-flex align-items-center">
            <button onClick={() => {
                if (aCount > dCount) {
                    onAdditionalInput(-1);
                }
            }} className="btn btn-outline-secondary">-</button>
            <div className="mx-3 d-flex align-items-center justify-content-center" id="additional-dependent-count">{aCount}</div>
            <button className="btn btn-outline-secondary" onClick={() => onAdditionalInput(1)}>+</button>
            <div className="mx-3 d-flex align-items-center justify-content-center">Eltartott, ebből kedvezményezett:</div>
            <button className="btn btn-outline-secondary" onClick={() => onDependentInput(-1)}>-</button>
            <div className="mx-3 d-flex align-items-center justify-content-center" id="dependent-count">{dCount}</div>
            <button onClick={() => {
                if (dCount < aCount) {
                    onDependentInput(1);
                }
            }} className="btn btn-outline-secondary">+</button>
        </div>
    );
}

export default Dependents;
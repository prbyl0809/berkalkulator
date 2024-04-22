const Dependents = ({ dCount, aCount, onAdditionalInput, onDependentInput }) => {
    return (
        <div>
            <button onClick={() => {
                if (aCount > dCount) {
                    onAdditionalInput(-1);
                }
            }}>-</button>
            <p>{aCount}</p>
            <button onClick={() => onAdditionalInput(1)}>+</button>
            <p>Eltartott, ebből kedvezményezett:</p>
            <button onClick={() => onDependentInput(-1)}>-</button>
            <p>{dCount}</p>
            <button onClick={() => {
                if (dCount < aCount) {
                    onDependentInput(1);
                }
            }}>+</button>
        </div>
    );
}

export default Dependents;
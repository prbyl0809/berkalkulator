const NewlywedsEligible = ( {selectedDate, eligibleForADiscountForNewlyweds} ) => {
    return (
        <>
            {selectedDate && (
                <>
                    {eligibleForADiscountForNewlyweds ? (
                        <button className="btn btn-success btn-sm">Jogosult</button>
                    ) : (
                        <button className="btn btn-danger btn-sm">Nem jogosult</button>
                    )}
                </>
            )}
        </>
    );
}

export default NewlywedsEligible;
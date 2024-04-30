const NameInput = () => {
    return (<>
        <div className="mt-4">
            <h4 id="nameInputTitle">BÉR KISZÁMÍTÁSA</h4>
            <div className="mb-3">
                <label htmlFor="personsName" className="form-label">
                    <h4>Családtag neve</h4>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="personsName"
                />
                <p className="form-text">Add meg a családtag nevét!</p>
            </div>
        </div>
    </>
    );
}

export default NameInput;
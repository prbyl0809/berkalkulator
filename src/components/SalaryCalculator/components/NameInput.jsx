import { useState } from "react";

const NameInput = () => {
    const [name, setName] = useState('');

    const handleName = (event) => {
        setName(event.target.value)
    }

    return (<>
        {name != "" ? <h2>{name.toUpperCase()} BÉRÉNEK KISZÁMÍTÁSA</h2> : <h2>BÉR KISZÁMÍTÁSA</h2>}
        <label htmlFor="personsName">
            <h3>Családtag neve</h3>
            <input type="text" name="Persons name" id="personsName" onChange={handleName} />
            <p>Add meg a családtag nevét!</p>
        </label>
    </>
    );
}

export default NameInput;
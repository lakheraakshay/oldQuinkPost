import React, { useState } from 'react'

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>
            <input
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder=" &#61442; Search Quinkpost"
            />
        </div>
    )
}

export default SearchFeature

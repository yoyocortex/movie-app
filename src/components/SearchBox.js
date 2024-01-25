import React from 'react'

export default function SearchBox(props) {
    return (
        <div className="search">
            <input type="text" className="search__input" placeholder="Type to search..." value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)}></input>
        </div>
    )
}

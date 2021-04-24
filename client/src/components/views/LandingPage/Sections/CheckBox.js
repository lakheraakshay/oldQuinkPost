import React, { useState } from 'react'
import '../../style/Navbar.css';

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <div className='li-checkbox-container'>
            <div className='li-checkbox'>
            <input
                className='icons'
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <span>{value.name}</span>
            </div>
            </div>
        </React.Fragment>
    ))

    return (
        <div>
           
                    {renderCheckboxLists()}
          
        </div>
    )
}

export default CheckBox

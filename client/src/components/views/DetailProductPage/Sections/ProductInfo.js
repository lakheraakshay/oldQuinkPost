import React, {useState} from 'react'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Tooltip } from '@material-ui/core';

function ProductInfo(props) {
    
    const [body, setBody] = useState(false)
    let comp;
    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
        setBody(!body)
    }

    if(body===false) {
        comp = <BookmarkBorderOutlinedIcon style={{fontSize: 23}} onClick={addToCarthandler} />
    } else {
        comp = <BookmarkIcon style={{fontSize: 23}} onClick={addToCarthandler} />
    }

    return (
        <div>
            <Tooltip title='Save Content' arrow={true}>
                {comp}
             </Tooltip>
        </div>
    )
}   
    
export default ProductInfo
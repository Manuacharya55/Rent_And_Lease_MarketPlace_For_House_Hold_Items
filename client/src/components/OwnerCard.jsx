import React from 'react'

const OwnerCard = ({props}) => {
    const {name,address,phone,email,avatar} = props
  return (
    <div id="owner-img">
        <div id="avatar">
            <img src={avatar} alt="" />
        </div>
        <div id="owner-desc">
            <p>{name}</p>
            <p>{address}</p>
            <p>{phone}</p>
            <p>{email}</p>
        </div>
    </div>
  )
}

export default OwnerCard
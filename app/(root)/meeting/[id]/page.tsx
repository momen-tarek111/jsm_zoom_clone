import React from 'react'

const Meeting = async(props:unknown) => {
  const { id } =await (props as { params: { id: string } }).params;
  return (
    <div>Meeting Room : #{id}</div>
  )
}

export default Meeting
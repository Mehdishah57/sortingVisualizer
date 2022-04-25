import React from 'react';

import "../styles/bar.scss";

interface Props {
    num: number
}

const Bar: React.FC<Props> = ({num}) => {
  return (
    <div style={{height: 100*(num/100)}} className='bar'></div>
  )
}

export default Bar
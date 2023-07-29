import React, {useState} from 'react'
import NewVisitor from './NewVisitor'
import OldVisitor from './OldVisitor'
import Step1 from './Step1'

const VisitorType = {
  1 : <Step1/>,
  2 : <NewVisitor/>,
  3 : <OldVisitor/>
}

const GeneratePass = () => {
  const [render, updateRender] = useState(1);
  const handleMenuClick = (key) => {
    updateRender(key);
  };

  return (
      <>
        <div className='mb-4'>
        {VisitorType[render]}
        <br/>
        <NewVisitor/>
        <OldVisitor/>
      </div>
      </>
      
  )
}

export default GeneratePass
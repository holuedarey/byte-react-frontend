import React from 'react';


const Form = ({heading}) => {
  return (
    <form>
        <h3 className='fs-7 text-blue mb-4'>{heading}</h3>
        <div className='row'>
        <label htmlFor="config" className="form-label">
            Less Than Or Equal To (%) 
            <span className='text-danger'> *</span>
          </label>
        <div className="col-6">
          <input type="text" className="form-control" placeholder='Enter value'/>
        </div>
        <div className='col-6'>
          <button className='btn bg-blue text-white fs-7 w-50 p-2'>Save</button>
        </div>
        </div>
    </form>
  )
}

export default function PosAnalysis() {
  return (
    <div>
      <div className='bg-white border p-4 fs-7'>
        <div className='d-flex justify-content-end fs-6'><a href='#'>Back</a></div>
        <div className='row m-3'>
        <div className='col border-end h-200'>
          <Form 
             heading = {'Battery level configuration'}
          />
        </div>
          <div className='col ps-5'>
            <Form 
               heading = {'Network level configuration'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

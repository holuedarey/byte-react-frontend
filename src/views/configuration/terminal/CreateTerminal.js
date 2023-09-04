import React from 'react';

const SelectParam = ({params = {}}) => {
  return (
    <div className='d-flex flex-wrap mt-4'>
      {params.map((param, index) =>
      <div className='me-5 mb-4' key={index}>
      <div>
      <label htmlFor="config" className="form-label">
         {param.label}
       </label>
       </div>
       <select>
         <option className="form-control">{param.option}</option>
       </select>
     </div>
      )}
    </div>
  )
}

export default function CreateTerminal() {
  return (
    <div className='bg-white border p-4 fs-7'>
      <div className='mb-6'>
        <div className='d-flex justify-content-end fs-6'><a href='#'>Back</a></div>
        <h3 className='fs-7 text-blue'>New Terminal Configuration</h3>
        <hr />
        <div>
          <form>
            <div className='row pb-4'>
              <div className='col-4'>
                <label htmlFor="config" className="form-label">
                  Terminal File Name
                  <span className='text-danger'> *</span>
                </label>
                <input type="text" className="form-control" placeholder='Enter Switch Name'/>
              </div>
              <div className='col-4'>
                <label htmlFor="config" className="form-label">
                  Enter Header Row Number
                  <span className='text-danger'> *</span>
                </label>
                <input type="text" className="form-control" placeholder='Enter Header Row Number'/>
              </div>
            </div>
            <div className='row'>
            <div className='col-8 h-100'>
                <label htmlFor="config" className="form-label">
                  Enter Headers
                  <span className='text-danger'> *</span>
                </label>
                <textarea type="text" className="form-control" placeholder='Enter Headers Seperated by Commas' />
              </div>
            </div>
              <SelectParam 
               params = {[
                {label: 'Merchant Id', option: 'Select Header'},
                {label: 'Merchant Name', option: 'Select Header'},
                {label: 'Terminal Id', option: 'Select Header'},
                {label: 'Contact', option: 'Select Header'},
                {label: 'Phone', option: 'Select Header'},
                {label: 'Email Address', option: 'Select Header'},
                {label: 'Account Number', option: 'Select Header'},
                {label: 'Ptsp', option: 'Select Header'},
                {label: 'Device Type', option: 'Select Header'},
                {label: 'Device Serial', option: 'Select Header'},
                {label: 'Device Name', option: 'Select Header'},
                {label: 'App Name', option: 'Select Header'},
                {label: 'App Version', option: 'Select Header'},
                {label: 'Network Type', option: 'Select Header'},
                {label: 'Bank Code', option: 'Select Header'},
                {label: 'Bank Branch', option: 'Select Header'},
                {label: 'Mcc', option: 'Select Header'},
                {label: 'Status Code', option: 'Select Header'},
                {label: 'Lcc', option: 'Select Header'},
                {label: 'Category', option: 'Select Header'},
               ]}
              />
            <button className='btn bg-blue text-white mt-4 rounded-1'>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  )
}

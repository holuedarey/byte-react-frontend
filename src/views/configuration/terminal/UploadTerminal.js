import React from 'react';
import document from '../../../images/doc.png';


export default function UploadTerminal() {
  return (
    <div className='bg-white border p-4 fs-7'>
      <div className='d-flex justify-content-end fs-6'><a href='#'>Back</a></div>
      <div className='d-flex justify-content-center mb-5'>
        <div>
        <div className='border-dashed-blue p-5 mt-4'>
          <div>
            <div className='d-flex justify-content-center'>
              <img src={document} alt='document'/>
            </div>
            <p className='text-primary text-center mt-2'>Select An Excel File To Upload <br/> Or Drag File Here</p>
          </div>
        </div>
      <div className='row mt-4 mb-5'>
        <label htmlFor="config" className="form-label text-dark">
            Terminal File Name
          </label>
        <div className="col-8">
          <input type="text" className="form-control" placeholder='Enter value'/>
        </div>
        <div className='col-4 mb-5'>
          <button className='btn bg-blue text-white fs-7 w-100 p-2'>Upload</button>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

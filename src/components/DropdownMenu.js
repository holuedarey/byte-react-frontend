import React from 'react';

export default function DropdownMenu({items, label}) {
    const [val, setVal] = React.useState();

  function handleChange(e) {
    e.preventDefault();
    let val = items.find(item => item.name === e.target.value );
    setVal(val)
  } 

  return (
    <div className='row mt-5'>
      <div className='col-4 d-flex mb-3'>
        <label className='fs-7 me-3 mt-4'>{label}</label>
        <select className='border bg-white scroll' onChange={handleChange}>
          {items.map((item, index) => 
            <option key={index} value={item.name}>{item.name}</option>
          )}
        </select>
      </div>
      <div className='content'>
        {val ? val.content : items[0].content}
      </div>
    </div>
  )
}

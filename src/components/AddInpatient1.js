import React, { Component } from 'react';


const AddInpatient1 = (props) => {
    return ( 
        <div>
        <div className="row mt-5">
        <div className="col-md-8 mx-auto">
           <div className="card">
               <div className="card-header">
                   <div className="pull-left">
                   <i className="fa fa-align-left mr-2"></i>
                   Add Inpatient
                   </div>
                
               </div>
           <div className="card-body">

           <form onSubmit={props.handleSubmit}>
           <div className="form-group">
                <div className="row">
                <div className="col-md-3">
                    <label htmlFor="inpatient_number">Inpatient Number:</label>
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" name="inpatient_number" value={props.state.inpatient_number} onChange={props.handleChange} />
                </div>
                </div>
                </div>
                <div className="form-group">
                <div className="row">
                <div className="col-md-3">
                    <label htmlFor="admission_date">Admission Date:</label>
                </div>
                <div className="col-md-6">
                    <input type="date" className="form-control" name="admission_date" value={props.state.admission_date} onChange={props.handleChange} />
                </div>
                </div>
                </div>
                <div className="form-group">
                <div className="row">
                <div className="col-md-3">
                    <label htmlFor="published_date">Discharge Date:</label>
                </div>
                <div className="col-md-6">
                    <input type="date" className="form-control" name="discharge_date"  value={props.state.discharge_date} onChange={props.handleChange}/>
                
                   {props.state.dischargeArray.map((item)=>{
                        return(
                        <div class="row">
                          <label htmlFor="published_date" key={item}>{item}</label>
                          </div>
                        );

                    })}
                </div>
                </div>
                </div>
                <div className="row">
                <button onClick={props.handlePrev} className="btn btn-primary ml-2">Previous</button>
                <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
                </form>
               
                
           </div>
           </div>
       </div>
       </div>
       </div>
         
     );
  };

 
export default AddInpatient1;
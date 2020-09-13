import React, { Component } from 'react';

const AddInpatient = (props) => {
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

           <form onSubmit={props.handleNext}>
                <div className="form-group">
                <div className="row">
                <div className="col-md-3">
                    <label htmlFor="patient_id">Patient ID:</label>
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" name="patient_id" value={props.state.patient_id} onChange={props.handleChange} />
                </div>
                </div>
                </div>
            
                <div className="form-group">
                <div className="row">
                <div className="col-md-3">
                    <label htmlFor="ward_id">Ward ID:</label>
                </div>
        
                <div className="col-md-6">
                    <select  className="form-control" name="ward_id"  onChange={props.handleChange}>
                    {props.state.wards.map((item)=>{
                        return  <option key={item.id} value={item.id}>{item.ward_name}</option>;

                    })}
                       
                    </select>
                </div>
                </div>
                </div>
                <div className="col-md-2 mr-2">
                <button type="submit" className="btn btn-primary">Next</button>
                </div>
                </form>
                
           </div>
           </div>
       </div>
       </div>
       </div>
         
     );
  };

 
export default AddInpatient;
import React, { Component } from 'react';
import Axios from "axios";
import Moment from 'moment';


class EditInpatient extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        patient_id: "",
        inpatient_number: "",
        ward_id: "",
        admission_date: "",
        discharge_date:""

      }
  }
  componentDidMount()
  {
      Axios.get('http://localhost:8000/api/inpatients/'+this.props.match.params.id).then((response)=>
      this.setState({
        patient_id: response.data.data.patient_id,
        inpatient_number: response.data.data.inpatient_number,
        ward_id: response.data.data.ward_id,
        admission_date:response.data.data.admission_date,
        discharge_date:response.data.data.discharge_date
       
      }) 
      ).catch((error) => console.log(error));
     
  }
  handleChange=(event)=>
  {
    this.setState({
      [event.target.name]:event.target.value,
    });

  }
  handleSubmit=(event)=>{
    event.preventDefault();
    var collect_input  = {
        patient_id: this.state.patient_id,
        inpatient_number: this.state.inpatient_number,
        ward_id: this.state.ward_id,
        admission_date: this.state.admission_date,
        discharge_date:this.state.discharge_date
    };
    Axios.post('http://localhost:8000/api/inpatients/'+this.props.match.params.id,collect_input)
    .then((response)=>{
    
        this.props.history.push("/");
    })
    .catch((error)=>{
        console.log(error);
    });

  }
    render() { 
        return (  
             <div className="row mt-5">
        <div className="col-md-8 mx-auto">
           <div className="card">
               <div className="card-header">
                   <div className="pull-left">
                   <i className="fa fa-align-left mr-2"></i>
                   Edit Inpatient
                   </div>
                
               </div>
           <div className="card-body">

           <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="patient_id">Patient ID:</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="patient_id" value={this.state.patient_id} onChange={this.handleChange} />
                    </div>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="inpatient_number">Inpatient Number:</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="inpatient_number" value={this.state.inpatient_number} onChange={this.handleChange} />
                    </div>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="ward_id">Ward ID:</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="ward_id" value={this.state.ward_id} onChange={this.handleChange} />
                    </div>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="admission_date">Admission Date:</label>
                    </div>
                    <div className="col-md-6">
                        <input type="date" className="form-control" name="admission_date" defaultValue={this.state.admission_date  || ''} onChange={this.handleChange} />
                    </div>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="published_date">Discharge Date:</label>
                    </div>
                    <div className="col-md-6">
                        <input type="date" className="form-control" name="discharge_date"  defaultValue={this.state.discharge_date  || ''} onChange={this.handleChange}/>
                    </div>
                    </div>
                    </div>
                    <div className="col-md-2 mr-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    </form>
                
           </div>
           </div>
       </div>
       </div> );
    }
}
 
export default EditInpatient;
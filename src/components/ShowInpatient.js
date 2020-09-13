import React, { Component } from 'react';
import Axios from 'axios';
import Moment from 'moment';

class ShowInpatient extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
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
          admission_date: response.data.data.admission_date,
          discharge_date:response.data.data.discharge_date
        }) 
        ).catch((error) => console.log(error));
    }

    render() { 
        return ( 
            <div className="row mt-5">
            <div className="col-md-9 mx-auto">
               <div className="card">
                   <div className="card-header">
                       <div className="pull-left">
                       <i className="fa fa-align-left mr-2"></i>
                       Show Inpatient
                       </div>
                    
                   </div>
               <div className="card-body">
               <div className="row">
               <div className="col-md-4">
               <b>Patient Id:</b>{" "}{this.state.patient_id}
               </div>
               <div className="col-md-4">
               <b>Inpatient Number:</b>{" "}{this.state.inpatient_number}
               </div>
               <div className="col-md-4">
               <b>Ward Id:</b>{" "}{this.state.ward_id}<br />
               </div>
               </div>
               <div className="row mt-3">
               <div className="col-md-4">
               <b>Admission Date:</b>{" "}{Moment(this.state.admission_date).format('DD/MM/YYYY')}<br />
               </div>
               <div className="col-md-4">
               <b>Discharge Date:</b>{" "}{Moment(this.state.discharge_date).format('DD/MM/YYYY')}<br />
               </div>
               <div className="col-md-4">
               </div>
               </div>
        
               </div>
               </div>
               </div>
               </div>
         );
    }
}
 
export default ShowInpatient;
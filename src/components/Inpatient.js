import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Axios from "axios";
import Moment from 'moment';

class Inpatient extends React.Component
{
  constructor(props)
  {
    super(props);
   this.state={
     i:0,
    inpatients:[],
    wards:[],

    };
  }


  componentDidMount()
  {
   this.getData();
  }

  getData()
  {
    Axios.get('http://localhost:8000/api/inpatients').then((response)=>{
    
      this.setState(
        {
          inpatients:response.data.data.inpatients,
          wards:response.data.data.ward,
          i:0,

        }
      )
      
    }).catch((error)=>{
console.log(error);
    });
  }

  handleDelete=(e,id)=>{
    Axios.get('http://localhost:8000/api/inpatients/delete/'+id).then((response)=>{
    
      this.getData();
      
    }).catch((error)=>{
console.log(error);
    });
  }
    render()
    {
        return(
            <div className="row mt-5">
             {console.log(this.state.inpatients)} 
         <div className="col-md-11 mx-auto">
            <div className="card">
                <div className="card-header">
                    <div className="pull-left">
                    <i className="fa fa-align-left mr-2"></i>
                    Inpatient List
                    </div>
                   <Link to="/add"> <button className="btn btn-primary pull-right"><i className="fa fa-plus"></i></button></Link>
                
                </div>
            <div className="card-body">
            <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Patient No.</th>
      <th scope="col">Inpatient No.</th>
      <th scope="col">Ward</th>
      <th scope="col">Bed Number</th>
      <th scope="col">Admission Date</th>
      <th scope="col">Discharge Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {this.state.inpatients.map((item)=>{
      return(
        <tr key={item.id}>
        <td scope="col">{++(this.state.i)}</td>
        <td scope="col">{item.patient.name}</td>
        <td scope="col">{item.patient.patient_number}</td>
        <td scope="col">{item.inpatient_number}</td>
        <td scope="col">{item.ward.ward_name}</td>
        <td scope="col">{item.ward.bed_number}</td>
        <td scope="col">{Moment(item.admission_date).format('DD/MM/YYYY')}</td>
        <td scope="col">{Moment(item.discharge_date).format('DD/MM/YYYY')}</td>
        <td>
        <Link to={"/" + item.id}><button className="btn-success"><i className="fa fa-eye mr-2"></i></button></Link> 
        <Link to={"/edit/" + item.id}><button className="btn-primary ml-2"><i className="fa fa-edit mr-2"></i></button></Link> 
          <button className="btn-danger ml-2"  onClick={(e) => this.handleDelete(e, item.id)}><i className="fa fa-trash mr-2"></i></button>
        </td>
      </tr>
       );
      

    })}
   
   
  </tbody>
</table>
            </div>
            </div>
        </div>
        </div>);
    
    }
}

export default Inpatient;
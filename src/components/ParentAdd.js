import React,{component, Component} from 'react';
import AddInpatient from './AddInpatient';
import Axios from "axios";
import AddInpatient1 from './AddInpatient1';

class ParentAdd extends Component{

    constructor(props) {
        super(props);
        this.state = {
          patient_id: "",
          inpatient_number: "",
          ward_id: "",
          admission_date: "",
          discharge_date:"",
          page:1,
          wards:[],
          dischargeArray:[]
        };
      }

      componentDidMount()
  {
    Axios.get('http://localhost:8000/api/inpatients').then((response)=>{
    
        this.setState(
          {
           wards:response.data.data.ward,
           dischargeArray:response.data.data.discharge,
          
  
          }
        )
        
      }).catch((error)=>{
  console.log(error);
      });
  }
//   componentDidUpdate(prevProps, prevState)
//   {
//       if(prevState.discharge_date!=this.state.discharge_date)
//       {
//         this.setState(
//             {
               
//         dischargeArray: [...this.state.dischargeArray, this.state.discharge_date],
//             })


          
//       }


//   }
      handleChange =(event) =>
      {
          this.setState({
            [event.target.name]:event.target.value,
          });
         

      };
      handleSubmit=(event)=>
      {
         event.preventDefault();
         const input = {
            patient_id: this.state.patient_id,
            inpatient_number: this.state.inpatient_number,
            ward_id: this.state.ward_id,
            admission_date: this.state.admission_date,
            discharge_date:this.state.discharge_date
        };
        Axios.post('http://localhost:8000/api/inpatients',input)
        .then((response)=>{
            this.setState(
                {
                   
            dischargeArray: [...this.state.dischargeArray, this.state.discharge_date],
                })
            
            this.props.history.push("/add");
        })
        .catch((error)=>{
            console.log(error);
        });


      };

      handleNext=()=>{
          this.setState({
              page:this.state.page+1,
          
          })
      };
      handlePrev=()=>{
        this.setState({
            page:this.state.page-1,
        
        })
    

    };

      switchcomponent=(x)=>{
          switch(x)
          {
              case 1:
              return <AddInpatient state={this.state} handleChange={this.handleChange} handleNext={this.handleNext}></AddInpatient>
              case 2:
              return <AddInpatient1 state={this.state} handleChange={this.handleChange} handlePrev={this.handlePrev} handleSubmit={this.handleSubmit}></AddInpatient1>

          }
      };

    render()
    {
        return <div>
           {this.switchcomponent(this.state.page)}
        </div>;
    }
} 
export default ParentAdd;
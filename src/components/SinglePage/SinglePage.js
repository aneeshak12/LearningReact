import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
export default class SinglePage extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[],

    }

  }
  componentDidMount() {
    const search=this.props.location.search;
    const id=new URLSearchParams(search);
   Axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics,player&id="+id.get("v")+"&key=AIzaSyAOJj_IHEdUyR5_FaxHqaUu9iJdTQhpwuk").then(response=>{
this.setState({
  data:response.data.items,
})
   }).catch(error=>{
     console.log(error);
   })
  }
  render() {
    return (
      <div>
       <Navbar/>
       <div className="container-fluid">
       <div className="row justify-content-center">
       <div className="col-md-7 ">
       {this.state.data.map((item)=>{
         return(
           <div>
            <div dangerouslySetInnerHTML={{__html:item.player.embedHtml}}>
       

         </div>
         <div className="">{item.snippet.title}</div>
         <div className="row justify-content-between">



         <div>Left</div>
         <div>Right</div>
         {/* <i className="fa fa-user"></i> */}
         </div>
         </div>
         );



       })}
       

       
  
       
      
       </div>
       <div className="col-md-4">
      
       </div>
       {/* <div className="row" style={{justifyContent:"space-between"}}></div> */}
       {/* <div style={{backgroundColor:"black",height:"200px",width:"20%"}} ></div>
       <div style={{backgroundColor:"green",height:"200px",width:"20%"}} ></div>
       <div style={{backgroundColor:"yellow",height:"200px",width:"20%"}} ></div>
       <div style={{backgroundColor:"blue",height:"200px",width:"20%"}} ></div>
       </div>
       <div className="row" style={{justifyContent:"space-around"}}>
       <div style={{backgroundColor:"black",height:"200px",width:"100px"}} ></div>
       <div style={{backgroundColor:"green",height:"200px",width:"100px"}} ></div>
       <div style={{backgroundColor:"yellow",height:"200px",width:"100px"}} ></div> */}
       </div>

       </div>
      </div>
    );
  }
}
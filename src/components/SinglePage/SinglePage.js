import React, { Component, Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Moment from 'moment';
import Collapse from 'react-bootstrap/Collapse';
export default class SinglePage extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[],
      channel:[],
      comments:[],
      channelID:"",
      showText:false,
      viewReply:false,

    }

  }
  getVideos =(id)=>{
   Axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics,player&id="+id.get("v")+"&key=AIzaSyAOJj_IHEdUyR5_FaxHqaUu9iJdTQhpwuk").then(response=>{
console.log(response.data.items[0].snippet.channelId);
   this.setState({
  data:response.data.items,
  channelID:response.data.items[0].snippet.channelId,
},()=>{
  this.getChannels();
})

   }).catch(error=>{
     console.log(error);
   })
  
  }
  getChannels=()=> {
    console.log(this.state.channelID);
    Axios.get(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id="+this.state.channelID+"&key=AIzaSyAOJj_IHEdUyR5_FaxHqaUu9iJdTQhpwuk"
    )
      .then((response) => {
        console.log(response);
       
        this.setState({
          channel:response.data.items,
         
        });
      })
      .catch((error) => console.log(error));
  
  }
  getComments=(id)=>{
    Axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAOJj_IHEdUyR5_FaxHqaUu9iJdTQhpwuk&part=snippet,replies&videoId="+id.get("v")
    )
      .then((response) => {
        console.log("comments",response.data.items);
       
        this.setState({
          comments:response.data.items,
         
        });
      })
      .catch((error) => console.log(error));

  }
  componentDidMount() {
    const search=this.props.location.search;
    const id=new URLSearchParams(search);
    this.getVideos(id);
    this.getComments(id);

    
  }
  formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 || n<1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6) return +(n / 1e6).toFixed(1) + "M";
  }
  toggle = () => {
    this.setState({ showText: !this.state.showText });
  }
  toggleReply = () =>{
    this.setState({ viewReply: !this.state.viewReply });
  }

  render() {
    return (
      <div>
       <Navbar/>
       <div className="container-fluid">
       <div className="row justify-content-center">
       <div className="col-md-7">
    
       {this.state.data.map((item)=>{
         return(
           <div>
            <div dangerouslySetInnerHTML={{__html:item.player.embedHtml}}></div>
            <div className="row" style={{marginLeft:"-2px",marginTop:"6px",fontSize:"20px"}}>{item.snippet.title}</div>
            <div className="row justify-content-between" style={{color:"#606060",marginTop:"9px",marginLeft:"-2px",fontSize:"15px"}}>
          <div className="viewsanddate">{item.statistics.viewCount}{" "}views
          <i className="fa fa-circle px-2" style={{ fontSize: "4px" }}></i>
          {Moment(item.snippet.publishedAt).format('LL')}</div>
         <div className="likeanddislike" style={{marginRight:"14px"}}><i className="fa fa-thumbs-up"></i>{" "}{this.formatCash(item.statistics.likeCount)}
         <i className="fa fa-thumbs-down pl-4"></i>{" "}{this.formatCash(item.statistics.dislikeCount)}
         <i className="fa fa-share pl-4"></i>{" "}Share
         <i class="fa fa-save pl-4"></i>{" "}Save
         <i class="fa fa-ellipsis-h pl-4"></i></div>
         </div>
            <hr></hr>
            <div className="row">
         {this.state.channel.map((channel_data)=>{
            return(
              <Fragment>
         <div className="col-md-1">
         <img className="rounded-circle p-2" src={channel_data.snippet.thumbnails.default.url} style={{border:"1px solid black",height:"50px"}}></img>
         </div>
         <div className="col-md-11">
         <div className="row justify-content-between">
         <div className="channel">
         <span className="pl-3" style={{fontSize:"14px",color: "black",fontWeight: "700"}}>{item.snippet.channelTitle}</span>
             <p className="pl-3" style={{fontSize:"13px",color: "#606060"}}>{this.formatCash(channel_data.statistics.subscriberCount)}{" "}subscribers</p>
          </div>
          <div className="subscribe-btn" style={{marginRight:"14px"}}>
         <button className="" style={{backgroundColor:"#e42b24",width:"128px",height:"39px",color:"white",
         fontWeight:"400",border: "2px solid #e42b24",fontSize: "19px",borderRadius: "3px"}}>Subscribe</button>
         </div>
         </div>
         <div className="row">
         <div className="col-md-12 ml-0" style={{marginTop:"16px",textAlign:"justify",fontSize:"14px"}}>
      { this.state.showText?item.snippet.description:item.snippet.description.substring(0,294)}<br />
         <span className="btn pl-0"  onClick={this.toggle} style={{color:"#606060",fontSize:"14px",fontWeight:"500"}}>
          {this.state.showText ? ' SHOW LESS' : ' SHOW MORE'}
        </span>
         </div>
         </div>

         </div>
              </Fragment>
              ); 
        })}
         </div>
            <hr></hr>
            <div className="row pl-3" style={{fontSize: "16px",fontWeight: "400"}}>
            {item.statistics.commentCount}{" "}Comments
            </div>
            {this.state.comments.map((Comment)=>{
              return(
                <Fragment>
                  <div className="row" style={{marginTop:"26px"}}>
                   <div className="col-md-1">
            <img className="rounded-circle p-2" 
            src={Comment.snippet.topLevelComment.snippet.authorProfileImageUrl} 
            style={{border:"1px solid #fff",height:"65px"}}></img>
            </div>
            <div className="col-md-11 pl-3" style={{paddingTop:"5px",fontSize: "14px"}}>
            <span style={{fontWeight: "500"}}>{Comment.snippet.topLevelComment.snippet.authorDisplayName}</span>{" "}
            <small style={{color:"#606060"}}>{Moment(Comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</small>
            <p style={{}}>{Comment.snippet.topLevelComment.snippet.textDisplay}</p>
<div className="likeanddislike mt-0" style={{}}><i className="fa fa-thumbs-up">
            </i>{" "}{Comment.snippet.topLevelComment.snippet.likeCount}
            <i className="fa fa-thumbs-down pl-4"></i>
            </div>
          {(Comment.replies)?(<span className="btn pl-0"  onClick={this.toggleReply} style={{color:"#0000FF",fontSize:"15px",fontWeight:"500"}}>
          {!this.state.viewReply ?(<div><i className="fa fa fa-caret-down">
            </i>&nbsp;&nbsp;&nbsp;&nbsp;View{" "}{Object.keys(Comment.replies.comments).length}{" "}replies</div>) : 
            (<div><i className="fa fa fa-caret-up">
            </i>&nbsp;&nbsp;&nbsp;&nbsp;HIde{" "}{Object.keys(Comment.replies.comments).length}{" "}replies</div>)}
        </span>)
            :""}
            {(Comment.replies && this.state.viewReply)?((
            Comment.replies.comments.map((Reply)=>{
              return(
                <Fragment>
            <div className="row" style={{marginTop:"26px"}}>
                   <div className="col-md-1">
            <img className="rounded-circle p-2" 
            src={Reply.snippet.authorProfileImageUrl} 
            style={{border:"1px solid #fff",height:"48px"}}></img>
            </div>
            <div className="col-md-11 pl-2" style={{paddingTop:"5px",fontSize: "13px"}}>
            <span style={{fontWeight: "500"}}>{Reply.snippet.authorDisplayName}</span>{" "}
            <small style={{color:"#606060"}}>{Moment(Reply.snippet.publishedAt).fromNow()}</small>
            <p style={{}}>{Reply.snippet.textDisplay}</p>
<div className="likeanddislike mt-0" style={{}}><i className="fa fa-thumbs-up">
            </i>{" "}{Reply.snippet.likeCount}
            <i className="fa fa-thumbs-down pl-4"></i>
            </div>

            </div>
            </div>
            </Fragment>

            );
            })))
            :""}
            
            </div>
            </div>

         
            
                </Fragment>

              );
            })}
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
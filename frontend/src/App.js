import React,{Component} from 'react';
import Modal from "./components/Modal";
import axios from 'axios';
import './App.css';

class App extends Component
{
  constructor(props){
    super(props);
  this.state= {
    viewcompleted:false,
    activeitem: {
      title:'',
      description:'',
      currentstate: false,
    },
    tasklist:[] 
  };
}
componentDidMount(){
  this.refreshlist();
} 

refreshlist=()=>{
  axios 
  .get("http://localhost:8000/api/post/")
  .then (res=> this.setstate({tasklist:res.data}))
  .catch (err=>console.log(err));
};

displayCompleted = status=>{
  if (status){
    return this.setState({viewcompleted:true})};
    return this.setState({viewcompleted:false});
};

renderTablist =()=>{
  return(
    <div className='tablist'>
      <span onClick={()=>this.displayCompleted(true)}
      className={this.state.viewcompleted? "active":""}>completed</span>
      <span 
      onClick={()=>this.displayCompleted(false)}
      className={this.state.viewcompleted? "active":""}>Incomplete</span>
    </div>
  );
};
renderItems =()=>{
  const{viewCompleted}=this.state;
  const newItems =this.state.tasklist.filter(
    (item)=> item.completed === viewCompleted
  );
  return newItems.map((item)=>(
    <li
    key={item.id}
    className="list-group-item d-flex justify-content-between align-items-center">
      <span
      className={`demoapp-title mr-2 ${
        this.state.viewcompleted?"completed-demoapp":""}`}
        title={item.description}>
          {item.title}
        </span>
    <span>
      <button
      onClick={()=>this.editItem(item)}
      className="btn btn-secondary mr-2"> Edit</button>
       <button
      onClick={()=>this.DeleteItem(item)}
      className="btn btn-danger"> Delete</button>
    </span>
        </li>
  )
  );
};
toggle =()=>{
  this.setState({Modal:!this.state.Modal});
};
handesubmit =(item)=>{this.toggle();
alert ("save"+JSON.stringify(item));
};
handlesubmit=(item)=>{
  this.toggle();
  if (item.id){
    axios
    .put(`http://127.0.0.1:8000/api/post/${item.id}/`,item)
    .then ((res)=>this.refreshlist());
  return;
  }
  axios
  .post("http://localhost:8000/api/post/",item)
  .then((res)=>this.refreshlist());
};

Deletetem=(item)=>{
    axios
    .delete(`http://localhost:8000/api/post/${item.id}/`,item)
    .then((res)=>this.refreshlist());
  };
DeleteItem=(item)=>{
    alert("delete"+JSON.stringify(item));
  };
  Createitem=()=>{
  const item={title:"",description:"",status:false,contributor:""}
  this.setState({activeitem:item,Modal:!this.state.Modal});
};
editItem=(item)=>
this.setState({activeitem:item,Modal:!this.state.Modal});


render() 
{
  return (
    <main className="content">
      <h1 className="text-success text-uppercase text-center my-4">
        GFG Task Manager
      </h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={this.createItem} className="btn btn-info">
                Add task
              </button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
          </div>
        </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
};
export default App;

import React, { Component } from 'react'
import './App.css';
import Modal from './components/Modal';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal :false,
      viewCompleted : false,
      activeItem :{
        title :"",
        description:"",
        completed:false
      },
      todoList : []
    };
  }

  componentDidMount() {
    this.refreshLiist();
  }

  refreshLiist = () => {
     axios.get("http://localhost:8000/api/tasks/")
     .then(res => this.setState({ todoList : res.data}))
     .catch(err => console.log(err))
  };


  toggle = ()=>{
    this.setState({modal : !this.state.modal});
  };

  handleSubmit = item =>{
    this.toggle();
    if(item.id){
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`,item)
        .then(res => this.refreshLiist())
    }
    axios
      .post("http://localhost:8000/api/tasks/",item)
      .then(res => this.refreshLiist())
  }
  handleDelete = item =>{
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshLiist())
  }

  createItem = () =>{
    const item = {title:"", modal : !this.state.modal};
    this.setState({activeItem : item, modal : !this.state.modal});
  };

  editItem = item =>{
    this.setState({activeItem : item, modal: !this.state.modal});
  }

  displayCompleted = status =>{
    if (status) {
      return this.setState({viewCompleted : true});
    }
    return this.setState({viewCompleted : false});
  }

  renderTabList = () =>{
    return(
      <div className='my-5 tab-list'>
        <span 
          onClick={()=> this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >Completed</span>
         <span 
          onClick={()=> this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >Incompleted</span>
      </div>
    )
  }

  renderItems = () =>{
    const { viewCompleted} = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item=>(
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center bg-info-subtle text-secondary'>
          <span className={`todo-title ${this.state.viewCompleted ? "completed-todo" : ""}`} 
           title={item.title}>
              {item.title}
          </span>
          <span >
          <button type="button" onClick={()=>this.editItem(item)} className="btn btn-info text-light">Edit</button>
          <button type="button" onClick={()=>this.handleDelete(item)} style={{marginLeft:20}}className="btn btn-danger ">Delete</button>
          </span>
      </li>
  ))
  };

  render(){
    return(
    
      <div className='container bg-info-subtle border border-info rounded my-5'>
        <h3 className='text-dark fst-italic text-center'>To Do List</h3>
        <hr/>
         <div className='container bg-info-subtle my-5 '>
            <h3 className='text-center text-muted fst-italic'>Your Tasks</h3>
            <div>
            <button onClick={()=>this.createItem()} className='btn btn-primary'>Add task</button>
           </div>
            {this.renderTabList()}
            <ul className='list-group list-group-flush '>
              {this.renderItems()}
            </ul>
          </div>  
          <footer>
          <div className='bg-info-subtle my-5'>
            <hr/>
            <div className='container'>
            <div className='row '>
                <div className='col-4'>
                    <h5>Contact us</h5>
                    <p>Toll free - 1800 234 5678</p>
                    <h6>Email-feedback@trading.site</h6>
                    <h5>Connect with us</h5>
                    <a className='mx-2' href='www.facebook.com'><img src='./images/facebook.svg' alt='facebook'/></a>
                    <a className='mx-2' href='#'><img src='./images/instagram.svg' alt='instagram'/></a>
                    <a className='mx-2' href='#'><img src='./images/twitter.svg' alt='twitter'/></a>
                    <a className='mx-2' href='#'><img src='./images/youtube.svg' alt='youtube'/></a> 
                    
                </div>
                <div className='col-4'>
                    <h5>Company</h5>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>About us</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Careers</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Policy</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Terms & Conditions</a><br/>
                    
                </div>
                <div className='col-4'>
                    <h5>Links</h5>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Go to home</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Add your Item</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Edit your Item</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Delete your Item</a>
                </div>
                
            </div>
        </div>
        </div></footer> 
        {this.state.modal ? (
          <Modal activeItem = {this.state.activeItem} toggle ={this.toggle} onSave ={this.handleSubmit}/>
          ):null
        }       
       </div>     
      
    )
  }
}



export default App;

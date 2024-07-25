import React, { Component } from 'react';

import{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from 'reactstrap';

class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem : this.props.activeItem 
        };
    }
// to check checkbox is checked or not
    handleChange = e =>{
        let {name,value}=e.target;
        if(e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = {...this.state.activeItem,[name]:value};
        this.setState({activeItem})
    };


    render(){
        const { toggle, onSave} = this.props;
        return(
            <Modal isOpen = {true} toggle = {toggle}>
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>
                <ModalBody>
                    <div className='container bg-info my-5 rounded border border-info '>
                      <h1 className='text-center text-white fst-italic'>To do list</h1>
                      <div className='row bg-info-subtle '>
                         <div className='col-6'>
                         <Form>
                             <FormGroup>
                                 <div class="input-group  my-4">
                                    <span class="input-group-text bg-info bg-gradient text-light" id="inputGroup-sizing-default">Title</span>
                                     <Input type="text"  id='title' name='title' onChange ={this.handleChange} value={this.state.activeItem.title} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                  </div>
                             </FormGroup>
                             <FormGroup>
                                  <div class="input-group  my-4">
                                     <span class="input-group-text bg-info bg-gradient text-light" id="inputGroup-sizing-default">Description</span>
                                      <Input type="text" name='description' class="form-control" onChange={this.handleChange} value={this.state.activeItem.description} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                   </div>
                             </FormGroup>
                             <FormGroup>
                                  <Label for = "completed">
                                      <Input type='checkbox' 
                                     className='mx-3 border border-primary ' id='completed' checked={this.state.activeItem.completed} onChange={this.handleChange} name='completed'/>Completed
                                  </Label>
                              </FormGroup>
                           </Form>
                           <p className='my-5 fst-italic text-secondary'>--Set your Goals--</p>
                          </div>
                     <div className='col-6  text-end'>
                         <img style={{height:200,width:200}} className='my-2 ' alt = 'todo' src = "./images/do-list.webp"></img>
                     </div>
                 </div>
             </div>  
                    
                </ModalBody>
                <ModalFooter>
                  <div>
                     <Button type="button" onClick={()=>onSave(this.state.activeItem)} style={{marginRight:25}}className="btn btn-info text-light ">Add Task</Button>
                    </div >
                </ModalFooter>
            </Modal>
        )
    }
}

export default CustomModal;
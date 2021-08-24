import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:3001/api/operations/";

class App extends Component {
state={
  data:[],
  addItem: false,
  deleteModal: false,
  form:{
    id: '',
    concept: '',
    amount: '',
    date: '',
    category: '',
    type: ''
  }
}

getItems=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

postItems=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.addItem();
    this.getItems();
  }).catch(error=>{
    console.log(error.message);
  })
}

putItems=()=>{
  axios.put(url+this.state.form.id, this.state.form).then(response=>{
    this.addItem();
    this.getItems();
  })
}

deleteItems=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({deleteModal: false});
    this.getItems();
  })
}

addItem=()=>{
  this.setState({addItem: !this.state.addItem});
}

selectItem=(item)=>{
  this.setState({
    tipoModal: 'update',
    form: {
      id: item.id,
      concept: item.concept,
      amount: item.amount,
      type: item.type
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.getItems();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.addItem()}}>Add item</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Concept</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(item=>{
          return(
            <tr>
          <td>{item.concept}</td>
          <td>{item.amount}</td>
          <td>{item.date}</td>
          <td>{item.category}</td>
          <td>{item.type}</td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.addItem}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.addItem()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="concept">Concept</label>
                    <input className="form-control" type="text" name="concept" id="concept" onChange={this.handleChange} value={form?form.concept: ''}/>
                    <br />
                    <label htmlFor="amount">Amount</label>
                    <input className="form-control" type="text" name="amount" id="amount" onChange={this.handleChange} value={form?form.amount: ''}/>
                    <br />
                    <label htmlFor="category">Category</label>
                    <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange} value={form?form.category: ''}/>
                    <br />
                    <label htmlFor="type">Type</label>
                    <input className="form-control" type="text" name="type" id="type" onChange={this.handleChange} value={form?form.type:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insert'?
                    <button className="btn btn-success" onClick={()=>this.postItems()}>
                    Add
                  </button>: <button className="btn btn-primary" onClick={()=>this.putItems()}>
                    Update
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.addItem()}>Cancel</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.deleteModal}>
            <ModalBody>
               Are you sure to delete this item {form && form.concept} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.deleteItems()}>Yes</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({deleteModal: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
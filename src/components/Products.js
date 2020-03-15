import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddProModal } from './AddProModal';
import {EditProModal} from './EditProModal';


export class Products extends Component{
   
    constructor(props) {
        super(props);
        this.state = { pros: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }
    
    refreshList() {

        fetch('https://localhost:44376/api/Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ pros: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deletePro(proId)
    {
        if(window.confirm("Are you sure?"))
        {
            fetch('https://localhost:44376/api/Product/'+proId,{
                method :'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    render(){
        const { pros, proId, proName, proPrice } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return(
            <div>


                    <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Product</Button>

                    <AddProModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                    </ButtonToolbar>
  
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pros.map(pro =>
                            <tr key={pro.ProductId}> 
                                <td>{pro.ProductId}</td>
                                <td>{pro.Name}</td>
                                <td>{pro.Price}</td>
                                <td>

                                  <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => {
                                                return this.setState({ editModalShow: true, proId: pro.ProductId, proName: pro.Name, proPrice: pro.Price });
                                            }}
                                        >
                                            Edit
                                            </Button>

                                        <EditProModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            proId={proId}
                                            proName={proName}
                                            proPrice={proPrice}
                                        />

                                    </ButtonToolbar>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className ="mr-2"
                                            onClick ={()=> this.deletePro(pro.ProductId)}  variant ="danger"
                                            >Delete</Button>

                                        <EditProModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            proId={proId}
                                            proName={proName}
                                            proPrice={proPrice}
                                        />
                                    </ButtonToolbar>

                        </td>
                            </tr>
                        )}
                    </tbody>
                </Table>


               
            </div>
        )
    }
}
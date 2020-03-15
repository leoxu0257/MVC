import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddCusModal } from './AddCusModal';
import {EditCusModal} from './EditCusModal';

export class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = { cus: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {

        fetch('https://localhost:44376/api/Customer')
            .then(response => response.json())
            .then(data => {
                this.setState({ cus: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteCus(cusId)
    {
        if(window.confirm("Are you sure?"))
        {
            fetch('https://localhost:44376/api/Customer/'+cusId,{
                method :'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }


    render() {

        const { cus, cuId, cuName, cuAddress } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            // <div className="mt-5 d-flex jutify-content-left">
            //     <h3>This is Customers page.</h3>
            // </div>
            <div>


                    <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Customer</Button>

                    <AddCusModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                    </ButtonToolbar>
  
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CustomerId</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cus.map(cu =>
                            <tr key={cu.CustomerId}> 
                                <td>{cu.CustomerId}</td>
                                <td>{cu.Name}</td>
                                <td>{cu.Address}</td>
                                <td>

                                  <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => {
                                                return this.setState({ editModalShow: true, cuId: cu.CustomerId, cuName: cu.Name, cuAddress: cu.Address });
                                            }}
                                        >
                                            Edit
                                            </Button>
                                            
                                        <EditCusModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            cuId={cuId}
                                            cuName={cuName}
                                            cuAddress={cuAddress}
                                        />

                                    </ButtonToolbar>
                                </td>
                                
                                <td>
                        <ButtonToolbar>
                        <Button className ="mr-2"
                                            onClick ={()=> this.deleteCus(cu.CustomerId)}  variant ="danger"
                                            >Delete</Button>


                                <EditCusModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    cuId={cuId}
                                    cuName={cuName}
                                    cuAddress={cuAddress}
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
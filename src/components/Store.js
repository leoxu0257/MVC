import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import {AddStoModal} from './AddStoModal';
import {EditStoModal} from './EditStoModal';


export class Store extends Component{

    constructor(props) {
        super(props);
        this.state = { stos: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }
    
    refreshList() {

        fetch('https://localhost:44376/api/Store')
            .then(response => response.json())
            .then(data => {
                this.setState({ stos: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteCus(stoId)
    {
        if(window.confirm("Are you sure?"))
        {
            fetch('https://localhost:44376/api/Store/'+stoId,{
                method :'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){ 
            const { stos, stoId, stoName, stoAddress } = this.state;
            let addModalClose = () => this.setState({ addModalShow: false });
            let editModalClose = () => this.setState({ editModalShow: false });
        return(
            <div>


            <ButtonToolbar>
            <Button
                variant='primary'
                onClick={() => this.setState({ addModalShow: true })}
            >Add Store</Button>

            <AddStoModal
                show={this.state.addModalShow}
                onHide={addModalClose}
            />
            </ButtonToolbar>

        <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>StoreId</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {stos.map(sto =>
                    <tr key={sto.StoreId}> 
                        <td>{sto.StoreId}</td>
                        <td>{sto.Name}</td>
                        <td>{sto.Address}</td>
                        <td>

                          <ButtonToolbar>
                                <Button
                                    className="mr-2" variant="info"
                                    onClick={() => {
                                        return this.setState({ editModalShow: true, stoId: sto.StoreId, stoName: sto.Name, stoAddress: sto.Address });
                                    }}
                                >Edit
                                    </Button>

                                    
                                <EditStoModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    stoId={stoId}
                                    stoName={stoName}
                                    stoAddress={stoAddress}
                                />

                            </ButtonToolbar>
                        </td>
                        <td>
                        <ButtonToolbar>
                        <Button className ="mr-2"
                                    onClick ={()=> this.deleteCus(sto.StoreId)}  variant ="danger"
                                    >Delete</Button>

                                <EditStoModal
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    stoId={stoId}
                                    stoName={stoName}
                                    stoAddress={stoAddress}
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
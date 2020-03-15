import React,{Component} from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSaleModal } from './AddSaleModal';
import {EditSaleModal} from './EditSaleModal';

export class Sales extends Component{

    constructor(props) {
        super(props);
        this.state = { sales: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {

        fetch('https://localhost:44376/api/Sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
            }
            );
    }


    componentDidUpdate() {
        this.refreshList();
    }


    deleteCus(saleId)
    {
        if(window.confirm("Are you sure?"))
        {
            fetch('https://localhost:44376/api/Sales/'+saleId,{
                method :'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){

        const { sales, saleId, saleDS, saleStoId, saleCusId, saleProId } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });    
        
        return(
            <div>


                    <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Sales</Button>

                    <AddSaleModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                    </ButtonToolbar>
  
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DateSold</th>
                            <th>StoreId</th>
                            <th>CustomerId</th>
                            <th>ProductId</th>
                            <th>Action</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale =>
                            <tr key={sale.ID}> 
                                <td>{sale.ID}</td>
                                <td>{sale.DateSold}</td>
                                <td>{sale.StoreId}</td>
                                <td>{sale.CustomerId}</td>
                                <td>{sale.ProductId}</td>
                              <td>
                                <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => {
                                                return this.setState({ editModalShow: true, saleId: sale.ID, saleDS: sale.DateSold, saleStoId: sale.StoreId ,saleCusId: sale.CustomerId,saleProId: sale.ProductId});
                                            }}
                                        >
                                            Edit
                                            </Button>

                                        <EditSaleModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            saleId={saleId}
                                            saleDS={saleDS}
                                            saleStoId={saleStoId}
                                            saleCusId={saleCusId}
                                            saleProId={saleProId}
                                        />

                                    </ButtonToolbar>
                                </td>

                                <td>
                                <ButtonToolbar>
                                <Button className ="mr-2"
                                            onClick ={()=> this.deleteCus(sale.ID)}  variant ="danger"
                                            >Delete</Button>

                                        <EditSaleModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            saleId={saleId}
                                            saleDS={saleDS}
                                            saleStoId={saleStoId}
                                            saleCusId={saleCusId}
                                            saleProId={saleProId}
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
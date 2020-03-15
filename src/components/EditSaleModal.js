import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditSaleModal extends Component {
    constructor(props) {
      super(props);
      this.state = { snackbaropen: false, snackbarmsg: '' };//snackbarmsg = snackbar message
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
      };
    
    handleSubmit(event) {
        event.preventDefault();

        // alert(event.target.Name.value); //打印出来
        // alert(event.target.Address.value);

        fetch('https://localhost:44376/api/Sales', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ID: event.target.ID.value,
            DateSold: event.target.DateSold.value
            , StoreId: event.target.StoreId.value
            , CustomerId: event.target.CustomerId.value
            , ProductId: event.target.ProductId.value
        })
        })
        .then(res => res.json())
        .then((result) => {
            //console.log((result));
            //alert(result);
            this.setState({ snackbaropen: true, snackbarmsg: result })
        },
            (error) => {
            //alert('Failed')
            this.setState({ snackbaropen: true, snackbarmsg: "Failed" })
            }
        )
    }

    render() {
        return (
          <div className="container">
            <Snackbar
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.snackbarClose}
              message={<span id="message-id">{this.state.snackbarmsg}</span>}
              action={[
                <IconButton
                  key="close"
                  arial-label="Close"
                  coloe="inherit"
                  onClick={this.snackbarClose}
                >
                  x
                </IconButton>
              ]}
    
    
            ></Snackbar>
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
    
                  Edit Sale
        
            </Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="ID">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="ID"
                          disabled
                          defaultValue={this.props.saleId}
                          placeholder="ID"
                        />
                      </Form.Group>

                      <Form.Group controlId="DateSold">
                        <Form.Label>DateSold</Form.Label>
                        <Form.Control
                          type="date"
                          name="DateSold"
                          required
                          defaultValue={this.props.saleDS}
                          placeholder="DateSold"
                        />
                      </Form.Group>
    
                      <Form.Group controlId="StoreId">
                        <Form.Label>StoreId</Form.Label>
                        <Form.Control
                          type="text"
                          name="StoreId"
                          required
                          defaultValue={this.props.saleStoId}
                          placeholder="StoreId"
                        />
                      </Form.Group>

                      <Form.Group controlId="CustomerId">
                        <Form.Label>CustomerId</Form.Label>
                        <Form.Control
                          type="text"
                          name="CustomerId"
                          required
                          defaultValue={this.props.saleCusId}
                          placeholder="CustomerId"
                        />
                      </Form.Group>

                      <Form.Group controlId="ProductId">
                        <Form.Label>ProductId</Form.Label>
                        <Form.Control
                          type="text"
                          name="ProductId"
                          required
                          defaultValue={this.props.saleProId}
                          placeholder="ProductId"
                        />
                      </Form.Group>
    
                      <Form.Group>
                        <Button variant="primary" type="submit">
                          Update Sales
                          </Button>
                      </Form.Group>
                    </Form>
    
    
                  </Col>
                </Row>
    
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}> Cancel </Button>
    
              </Modal.Footer>
            </Modal>
          </div>
    
        );
      }



}

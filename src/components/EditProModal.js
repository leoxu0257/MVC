import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditProModal extends Component {
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

        fetch('https://localhost:44376/api/Product', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ProductId: event.target.ProductId.value,
            Name: event.target.Name.value
            , Price: event.target.Price.value
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
    
                  Add Product
        
            </Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="ProductId">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="ProductId"
                          disabled
                          defaultValue={this.props.proId}
                          placeholder="ProductId"
                        />
                      </Form.Group>

                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="Name"
                          required
                          defaultValue={this.props.proName}
                          placeholder="Name"
                        />
                      </Form.Group>
    
                      <Form.Group controlId="Price">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="Price"
                          required
                          defaultValue={this.props.proPrice}
                          placeholder="Price"
                        />
                      </Form.Group>
    
                      <Form.Group>
                        <Button variant="primary" type="submit">
                          Update Product
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
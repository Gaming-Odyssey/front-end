import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

class GameFormUpdate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.game._id,
      title: this.props.game.title,
      releaseDate: this.props.game.releaseDate,
      note: this.props.game.note,
      email: this.props.auth0.user.email,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.handleClose();
  }

  handleNote = (e) => {
    e.preventDefault();
    this.setState({
      note: e.target.value
    })
  }


  render() {
    return(
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label><h2>Update a Game Note</h2></Form.Label>
          <Form.Group controlId="note">
            <Form.Control type='text' onChange={this.handleNote} value={this.state.note}/>
          </Form.Group>
          <Button type='submit'>Update</Button>
        </Form>
      </Container>
    )
  }
}

export default withAuth0(GameFormUpdate);

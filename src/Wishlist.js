import './Wishlist.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import GameFormUpdate from './GameFormUpdate.js'

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: this.props.wishlist,
      showModal: false,
      selectedGame: null,
    }
  };

  componentDidMount = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    console.log(getIdTokenClaims);
    
    let tokenClaims = await getIdTokenClaims();
    
    const jwt = tokenClaims.__raw;
    
    const config = {
      headers: { authorization: `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email },
    };
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleShow = (game) => {
    this.setState({
      showModal: true,
      selectedGame: game,
    })
  }

  handleUpdate = async (game) => {
    await axios.put(`http://localhost:3001/gamelist/${game._id}`, game);
    const updateWishList = this.state.wishlist.map(stateGame => {
      if(stateGame._id === game._id) {
        return game
      }
      else {
        return stateGame;
      }
    });
    this.setState({wishlist: updateWishList})
  }

  render() {    
    let wishlistToRender = this.state.wishlist.map((game, idx) => {
      return <Card key={game._id}>
        <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
          <div className="wishlistUpdDelButtons">
            <h4>{game.title}</h4>
            <Button variant="link" size="sm" onClick={() => this.props.handleDelete(game._id)}>Remove</Button>
          </div>
          {game.releaseDate}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${idx}`}>
          <Card.Body>
            <Card.Title>My notes</Card.Title>
            <Card.Text>{game.note}</Card.Text>
            <Button variant="info" onClick={() => this.handleShow(game)}>Update note</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    })

    return (
      <Container>
        <h1>Take a look at upcoming Gaming Odysseys</h1>
        <Accordion>
          {wishlistToRender}
        </Accordion>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {
              this.state.selectedGame ?
              <GameFormUpdate handleClose={this.handleClose} game={this.state.selectedGame} handleUpdate={this.handleUpdate} />
              : ''
            }
          </Modal.Body>
        </Modal>
      </Container>
    )
  }

}

export default withAuth0(Wishlist);

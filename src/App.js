import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container,
  Col,
  Row,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Nav,
  NavLink } from 'reactstrap';
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faHeart} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    var movieList = [];
    for (var i = 0; i < 8; i++) {
      movieList.push(<Moviz/>)
    }
    return (
      <Container>
        <Header/>
        <Row>
          {movieList}
        </Row>
      </Container>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <Nav style={styles.nav}>
        <img src='logo.png' alt="logo"/>
        <NavLink style={styles.navlink}>
          Last Releases
        </NavLink>
        <NavLink style={styles.navlink}>
          My Movies
        </NavLink>
        <NavLink style={styles.navlink}>
          11 Films
        </NavLink>
      </Nav>
    );
  }
}

class Moviz extends Component {
  render() {
    return (
      <Col xs='12' sm='6' lg='3' style={styles.card}>
        <Card>
          <CardImg top width="100%" src="thumb.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Maléfique</CardTitle>
            <CardText>Some quick example text to build on the card title and
              make up the bulk of the card's content.</CardText>
          </CardBody>
          <FontAwesomeIcon icon={faHeart} style={styles.heart}/>
        </Card>
      </Col>
    );
  }
}

var styles = {
  card: {
    marginBottom: 15
  },
  nav: {
    marginTop: 15,
    marginBottom: 50
  },
  navlink: {
    color: 'white'
  },
  heart: {
    color: 'white',
    position: 'absolute',
    top: '3%',
    right: '5%',
    height: 'auto',
    width: 20
  }
}

export default App;

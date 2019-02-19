import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container,
  Col,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Nav,
  NavLink,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
  } from 'reactstrap';
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faHeart} from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    popoverOpen: false,
    viewOnlyLike: false
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleClickLikeOn = () => {
    this.setState({
      viewOnlyLike: true
    });
  }

  handleClickLikeOff = () => {
    this.setState({
      viewOnlyLike: false
    });
  }

  render() {

    const moviesData = [
      {
        name: 'L\'Odyssée de Pi',
        desc: 'Après que leur bateau est victime d\'une violente tempête et coule au fond du Pacifique, un adolescent et un tigre du Bengale...',
        img: '/pi.jpg'
      },
      {
        name: "Maléfique",
        desc: "Poussée par la vengeance et une volonté farouche de protéger les terres qu'elle préside, Maléfique place ...",
        img: '/malefique.jpg'
      },
      {
        name: "Les Aventures de Tintin",
        desc: "Parce qu'il achète la maquette d'un bateau appelé la Licorne, Tintin, un jeune reporter, se retrouve entraîné dans une fantastique aventure...",
        img: '/tintin.jpg'
      },
      {
        name: 'L\'Odyssée de Pi',
        desc: 'Après que leur bateau est victime d\'une violente tempête et coule au fond du Pacifique, un adolescent et un tigre du Bengale...',
        img: '/pi.jpg'
      },
      {
        name: "Maléfique",
        desc: "Poussée par la vengeance et une volonté farouche de protéger les terres qu'elle préside, Maléfique place ...",
        img: '/malefique.jpg'
      },
      {
        name: "Les Aventures de Tintin",
        desc: "Parce qu'il achète la maquette d'un bateau appelé la Licorne, Tintin, un jeune reporter, se retrouve entraîné dans une fantastique aventure...",
        img: '/tintin.jpg'
      }
    ]

    let movieList = moviesData.map((movie , i) => {
      return <Moviz key={i} movieName={movie.name} movieDesc={movie.desc}
        movieImg={movie.img} displayOnlyLike={this.state.viewOnlyLike}/>
    });

    let moviesNameList = moviesData.map((movie) => {
      return movie.name
    });

    let moviesLast = moviesNameList.slice(-3);
    let moviesCount = moviesNameList.length;

    if (moviesCount === 0) {
      moviesLast = 'aucun films sélectionnés';
    } else if (moviesCount > 3 ) {
      moviesLast = moviesLast.join( ', ') + '...';
    } else {
      moviesLast = moviesLast.join( ', ') + '.';
    }

    return (
      <Container>
        <Nav style={styles.nav}>
          <img src='logo.png' alt="logo"/>
          <NavLink style={styles.navlink} onClick={this.handleClickLikeOff}>
            Last Releases
          </NavLink>
          <NavLink style={styles.navlink} onClick={this.handleClickLikeOn}>
            My Movies
          </NavLink>
          <Button id="Popover1" type="button">
            {moviesCount} {moviesCount > 1 ? 'films' : 'film'}
          </Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverHeader>Derniers films ajoutés</PopoverHeader>
            <PopoverBody>{moviesLast}</PopoverBody>
          </Popover>
        </Nav>
        <Row>
          {movieList}
        </Row>
      </Container>
    );
  }
}

class Moviz extends Component {

  state = {
    like: false
  };

  handleClick = () => {
    let isLike = !this.state.like
    this.setState({
      like : isLike
    });
  }

  render() {
    console.log(this.state.like)
    if (this.state.like) {
      styles.heart.color = '#FF5B53';
    } else {
      styles.heart.color = 'white';
    }

    let isDisplay = {
      marginBottom: 15
    }

    if (!this.state.like && this.props.displayOnlyLike) {
      isDisplay.display = 'none';
    }


    return (
      <Col xs='12' sm='6' lg='3' style={isDisplay}>
        <Card>
          <CardImg top width="100%" src={this.props.movieImg} alt="Card image cap" />
          <CardBody style={styles.cardbody}>
            <CardTitle>{this.props.movieName}</CardTitle>
            <CardText>{this.props.movieDesc}</CardText>
          </CardBody>
          <FontAwesomeIcon icon={faHeart} style={styles.heart} onClick={this.handleClick}/>
        </Card>
      </Col>
    );
  }
}

const styles = {
  colcard: {
    marginBottom: 15
  },
  cardbody: {
    height: 210
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

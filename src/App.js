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
    viewOnlyLike: false,
    movieCount: 0,
    movieNameList: [],
    movies: [],
    moviesLiked: []
  };

  componentDidMount(){
    let ctx = this;
        fetch('http://localhost:3001/movies')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState({
        movies: data.body.results
      });
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });


        fetch('http://localhost:3001/mymovies')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      let MovieNameListAlready = [];
      for (let i = 0; i < data.movies.length; i++) {
        MovieNameListAlready.push(data.movies[i].title)
        console.log(MovieNameListAlready)
      }
      console.log(MovieNameListAlready)
      ctx.setState({
        moviesLiked: data.movies,
        movieCount: data.movies.length,
        movieNameList : MovieNameListAlready
      });
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleClick = (isLike, name) => {
    let movieNameListCopy = [...this.state.movieNameList]
    if (isLike) {
      movieNameListCopy.push(name);
      this.setState({
        movieCount : this.state.movieCount + 1,
        movieNameList : movieNameListCopy
      })
    } else {
      let index = movieNameListCopy.indexOf(name);
      movieNameListCopy.splice(index, 1);
      this.setState({
        movieCount : this.state.movieCount - 1,
        movieNameList : movieNameListCopy
      })

    }
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

    let movieList = this.state.movies.map((movie , i) => {
      let isLiked = false;
      for (var j = 0; j < this.state.moviesLiked.length; j++) {
        if (this.state.moviesLiked[j].idMovieDB === movie.id){
          isLiked = true;
          break;
        }
      }
      return <Moviz key={i} movieName={movie.title} movieDesc={movie.overview}
        movieImg={movie.poster_path} movieId={movie.id}
        displayOnlyLike={this.state.viewOnlyLike} handleClickParent={this.handleClick}
        isLike={isLiked} />
    });

    let moviesNameList = this.state.movieNameList

    let moviesLast = moviesNameList.slice(-3);
    let moviesCount = this.state.movieCount;

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
    like: this.props.isLike
  };

  handleClick = () => {
    let isLike = !this.state.like
    this.setState({
      like : isLike
    });
    this.props.handleClickParent(isLike, this.props.movieName)
    if (isLike) {
      fetch('http://localhost:3001/mymovies', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'title='+this.props.movieName+'&overview='+this.props.movieDesc+'&poster_path='+this.props.movieImg+'&idMovieDB='+this.props.movieId
      });
    } else {
      fetch('http://localhost:3001/mymovies/'+this.props.movieId, {
        method: 'DELETE'
      });
    }

  }

  render() {
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
          <CardImg top width="100%" src={"https://image.tmdb.org/t/p/w500"+this.props.movieImg} alt="Card image cap" />
          <CardBody style={styles.cardbody}>
            <CardTitle style={styles.cardmovietitle}>{this.props.movieName}</CardTitle>
            <CardText>{this.props.movieDesc.slice(0,125)}...</CardText>
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
  cardmovietitle: {
    fontWeight: 'bold'
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

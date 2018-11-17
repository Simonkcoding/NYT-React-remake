import React, { Component } from 'react';
import API from "./utils/API";
import {
  //for article and savedlist
  ListGroup,
  ListGroupItem,
  //for search
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// import {CSSTransition, TransitionGroup} from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


class App extends Component {
  state = {
    //search states
    searchTitle: "",
    beginDate: "",
    endDate: "",
    //display article
    articles: [],
    //display saved articles
    savedArticles: []
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.searchTitle)
    if (this.state.searchTitle) {
      API.searchArticles({
        searchTitle: this.state.searchTitle,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate
      })
        .then(res => {
          this.setState({ articles: res.data.response.docs })
          console.log(this.state.articles)
        })
        .catch(err => console.log(err));

    }
  }

  // Loads all books  and sets them to this.state.books
  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data})
      )
      .catch(err => console.log(err));
  };

  handleSave = savedArticle => {
    API.saveArticle(savedArticle)
      .then(res => { 
        console.log(savedArticle)
        this.loadSavedArticles() 
      })
      .catch(err => console.log(err));
  }

componentDidMount(){
  this.loadSavedArticles() 
}

deleteSaved = (id) => {
  API.deleteSavedArticle(id)
  .then(res => { 
    console.log(id)
    this.loadSavedArticles() 
  })
  .catch(err => console.log(err));
}


  render() {
    return (
      <div className="App">
        {/* Search */}
        <Card>
          <CardHeader>Search your NYT Article</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <Label>Keywords:</Label>
                <Input
                  type="text"
                  name="searchTitle"
                  onChange={this.handleOnChange}
                />
                <Label>Begin Date:</Label>
                <Input
                  type="Date"
                  name="beginDate"
                  onChange={this.handleOnChange}
                />
                <Label>End Date:</Label>
                <Input
                  type="Date"
                  name="endDate"
                  onChange={this.handleOnChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >Search
              </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        {/* Display Articles */}
        <Card>
          <CardHeader>Results</CardHeader>
          <CardBody>
            <ListGroup>
              {this.state.articles.map(article => (
                <ListGroupItem
                  key={article.headline.print_headline}>
                  <Button className="save-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      let savedArticle = {
                        title: article.headline.print_headline,
                        url: article.web_url,
                        date: article.pub_date
                      }
                      this.handleSave(savedArticle)
                    }}
                  >Save
                  </Button>
                  <strong>
                    {article.headline.print_headline}
                  </strong>
                  <br />
                  Snippet: <br />
                  {article.snippet}
                  <br />
                  Url: <br />
                  <a href={article.web_url}>
                    {article.web_url}</a>
                  <br />
                  Date: <br />
                  {article.pub_date}
                </ListGroupItem>
              ))}
          </ListGroup>
          </CardBody>
        </Card>
        {/* saved article */}
        <Card>
          <CardHeader>Saved Articles</CardHeader>
          <CardBody>
            <ListGroup>
              {this.state.savedArticles.map(article => (
                <ListGroupItem  key={article._id}>
                  <Button className="delete-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.deleteSaved(article._id)}
                  >Delete
                </Button>
               
                  {article.title}<br/>
                  URL: <br/>
                  {article.url}
              </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default App;

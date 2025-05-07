import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import './News.css';

// we use this to take take the first 20 words of the text and add "..." at the end.
const TruncatedParagraph = ({ text }) => {
  const getFirstWords = (str, numWords) => {
    return str.split(' ').slice(0, numWords).join(' ') + '...';
  };

  return (
    <span>{getFirstWords(text, 20)}</span>
  );
};
const TruncatedHeadline = ({ text }) => {
  const getFirstWords = (str, numWords) => {
    return str.split(' ').slice(0, numWords).join(' ') + '...';
  };

  return (
    <span>{getFirstWords(text, 8)}</span>
  );
};

const News = () => {
  const [search, setSearch] = useState("Health Care");
  const [newsData, setNewsData] = useState([]);
  const API_KEY = "62fd94c5302d48ca88bd6961b255a23c"; //API key for newsapi.org

  const getData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    console.log(jsonData.articles);
    setNewsData(jsonData.articles);
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      <Container>
        <div className="d-flex pt-4 pb-3 w-100 justify-content-end">
          <h3
            style={{
              marginRight: "auto",
              background: "linear-gradient(45deg, #7878ff4f, #ffffff00)",
            }}
            className="p-2 w-50 mb-0"
          >
            Stay Updated With TrendyNews
          </h3>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleInput}
            />
            <Button variant="outline-success" onClick={getData}>
              Search
            </Button>
          </Form>
        </div>

        <CardNews news={newsData} />
      </Container>
    </>
  );
};

const CardNews = ({ news }) => {
  return (
    <>
      <Row>
        {news.map((curItem, index) => {
          if (!curItem.urlToImage)
            {
                return null;
            }
          else {
            return(

            <Col key={index} className="gx-5 gy-4" md={4}>
              <Card
                className="news-card-placeholder"
                style={{ minHeight: "430px" }}
              >
                <div className="pt-3 pe-3 ps-3">

                <Card.Img
                  style={{ maxHeight: "200px" }}
                  variant="top"
                  src={curItem.urlToImage}
                  />
                  </div>
                <Card.Body>
                  <Card.Title><TruncatedHeadline text={curItem.title}/></Card.Title>
                  <Card.Text><TruncatedParagraph text={curItem.description}/></Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => window.open(curItem.url)}
                    className="position-absolute bottom-0 mb-2"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            )
          }
})}
      </Row>
    </>
  );
};

export default News;

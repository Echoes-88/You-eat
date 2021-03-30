import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import DOMPurify from 'dompurify'

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading restaurants";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.restaurants && data.restaurants.length) {
    //searchQuery
    const searchQuery = data.restaurants.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );

    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${res.image.url}`}
                />
                <CardBody>
                  <h2>{res.name}</h2>
                  <CardText dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(res.description)}}></CardText>
                </CardBody> 
                <div className="card-footer">
                  <Link
                    as={`/restaurants/${res.id}`}
                    href={`/restaurants?id=${res.id}`}
                  >
                    <a className="btn">Carte du restaurant</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
              .btn {
                background-color:#69C014;
                border: white solid 1px;
                color: white;
              }
              .btn:hover {
                background-color:#559e0d;
                border: white solid 1px;
              }
              .btn:focus {
                background-color:#559e0d;
                border: white solid 1px;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

import DOMPurify from 'dompurify'

import Cart from "../../components/cart";
import AppContext from "../../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Restaurants() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant) {
    const { restaurant } = data;
    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          <Col>
            <div>
              <Cart />
            </div>
          </Col>
          {restaurant.dishes.map((res) => (
            <Col xs="6" sm="3" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  src={`${res.image.url}`} 
                />
                <CardBody>
                  <h2>{res.name}</h2>
                  <CardText dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(res.description)}}></CardText>
                </CardBody>
                <div className="card-footer">
                  <button
                    className="btn"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Ajouter à la commande
                  </button>

                  <style jsx>
                    {`
                      h2 {
                        font-size:1.5em;
                      }
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline {
                        color: #69C014 !important;
                      }
                      a:hover {
                        color: white !important;
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
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}
export default Restaurants;
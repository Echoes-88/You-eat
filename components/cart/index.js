import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";

import AppContext from "../../context/AppContext";

function Cart() {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const { cart, isAuthenticated } = appContext;

  return (
    <div>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <h4 style={{ margin: 10 }}>Votre commande :</h4>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            {/* <small>Items:</small> */}
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp; {item.price}€</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                        <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 10,
                            }}
                            onClick={() => appContext.removeItem(item)}
                            color="link"
                          >
                            -
                          </Button>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            onClick={() => appContext.addItem(item)}
                            color="link"
                          >
                            +
                          </Button>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                            quantité : {item.quantity}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                    <h3>{appContext.cart.total.toFixed(2)}€</h3>
                  </Badge>
                  {router.pathname != "/checkout" && (
                  <Link
                    as={`/checkout`}
                    href={`/checkout`}
                  >
                    <a className="btn btn-primary">Finaliser la commande</a>
                  </Link>
                  )}
                  {router.pathname === "/restaurants" && (
                    <div
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Link href="/checkout">
                        <Button style={{ width: "100%" }} color="primary">
                          <a>Commande</a>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {router.pathname === "/checkout" && (
                    <small
                      style={{ color: "blue" }}
                      onClick={() => window.history.back()}
                    >
                      Revenir au restaurant
                    </small>
                  )}
                </>
              )
            ) : (
              <>
              <Link href={{
                pathname: '/login',
                query: { urlOrigin: window.location.href },
              }}>
                <button className="btn">
                  <a>Connection</a>
                </button>
              </Link>
              <Link href="/register">
                <button className="btn">
                  <a>Créer un compte</a>
                </button>
              </Link>
              </>
            )}
          </div>
          {console.log(router.pathname)}
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        .btn {
          margin-bottom:0.4rem;
          background-color:#4b4b4b;
          border: white solid 1px;
          color: white;
        }
        .btn:hover {
          background-color:#242424;
          border: white solid 1px;
        }
      `}</style>
    </div>
  );
}
export default Cart;

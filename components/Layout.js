import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";

const Layout = (props) => {
  const title = "Welcome to Nextjs";
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
            .nav-link {
              color:black;
            }
            .nav-logo {
              height:2.5rem;
              cursor:pointer;
            }
          `}
        </style>
        <Nav className="navbar navbar-light bg-light">
          <NavItem>
            <Link href="/">
            <img className="nav-logo" src="https://res.cloudinary.com/echoes88/image/upload/v1616361486/logo_big_0ffffac8a4.png" />
            </Link>
          </NavItem>

          <NavItem className="ml-auto">
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Créer un compte</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Déconnexion
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Se connecter</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;

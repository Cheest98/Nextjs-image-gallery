"use client";

import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap";
import {usePathname} from "next/navigation"

export default function NavBar(){
    const pathname= usePathname();


    return(
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container> 
                <Navbar.Brand  as={Link} href="/"> 
                        NextJS 13.4 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/hello" active={pathname === "/static"}>Static</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "wouter";

export default function NavBar() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <img src="/favicon.png" className="mr-3 h-6 sm:h-9" alt="Socios Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          JPSeguros
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Inicio
        </NavbarLink>
        <NavbarLink as={Link} href="/socios">
          Socios
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

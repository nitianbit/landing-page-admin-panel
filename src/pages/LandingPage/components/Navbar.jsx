import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
const NavbarComponent = () => {
  return (
    <Navbar fluid rounded className='ml-10 mr-10'>
      <NavbarBrand href="">
        <img src="https://i.ibb.co/3c47Ccs/Screenshot-2024-06-25-at-9-34-14-AM.png" className="mr-3 h-16 sm:h-20" alt="Flowbite React Logo" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink className='text-xl font-bold' href="#">
          Home
        </NavbarLink>
        <NavbarLink className='text-xl font-bold' href="#">
          About
        </NavbarLink>
        <NavbarLink className='text-xl font-bold' href="#">Services</NavbarLink>
        <NavbarLink className='text-xl font-bold' href="#">Pricing</NavbarLink>
        <NavbarLink className='text-xl font-bold' href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default NavbarComponent
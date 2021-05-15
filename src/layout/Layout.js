import NavBar from '../ui/Nav'
const Layout = (props) => {
    return ( 
        <>
            <NavBar />
            {props.children}
        </>
     );
}
 
export default Layout;
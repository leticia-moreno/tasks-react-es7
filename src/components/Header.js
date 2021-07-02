import Button from './button'
const Header = ({title, onAdd, showForm}) =>{
    return(
        <header className='header'>
            <h1 /*style={{color: 'red', backgroundColor: 'black'}}*/>{title}</h1>
        <Button color={showForm ? 'red' : 'green'} text={showForm ? 'Close' : 'Add'} onClick = {onAdd}/>
        </header>
    )  
}
export default Header
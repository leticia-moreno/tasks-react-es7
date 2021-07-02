const Button = (props) =>{
    return(
        <button style={{backgroundColor:props.color}} className='btn' onClick={props.onClick}>{props.text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'default text'
}
export default Button
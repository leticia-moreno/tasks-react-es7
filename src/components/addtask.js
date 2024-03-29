import {useState} from 'react'
const AddTask = ({onAdd}) =>{
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false) //defining default state

    const onSubmit = (e) =>{
        e.preventDefault()
        if(!text){
            alert('add text to input')
            return
        }
        if(!day){
            alert('please add text')
            return
        }

        onAdd({text, day, reminder}); //calls function on app.js
        setText('')
        setDay('')
        setReminder(false)
    }

    return(
        <form className='add-form' onSubmit={onSubmit}> {/*calls onSubmit function*/}
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='add task' value={text} onChange={(e)=>{setText(e.target.value)}}/> {/*sets the text state to whatever you input */}
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='add day & time' value={day} onChange={(e)=>{setDay(e.target.value)}}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder} onChange={(e)=>{setReminder(e.currentTarget.checked)}}/>
            </div>
            <input type='submit' value='save' className='btn btn-block'/>
        </form>
    )
}
export default AddTask
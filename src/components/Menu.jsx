import { useContext } from "react"
import { HelpContext } from "./Helper"
import "../styles/Menu.css"
function Menu() {
    const {setStage,setUsername} = useContext(HelpContext)

  return (
    
    <div className="menu">
        <label htmlFor="name">Insert Your Name :</label>
      <input type="text" placeholder="Ex John Doe..." onChange={(e)=>setUsername(e.target.value)} />
      <button onClick={()=>setStage("playing")}>Start Quiz</button>
    </div>
  )
}

export default Menu

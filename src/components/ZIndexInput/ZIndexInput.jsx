import MenuButton from "../MenuButtton/MenuButton"
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
const ZIndexInput = () => {
  return (
    <div className="d-flex flex-row gap-3 justify-content-center w-100">
        <MenuButton selected={true}>
            <AiFillCaretDown size={40}/>
        </MenuButton>
        <div className="h1 text-dark d-flex flex-row justify-content-center " style={{minWidth: "100px"}}>
            0
        </div>
        <MenuButton selected={true}>
            <AiFillCaretUp size={40}/>
        </MenuButton>
    </div>
  )
}

export default ZIndexInput
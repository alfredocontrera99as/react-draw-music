import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react-improve'
import OpenButton from './components/OpenButton/OpenButton';
import { AiOutlineTool, AiFillProfile } from 'react-icons/ai'
import PlayButton from './components/PlayButton/PlayButton';
import Menu from './components/Menu/Menu';
import useDeleteSelectedOnKeyPress from './hooks/useDeleteSelectedOnKeyPress';
import { BsCircle, BsFillCircleFill, BsTriangle, BsSquare, BsZoomIn, BsZoomOut, BsTrashFill } from 'react-icons/bs';
import { TbAbc } from "react-icons/tb";
import MenuButton from './components/MenuButtton/MenuButton';
import ColorTable from './components/ColorTable/ColorTable';
import ZIndexInput from './components/ZIndexInput/ZIndexInput';
// import { useMobileOrientation } from 'react-device-detect';
function App() {
  // const { isLandscape } = useMobileOrientation()

  const { editor, onReady, selectedObjects } = useFabricJSEditor()
  const [play, setPlay] = useState(false);
  // const [color, setColor] = useState("#ffffff");
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const openToolbar = () => { setToolbarOpen((toolbarOpen) => !toolbarOpen) }
  const openProperties = () => { setPropertiesOpen((propertiesOpen) => !propertiesOpen) }
  const [selectTool, setSelectedTool] = useState("CIRCLE_WHITE")
  // this effect adds a shorcut for delete key
  useDeleteSelectedOnKeyPress(editor)
  const changeColor = (color) => {
    editor?.setFillColor(color)
  }

  // const bringForward = () => {
  //   editor?.moveForward();
  // }
  // const bringBack = () => {
  //   editor?.sendBack();
  // }

  const changeSelectedTool = (text) => {
    if (selectTool !== text) {
      setSelectedTool(text)
    } else {
      setSelectedTool("")

    }
  }
  const doFunction = (e) => {
    if (selectedObjects.length === 0) {

      switch (selectTool) {
        case "CIRCLE":
          editor?.addCircle({ left: e.clientX - 80, top: e.clientY - 160, width: 80, height: 80, radius: 80, angle: 0 });
          break;
        case "CIRCLE_WHITE":
          editor?.setFillColor("rgb(255,255,255,1)")
          editor?.addCircle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, radius: 80, angle: 0 });
          break;
        case "RECT":
          editor?.setFillColor("rgb(255,0,0,1)")
          editor?.addRectangle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, angle: 0 });
          break;
        case "TRIANGLE":
          editor?.addTriangle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, angle: 0 });
          break;
        case "TEXT":
          editor?.addText({});
          break;
        case "ZOOM_IN":
          break;
        case "DELETE":
          editor?.deleteSelected();
          break;
        default:
          break;
      }
    }
  }
  return (
    <div className="App" >
      <Nav
        className='bg-black d-flex justify-content-between'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >

        <OpenButton Icon={AiOutlineTool} condition={toolbarOpen} changeFunction={openToolbar} altDescription="Abrir Barra de Herramientas" title="Cerrar Barra de Herramientas" />
        <div className='w-75 d-flex justify-content-start  align-items-center '>
          <button className='bg-transparent text-white border-0 h5 me-3 my-1  ]' title="Crear nueva composicion">Nueva</button>
          <button className='bg-transparent text-white border-0 h5 me-3 my-1  ]' title="Abrir una composicion">Abrir</button>
          <button className='bg-transparent text-white border-0 h5 me-3 my-1  ]' title="Abrir una composicion">Descargar</button>
          <PlayButton changeFunction={setPlay} condition={play} title="Pausar Composicion" altDescription="Reproducir Composicion" />
        </div>
        <OpenButton Icon={AiFillProfile} condition={propertiesOpen} changeFunction={openProperties} altDescription="Abrir menú de propiedades" title="Cerrar menú de propiedades" />
      </Nav>
      <div onClick={doFunction}>
        <FabricJSCanvas className='canvas' onReady={onReady} />
      </div>
      {
        toolbarOpen ?
          <Menu show={toolbarOpen} toggleShow={openToolbar} title="Barra de Herramientas" >
            <div className='d-flex flex-column justify-content-start align-items-baseline w-100  h-100'>
              <div className='text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5>Formas</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <MenuButton onClick={() => changeSelectedTool("CIRCLE_WHITE")} selected={selectTool === "CIRCLE_WHITE"}>
                    <BsCircle size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => changeSelectedTool("CIRCLE")} selected={selectTool === "CIRCLE"}>
                    <BsFillCircleFill size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => changeSelectedTool("TRIANGLE")} selected={selectTool === "TRIANGLE"}>
                    <BsTriangle size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => changeSelectedTool("RECT")} selected={selectTool === "RECT"}>
                    <BsSquare size={40} />
                  </MenuButton>
                </div>
              </div>
              <div className='text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5>Otras</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <MenuButton onClick={() => changeSelectedTool("TEXT")} selected={selectTool === "TEXT"}>
                    <TbAbc size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.zoomIn()}>
                    <BsZoomIn size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.zoomOut()} >
                    <BsZoomOut size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.deleteSelected()}>
                    <BsTrashFill size={40} />
                  </MenuButton>

                </div>
              </div>
            </div>
          </Menu>
          : null
      }
      {
        propertiesOpen ?
          <Menu show={propertiesOpen} placement="end" toggleShow={openProperties} title="Propiedades" >
            <div className='d-flex flex-column gap-3  justify-content-start align-items-baseline w-100  h-100'>
              <div className='bg-white rounded text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5>Colores</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <ColorTable changeColor={changeColor}/>
                </div>
              </div>
              <div className='bg-white rounded text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5>Z-Index</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <ZIndexInput/>
                </div>
              </div>
            </div>
          </Menu>
          :
          null
      }

    </div>
  );
}

export default App;

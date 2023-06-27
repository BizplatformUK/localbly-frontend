
import { useState, useContext } from "react";
import { HexColorPicker, HexColorInput} from 'react-colorful';
import Modal from "../../../components/Reusable/Modal";

export default function ColorPicker({setColor, color}) {
    const [open, setOpen] = useState(false)

    const handleColorChange = (newColor) => {
      setColor(newColor);
    };

    return (
      <>
       <div className="bg-color">
            <button type="button" onClick={()=>setOpen(true)}>Select Background Color</button>
       </div>
       <Modal open={open} onClose={()=>setOpen(false)} text="Choose a color">
            <div className="color-picker">
                <HexColorPicker color={color} onChange={handleColorChange} />
                <div style={{ marginTop: '10px' }}>
                    <HexColorInput color={color} onChange={handleColorChange} />
                </div>
                <button className="color-btn" onClick={()=>setOpen(false)}>Set Color</button>
            </div>
       </Modal>
      </>
    );
  }
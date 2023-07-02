import { useEffect } from "react"
import ConsoleText from "./ConsoleText/ConsoleText";

export function Intro({ setIntroDone }) {
  useEffect(() => {
    setTimeout(() => {
      console.log("hi");
      // setIntroDone(true)
    }, 6000);
  }, [])

  const massages = [
    'Hi, I am Tim. A new type of blender.',
    'I mix Art... ',
    'Ya my developer has really nothing to do 🙄. So...',
    'I am loading, pleas wait until I get ready 😊.'
  ]

  const RoomColors = [
    '#937855', // K
    '#275e3f', // G
    '#937855', // T
    '#386f7c', // W
    '#27455f', // B
  ]

  return (
    <>
      {/* <div className="intro" > */}
      <ConsoleText words={massages} colors={['tomato', 'rebeccapurple', 'lightblue']} />
      {/* </div> */}
    </>
  )
}

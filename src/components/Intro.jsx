import { useEffect } from "react"
import ConsoleText from "./ConsoleText/ConsoleText";

export function Intro({ setIntroDone, areRoomsReady }) {

  const massages = [
    'Hi, I am Tim. A new type of blenders.',
    'I mix Art... ',
    'Ya, my developer has really nothing to do 🙄. So...',
    'Please, have fun 🎉',
    'I am loading, pleas wait until I get ready 😊.'
  ]

  const RoomColors = [
    '#937855', // Kitchen
    '#275e3f', // Green
    '#386f7c', // Waiting
    '#27455f', // Blue
    '#937855', // Credit
  ]

  return (
    <>
      {areRoomsReady && <div className="intro" >
        <div onClick={() => setIntroDone(true)} className="arrow">
          <div className={`hover-underline-animation left-to-right `}>
            Skip
          </div>
        </div>
      </div>}

      <ConsoleText areRoomsReady={areRoomsReady} setIntroDone={setIntroDone} words={massages} colors={RoomColors} />
    </>
  )
}

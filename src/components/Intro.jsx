import { useEffect } from "react"
import ConsoleText from "./ConsoleText/ConsoleText";
import { useState } from "react";

export function Intro({ introDone, setIntroDone, areRoomsReady }) {

  const [visible, setVisible] = useState(true);
  const massages = [
    'Hi, I am Tim. A new type of blenders.',
    'I mix Art... ',
    'Ya, my developer has really nothing to do 🙄. So...',
    'Have fun 🎉',
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
      {visible && <div
        onClick={(e) => e.stopPropagation()}
        className={`intro-container ${!introDone ? "" : " fade-out"}`}
        onAnimationEnd={() => introDone && setVisible(false)}
      >
        {areRoomsReady && <div className="intro" >
          <div style={{ left: -60, bottom: '-65vh' }} onClick={(e) => (e.stopPropagation(), setIntroDone(true))} className="arrow">
            <div className={`hover-underline-animation left-to-right `}>
              Skip
            </div>
          </div>
        </div>}

        <ConsoleText areRoomsReady={areRoomsReady} setIntroDone={setIntroDone} words={massages} colors={RoomColors} />
      </div>}
    </>
  )
}

import * as React from "react"
import ReactDOM from "react-dom"
import { Frame, useAnimation, transform } from "framer"

import "./styles.css"

function Skinny(props) {
  return (
    <Frame
      size={290}
      background="transparent"
      borderRadius={150}
      overflow="hidden"
      backgroundColor="white"
      position="relative"
      style={{ margin: 30 }}
    >
      {/* Wing far side */}
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fwing-far.png)"
        width={84}
        height={119}
        left={50}
        top={50}
        style={{ transformOrigin: "bottom right" }}
        animate={props.wingsAnimate}
      />
      {/* Body */}
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fskinny-no-wings-2.png)"
        width={290}
        height={290}
      />
      {/* Cheek */}
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fcheek.png)"
        width={79}
        height={67}
        left={155}
        top={135}
        animate={props.cheekAnimate}
      />
      {/* Wing near side */}
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fwing-near.png)"
        width={124}
        height={71}
        left={-20}
        top={110}
        style={{ transformOrigin: "bottom right" }}
        animate={props.wingsAnimate}
      />
    </Frame>
  )
}

function Slider(props) {
  return (
    <Frame
      width={280}
      height={15}
      borderRadius={30}
      backgroundColor="white"
      position="relative"
      style={{
        marginBottom: "4rem"
      }}
    >
      <Frame
        size={60}
        borderRadius={30}
        center="y"
        backgroundColor="white"
        shadow="0 1px 5px 0 rgba(0, 0, 0, 0.25)"
        drag="x"
        dragConstraints={{ left: 0, right: 220 }}
        dragElastic={false}
        dragMomentum={false}
        onDrag={props.onDrag}
      />
    </Frame>
  )
}

function App() {
  const cheekAnimation = useAnimation()
  const wingsAnimation = useAnimation()
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Skinny cheekAnimate={cheekAnimation} wingsAnimate={wingsAnimation} />
      <Slider
        onDrag={function handleDrag(event, info) {
          //console.log(info.point.x)
          //  change scale of cheek based on info.point.x
          const scale = transform(info.point.x, [0, 220], [0.4, 1.5])
          cheekAnimation.start({ scale })
        }}
      />
      <Slider
        onDrag={function handleDrag(event, info) {
          //console.log(info.point.x)
          //  change rotation of wings based on info.point.x
          const rotation = transform(info.point.x, [0, 220], [0, 360])
          wingsAnimation.start({ rotate: rotation })
        }}
      />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

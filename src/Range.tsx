const bars = [{
  start: 0,
  end: 100,
  y: 50,
}, {
  start: 100,
  end: 150,
  y: 20,
}]

function Range() {

  return (
    <>
      <div className="relative min-h-20 bg-orange-200">
        Hello
        {/* <Box x={0} y={50} width={100} />
        <Box x={100} y={20} width={50} /> */}
        {bars.map((bar, index) => (
          <Box key={index} x={bar.start} y={bar.y} width={bar.end - bar.start} />
        ))}
      </div>
    </>
  )
}

function Box({ x, y, width }: { x: number, y: number, width: number }) {

  return (
    <>
      <div className="absolute bg-green-500" style={{ bottom: 0, left: x, width, height: y }}>

      </div>
    </>
  )
}

export default Range

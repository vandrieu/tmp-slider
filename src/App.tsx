import DialogContent from "./DialogContent";

function App() {
  return (
    <div
      className="absolute bg-green-400 p-12"
      style={{
        left: 150,
        top: 150,
        width: "calc(100% - 300px)",
        height: 200,
      }}
    >
      <DialogContent />
    </div>
  );
}

export default App;

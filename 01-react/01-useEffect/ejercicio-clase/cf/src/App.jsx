import { useState } from "react";
import Cursor from "./cursor";
import { Button } from "./components/button";


function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <section>
        <Button
          onClick={() => setEnabled(true)}
          color="green"
          text="Prender"
        />

        <Button
          onClick={() => setEnabled(false)}
          color="red"
          text="Apagar"
        />


      </section>
      {enabled && <Cursor />}
    </main>
  );
}

export default App;

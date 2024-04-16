import { useEffect, useState } from "react";
import PromedioEdad from "./PromedioEdad";
import CasadosUniveristarios from "./CasadosUniversitarios";

function App() {
  const [equipos, setEquipos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/equipos")
      .then((response) => response.json())
      .then((data) => {
        setEquipos(data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:3000/api/total-socios")
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 mb-4">
        <div className="border-2 rounded-lg p-6 w-1/4">
          <h3 className="text-2xl font-thin uppercase mb-2">Total socios</h3>
          <h4 className="text-3xl font-bold">{total ? total : "---"}</h4>
        </div>
        <PromedioEdad equipos={equipos} />
      </div>

      <CasadosUniveristarios />
    </main>
  );
}

export default App;

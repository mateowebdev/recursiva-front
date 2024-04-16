import { useEffect, useState } from "react";

function PromedioEdad({ equipos }) {
  const [selected, setSelected] = useState("");
  const [promedio, setPromedio] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/promedio-edad?equipo=${selected}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data !== "No team") {
          setPromedio(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selected]);

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="border-2 rounded-lg p-6 w-1/2">
      <h3 className="text-2xl font-thin uppercase mb-2">
        Promedio Edad de socios
      </h3>
      <p>Equipo</p>
      <select
        className="bg-gray-100 p-2 rounded-md"
        value={selected}
        onChange={handleSelectChange}
      >
        <option value="">Selecciona equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo} value={equipo}>
            {equipo}
          </option>
        ))}
      </select>
      <h4 className="text-3xl font-bold">
        {promedio ? promedio.toFixed(2) : "---"}
      </h4>
    </div>
  );
}

export default PromedioEdad;

import { useEffect, useState } from "react";

function CasadosUniveristarios() {
  const [selected, setSelected] = useState("");
  const [listado, setListado] = useState([]);

  const numeros = Array.from({ length: 200 }, (_, index) => index + 1);

  useEffect(() => {
    fetch(`http://localhost:3000/api/casados-universitarios?limit=${selected}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data !== "Invalid limit. (1 - 200)") {
          setListado(data.data);
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
    <div className="border-2 rounded-lg p-6 w-full">
      <h3 className="text-2xl font-thin uppercase mb-2">
        Casados universitarios
      </h3>
      <p>Cantidad</p>
      <select
        className="bg-gray-100 p-2 rounded-md"
        value={selected}
        onChange={handleSelectChange}
      >
        <option value="">Selecciona una cantidad</option>
        {numeros.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <ul className="flex flex-wrap gap-2 my-4">
        {listado.length > 0
          ? listado.map((socio,index) => (
              <li key={socio.nombre+index} className="border-[1px] border-gray-300 rounded-full px-2">
                {socio.nombre} ({socio.edad}) | {socio.equipo}
              </li>
            ))
          : "---"}
      </ul>
    </div>
  );
}

export default CasadosUniveristarios;

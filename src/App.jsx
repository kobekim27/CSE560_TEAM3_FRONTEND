import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [query, setQuery] = useState("SELECT * FROM hitters LIMIT 10;");
  const [results, setResults] = useState([]);

  const runQuery = async () => {
    const res = await fetch("https://cse560-team3-backend.onrender.com/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🏟️ CSE560 MLB Query Dashboard</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={runQuery}
      >
        Run Query
      </button>

      <div className="mt-6">
        {results.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Query Results</h2>
            <table className="w-full border mb-6">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th className="border px-2 py-1 text-left" key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td className="border px-2 py-1" key={i}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <BarChart width={500} height={300} data={results}>
              <XAxis dataKey="player" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ab" fill="#8884d8" />
            </BarChart>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [highlights, setHighlights] = useState([]);

  // Load highlights on mount
  useEffect(() => {
    chrome.storage.local.get(["highlights"], (result) => {
      setHighlights(result.highlights || []);
    });

    // Listen for changes in storage
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.highlights) {
        setHighlights(changes.highlights.newValue || []);
      }
    });
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    chrome.storage.local.get(["highlights"], (result) => {
      const updated = (result.highlights || []).filter((h) => h.id !== id);
      chrome.storage.local.set({ highlights: updated });
    });
  };

  return (
    <div className="p-4 w-80 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-2">Saved Highlights</h1>
      <ul className="space-y-2">
        {highlights.length === 0 ? (
          <p className="text-sm text-gray-600">No highlights saved.</p>
        ) : (
          highlights.map((h) => (
            <li key={h.id} className="p-2  bg-white rounded shadow">
              <div >
              <p className="text-sm mt-4"> {h.text}</p>
              <a
                href={h.page}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-xs block mt-4"
              >
                {h.page}
              </a>
              </div>
              <button
                onClick={() => handleDelete(h.id)}
                className="px-4 py-2 bg-red-500 text-white mt-4 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
           

            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

import React, { useState } from "react";

interface LinkPageProps {
  self: string;
  parents: string[];
  children: string[];
}

const LinkPage = ({ self, parents, children }: LinkPageProps) => {
  const [open, setOpen] = useState(false);
  const [parentState, setParentState] = useState(parents);
  const [childrenState, setChildrenState] = useState(children);
  const [parentTemp, setParentTemp] = useState<string[]>([]);
  const [childrenTemp, setChildrenTemp] = useState<string[]>([]);

  console.log(self);
  console.log(parentState);
  console.log(childrenState);

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <div>
        <div className="text-lg font-semibold">Parent</div>
        <div className="text-gray-700">{parentState.join(",")}</div>
      </div>
      <div>
        <div className="text-lg font-semibold">Children</div>
        <div className="text-gray-700">{childrenState}</div>
      </div>
      <button
        onClick={() => {
          setParentTemp(parentState);
          setChildrenTemp(childrenState);
          setOpen(true);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parent
              </label>
              <input
                value={parentTemp}
                onChange={(e) =>
                  setParentTemp(e.target.value.split(",").map((s) => s.trim()))
                }
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Children
              </label>
              <input
                value={childrenTemp}
                onChange={(e) =>
                  setChildrenTemp(
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={async () => {
                  const backendUrl = process.env.REACT_APP_BACKEND_URL ?? "";
                  try {
                    await fetch(backendUrl + "/add-links", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        key: self,
                        parent: parentTemp,
                        children: childrenTemp,
                      }),
                    });
                  } catch (error) {
                    console.log("Error", error);
                  }

                  setParentState(parentTemp);
                  setChildrenState(childrenTemp);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPage;

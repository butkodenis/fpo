import './App.css';

function App() {
  return (
    <>
      <div class="flex h-screen bg-gray-200">
        <div class="flex w-64 flex-col">
          <div class="flex justify-between bg-gray-800 p-4 text-white">
            <div class="text-xl font-semibold">Admin Panel</div>
          </div>
          <div class="flex-grow overflow-y-auto bg-gray-900 p-4">
            <nav class="space-y-2">
              <a
                href="#"
                class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Dashboard
              </a>
              <a
                href="#"
                class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Posts
              </a>
              <a
                href="#"
                class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Users
              </a>
              <a
                href="#"
                class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Settings
              </a>
            </nav>
          </div>
        </div>

        <div class="flex-grow p-4">контент</div>
      </div>
    </>
  );
}

export default App;

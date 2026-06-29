import {useState, lazy, Suspense} from 'react';

/**
 * Custom helper function to inject an artificial delay into a dynamic import promise.
 */
function delayImport<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(promise), ms);
  });
}

export default function App() {
  const [loadDashboard, setLoadDashboard] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Set up the lazy loader dynamically based on our state toggle
  const LazyDashboard = lazy(() => {
    if (simulateFailure) {
      // Mimic Vite's standard dynamic import runtime failure error message
      return Promise.reject(
        new TypeError(`Failed to fetch dynamically imported module: ${window.location.origin}/pages/Dashboard.tsx`)
      );
    }
    return delayImport(import('../pages/Dashboard'), 2000);
  });

  return (
      <div style={{padding: '2rem', fontFamily: 'sans-serif', minWidth: '600px'}}>
        <h1>Enterprise Application Test Suite</h1>

        <div style={{margin: '1.5rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '6px'}}>
          <h3>Simulation Control Panel</h3>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => {
                setSimulateFailure(e.target.checked)
                setTimeout(() => {
                  setSimulateFailure(e.target.checked)
                }, 5000)
              }}
            />
            <strong style={{color: simulateFailure ? '#d32f2f' : '#333'}}>
              Simulate Missing Deployment Chunk (Break Fetch)
            </strong>
          </label>
        </div>

        <button
          onClick={() => setLoadDashboard(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Mount Lazy Dashboard Component
        </button>

        <div style={{marginTop: '2rem'}}>
          {loadDashboard && (
            <Suspense fallback={<div style={{color: '#666'}}>⌛ Fetching application chunk...</div>}>
              <LazyDashboard />
            </Suspense>
          )}
        </div>
      </div>
  );
}
// A normal, raw component
export default function Dashboard() {
  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '8px' }}>
      <h2>Dashboard Overview</h2>
      <p>This content was intentionally delayed by 2 seconds to simulate loading transitions.</p>
      <ul>
        <li>Active Users: 1,420</li>
        <li>Server Status: Operational</li>
        <li>System Load: 12%</li>
      </ul>
    </div>
  );
}
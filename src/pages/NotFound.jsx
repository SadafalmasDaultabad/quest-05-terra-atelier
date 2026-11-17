import EmptyState from '../components/EmptyState.jsx';
export default function NotFound() {
  return <div className="wrap section"><EmptyState title="404 · Page not found" text="That page doesn’t exist. It may have moved, or the link is mistyped." action="Back to home" to="/" /></div>;
}

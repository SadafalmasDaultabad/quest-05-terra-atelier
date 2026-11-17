import { Link } from '../lib/router.jsx';
export default function EmptyState({ title, text, action, to }) {
  return (
    <div className="empty" role="status">
      <div className="empty-icon" aria-hidden="true">◌</div>
      <h2>{title}</h2><p className="muted">{text}</p>
      {to ? <Link to={to} className="btn">{action}</Link> : action}
    </div>
  );
}

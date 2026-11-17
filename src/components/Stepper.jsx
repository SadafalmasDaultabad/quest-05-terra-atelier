import { MAX_QTY } from '../lib/format.js';
// Quantity control with large, labelled buttons.
export default function Stepper({ value, onChange, label }) {
  return (
    <div className="stepper" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label={`Decrease quantity of ${label}`}>−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label={`Increase quantity of ${label}`}>+</button>
    </div>
  );
}

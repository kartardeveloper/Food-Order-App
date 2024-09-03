function Input({ label, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} autoComplete="true" />
    </p>
  );
}

export default Input;

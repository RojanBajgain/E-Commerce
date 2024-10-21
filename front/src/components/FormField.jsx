export const FormField = ({ title, label, children }) => {
  return (
    <div className="mb-3">
      <label htmlFor={title}>{label}</label>
      {children}
    </div>
  );
};

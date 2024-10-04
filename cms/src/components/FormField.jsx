export const FormField = ({title, label, children}) => {
    return <div className="mb-3">
        <label htmlFor={title} className="form-label">{label}</label>
        {children}
    </div>
}
import { Button } from "react-bootstrap"

export const SubmitBtn = ({loading = false, icon = 'fa-save', label = 'Save'}) => {
    return <Button type="submit" variant="outline-dark">
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : icon} me-2`}></i> {label}
            </Button>
}
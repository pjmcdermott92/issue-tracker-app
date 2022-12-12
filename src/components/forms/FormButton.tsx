interface FormButton {
    type?: any,
    variant?: string
    disabled?: boolean
    onClick?: any
    children?: any
}

const FormButton = ({
    type = 'submit',
    variant = 'dark',
    disabled,
    onClick,
    children
}: FormButton) => (
    <div className='my-1'>
        <button
            type={type}
            disabled={disabled}
            className={`btn btn-100 btn-${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    </div>
);

export default FormButton;

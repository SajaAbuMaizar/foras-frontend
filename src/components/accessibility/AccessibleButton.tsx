interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  loading?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  ariaLabel,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      aria-busy={loading}
      disabled={disabled || loading}
      className={`${
        props.className || ""
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      {loading ? (
        <>
          <span className="sr-only">טוען...</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

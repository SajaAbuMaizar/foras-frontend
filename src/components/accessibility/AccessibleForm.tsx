import { useAccessibility } from "@/context/accessibility/AccessibilityContext";
import { useEffect } from "react";

interface AccessibleFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  ariaLabel: string;
  errors?: Record<string, string>;
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  children,
  ariaLabel,
  errors,
  ...props
}) => {
  const { announceMessage } = useAccessibility();

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      const errorCount = Object.keys(errors).length;
      announceMessage(`נמצאו ${errorCount} שגיאות בטופס`);
    }
  }, [errors, announceMessage]);

  return (
    <form {...props} aria-label={ariaLabel} noValidate>
      {errors && Object.keys(errors).length > 0 && (
        <div role="alert" className="sr-only">
          <h2>שגיאות בטופס:</h2>
          <ul>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </form>
  );
};

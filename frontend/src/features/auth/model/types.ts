export interface PasswordStrength {
  score: number;
  label: string;
  variant: "danger" | "warning" | "info" | "success";
  requirements: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

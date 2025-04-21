export interface IInput {
  type: "text" | "number" | "checkbox" | "textarea";
  placeholder?: string;
  label?: string;
  required?: boolean;
  size?: "small" | "large" | "normal";
  disabled?: boolean;
  labelType?: "over" | "in" | "on" | "ifta";
  useGrouping?: boolean;
  id?: string;
}

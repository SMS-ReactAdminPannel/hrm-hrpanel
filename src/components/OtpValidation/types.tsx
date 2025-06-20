export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: (otp: string) => void;
}
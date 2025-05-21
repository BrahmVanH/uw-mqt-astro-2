import { Button } from "./ui/button";

export interface Props {
  className?: string;
  size: "sm" | "lg" | "xl" | "icon";
}
const DonateBtn: React.FC<Props> = ({ className, size }) => {
  return (
    <Button variant="donate" size={size} className={`${className}`}>
      DONATE
    </Button>
  );
};

export default DonateBtn;

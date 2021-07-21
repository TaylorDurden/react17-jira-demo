import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      value={checked ? 1 : 0}
      count={1}
      // !!num = Boolean(num)
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin;

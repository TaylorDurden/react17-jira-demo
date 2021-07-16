import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  spaceBetween?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : undefined};
  > * {
    /* 定义所有Row的子元素的样式 */
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

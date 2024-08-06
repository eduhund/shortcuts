const { widget } = figma;
const { AutoLayout } = widget;

type KeyboardProps = {
  children: FigmaDeclarativeNode;
  onClick: () => void;
};

export default function Keyboard({ children, onClick }: KeyboardProps) {
  return (
    <AutoLayout
      name="Keyboard"
      width={"hug-contents"}
      height={"hug-contents"}
      verticalAlignItems={"center"}
      spacing={5}
      padding={5}
      cornerRadius={9}
      fill={"#C1C2C4"}
      onClick={onClick}
      effect={[
        {
          type: "drop-shadow",
          color: "#00000016",
          offset: {
            x: 0,
            y: 1,
          },
          blur: 2,
          spread: 1,
        },
        {
          type: "drop-shadow",
          color: "#FFFFFF16",
          offset: {
            x: 0,
            y: 1,
          },
          blur: 2,
          spread: 1,
        },
      ]}
    >
      {children}
    </AutoLayout>
  );
}

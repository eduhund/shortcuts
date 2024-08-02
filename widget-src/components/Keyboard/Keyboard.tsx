const { widget } = figma;
const { AutoLayout } = widget;

type KeyboardProps = {
  children: FigmaDeclarativeNode;
};

export default function Keyboard({ children }: KeyboardProps) {
  return (
    <AutoLayout
      width={"hug-contents"}
      height={"hug-contents"}
      verticalAlignItems={"center"}
      spacing={4}
      padding={4}
      cornerRadius={8}
      fill={"#C1C2C4"}
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

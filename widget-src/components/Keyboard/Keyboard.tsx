const { widget } = figma;
const { AutoLayout, useWidgetId } = widget;

type KeyboardProps = {
  children: FigmaDeclarativeNode;
};

export default function Keyboard({ children }: KeyboardProps) {
  const widgetId = useWidgetId();
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
      onClick={async () => {
        const widgetNode = (await figma.getNodeByIdAsync(
          widgetId
        )) as WidgetNode;
        figma.currentPage.selection = [widgetNode];
      }}
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

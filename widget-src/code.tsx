// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma;
const { useSyncedState, AutoLayout, Text } = widget;

function Widget() {
  const [keys, setKeys] = useSyncedState("keys", "Q");

  return (
    <AutoLayout
      width={36}
      height={36}
      verticalAlignItems={"center"}
      spacing={8}
      padding={10}
      cornerRadius={4}
      fill={"#28292D"}
      stroke={"#121212"}
      strokeAlign={"outside"}
      effect={[
        {
          type: "drop-shadow",
          color: "#00000016",
          offset: {
            x: 0,
            y: 0,
          },
          blur: 0.2,
          spread: 0.2,
        },
        {
          type: "inner-shadow",
          color: "#00000016",
          offset: {
            x: 0,
            y: 16,
          },
          blur: 8,
          spread: 4,
        },
        {
          type: "inner-shadow",
          color: "#9D9D9D25",
          offset: {
            x: 0,
            y: 0,
          },
          blur: 1,
          spread: 1,
        },
      ]}
    >
      <Text
        fontSize={14}
        width={14}
        fontWeight={400}
        horizontalAlignText={"center"}
        fill={"#F9F9F9"}
      >
        {keys}
      </Text>
    </AutoLayout>
  );
}

widget.register(Widget);

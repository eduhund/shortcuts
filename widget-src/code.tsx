// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma;
const { useSyncedState, AutoLayout, Text } = widget;

function LetterKey() {
  const [keys, setKeys] = useSyncedState("keys", "Q");

  return (
    <AutoLayout
      width={35}
      height={35}
      verticalAlignItems={"center"}
      spacing={8}
      padding={10}
      cornerRadius={4}
      fill={"#28292D"}
      stroke={"#121212"}
      strokeWidth={0.5}
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

function Layout() {
  const [keysQt, setKeysQt] = useSyncedState("keysQt", [null, null, null]);
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
      {keysQt.map((item) => (
        <LetterKey />
      ))}
    </AutoLayout>
  );
}

widget.register(Layout);

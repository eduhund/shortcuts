// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Input } = widget;

const MODIFY_KEYS = {
  command: {
    width: 46,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "command",
    mainLineHeight: 8,
    supLine: "⌘",
    supLineHeight: 12,
  },
  option: {
    width: 35,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "option",
    mainLineHeight: 8,
    supLine: "⌥",
    supLineHeight: 12,
  },
  control: {
    width: 35,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "control",
    mainLineHeight: 8,
    supLine: "⌃",
    supLineHeight: 12,
  },
};

const MAIN_PROPERTY_CONTROLS: WidgetPropertyMenuItem[] = [
  {
    itemType: "action",
    tooltip: "-",
    propertyName: "-",
  },
  {
    itemType: "action",
    tooltip: "+",
    propertyName: "+",
  },
];

function mainPropertyController(
  keysQt: string[],
  setKeysQt: (arg0: string[]) => void,
  propertyName: string
) {
  const qt = keysQt.length;
  if (propertyName === "+" && qt < 5) {
    keysQt.splice(keysQt.length - 2, 0, "modify");
    setKeysQt(keysQt);
  } else if (propertyName === "-" && qt > 1) {
    keysQt.splice(keysQt.length - 2, 1);
    setKeysQt(keysQt);
  }
}

function KeyButton({ keyType }: { ["keyType"]: string }) {
  switch (keyType) {
    case "modify":
      return <ModifyKey />;
      break;
    case "letter":
      return <LetterKey />;
  }
}

function ModifyKey() {
  const [key, setKey] = useSyncedState("keys", "control");

  const {
    width = 35,
    verticalAlign = "center",
    horizontalAlign = "center",
    mainLine,
    mainLineHeight,
    supLine,
    supLineHeight,
  } = MODIFY_KEYS[key];

  return (
    <AutoLayout
      width={width}
      height={35}
      verticalAlignItems={verticalAlign}
      horizontalAlignItems={horizontalAlign}
      direction={"vertical"}
      spacing={"auto"}
      padding={4}
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
        fontSize={supLineHeight}
        lineHeight={supLineHeight}
        fontWeight={400}
        horizontalAlignText={"center"}
        fill={"#F9F9F9"}
      >
        {supLine}
      </Text>
      <Text
        fontSize={mainLineHeight}
        lineHeight={mainLineHeight}
        fontWeight={400}
        horizontalAlignText={"center"}
        fill={"#F9F9F9"}
      >
        {mainLine}
      </Text>
    </AutoLayout>
  );
}

function LetterKey() {
  const [key, setKey] = useSyncedState("key", "Q");

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
      <Input
        fontSize={14}
        width={14}
        fontWeight={400}
        horizontalAlignText={"center"}
        fill={"#F9F9F9"}
        value={key}
        inputBehavior={"truncate"}
        textCase={"upper"}
        truncate={1}
        onClick={(e) => console.log(e)}
        onTextEditEnd={({ characters }) => {
          if (characters.length > 0) setKey(characters[0]);
        }}
      />
    </AutoLayout>
  );
}

function Layout() {
  const [keysQt, setKeysQt] = useSyncedState("keysQt", ["modify", "letter"]);

  usePropertyMenu(MAIN_PROPERTY_CONTROLS, ({ propertyName }) =>
    mainPropertyController(keysQt, setKeysQt, propertyName)
  );

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
      {keysQt.map((key) => (
        <KeyButton keyType={key} />
      ))}
    </AutoLayout>
  );
}

widget.register(Layout);

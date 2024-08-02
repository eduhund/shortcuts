const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

type KeysParamsProps = {
  [key: string]: {
    width?: number;
    verticalAlign?: WidgetJSX.AlignItems | undefined;
    horizontalAlign?: string;
    mainLine?: string;
    mainLineHeight?: number;
    supLine?: string;
    supLineHeight?: number;
  };
};

type KeyButtonProps = {
  keyType: string;
  value?: string | null;
  onChange?: (characters: string) => void;
};

const MODIFY_KEYS: KeysParamsProps = {
  letter: {},
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

function KeyButton({ keyType, value = null, onChange }: KeyButtonProps) {
  const { mainLine, mainLineHeight, supLine, supLineHeight } =
    MODIFY_KEYS[keyType];

  switch (keyType) {
    case "letter":
      return (
        <Input
          fontSize={14}
          width={14}
          fontWeight={400}
          horizontalAlignText={"center"}
          fill={"#F9F9F9"}
          value={value}
          inputBehavior={"truncate"}
          textCase={"upper"}
          truncate={1}
          onClick={(e) => console.log(e)}
          onTextEditEnd={({ characters }) => {
            if (characters.length > 0) onChange && onChange(characters[0]);
          }}
        />
      );
      break;
    default:
      return (
        <>
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
        </>
      );
  }
}

export default function Key({ keyType, value, onChange }: KeyButtonProps) {
  const {
    width = 35,
    verticalAlign = "center",
    horizontalAlign = "center",
  } = MODIFY_KEYS[keyType];

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
      <KeyButton keyType={keyType} value={value} onChange={onChange} />
    </AutoLayout>
  );
}

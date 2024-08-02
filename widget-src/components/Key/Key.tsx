import { MODIFY_KEYS } from "../../data/keysParams";

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

type KeyContainerProps = {
  children: FigmaDeclarativeNode;
  width: number;
};

type KeyProps = {
  keyType: string;
  value?: string | null;
  onChange?: (characters: string) => void;
};

function KeyContainer({ children, width }: KeyContainerProps) {
  return (
    <AutoLayout
      width={width}
      height={35}
      verticalAlignItems={"center"}
      horizontalAlignItems={"center"}
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
      {children}
    </AutoLayout>
  );
}

export default function Key({ keyType, value = null, onChange }: KeyProps) {
  const { width = 35, mainLine, additionalLine } = MODIFY_KEYS[keyType] || {};

  switch (keyType) {
    case "letter":
      return (
        <KeyContainer width={width}>
          <Input
            width={"fill-parent"}
            fontSize={14}
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
        </KeyContainer>
      );
      break;
    default:
      return (
        <KeyContainer width={width}>
          {additionalLine && (
            <Text
              width={"fill-parent"}
              fontSize={additionalLine?.size}
              lineHeight={additionalLine?.size}
              fontWeight={400}
              horizontalAlignText={additionalLine?.align}
              fill={"#F9F9F9"}
            >
              {additionalLine?.value}
            </Text>
          )}
          <Text
            width={"fill-parent"}
            fontSize={mainLine?.size}
            lineHeight={mainLine?.size}
            fontWeight={400}
            horizontalAlignText={mainLine?.align}
            fill={"#F9F9F9"}
          >
            {mainLine?.value}
          </Text>
        </KeyContainer>
      );
  }
}

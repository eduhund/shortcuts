import { MODIFY_KEYS } from "../../data/keysParams";

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

type KeyContainerProps = {
  children: FigmaDeclarativeNode;
  width: number;
  isSelected?: boolean;
  onClick: any;
};

type KeyProps = {
  keyType: string;
  value?: string | null;
  isSelected?: boolean;
  onClick: any;
  onChange?: (characters: string) => void;
};

function KeyContainer({
  children,
  width,
  isSelected,
  onClick,
}: KeyContainerProps) {
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
      stroke={isSelected ? "#FFFFFF" : "#121212"}
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
      onClick={onClick}
    >
      {children}
    </AutoLayout>
  );
}

export default function Key({
  keyType,
  value = null,
  isSelected,
  onChange,
  onClick,
}: KeyProps) {
  const { width = 35, mainLine, additionalLine } = MODIFY_KEYS[keyType] || {};

  switch (keyType) {
    case "letter":
      return (
        <KeyContainer width={width} isSelected={isSelected} onClick={onClick}>
          <Input
            width={"fill-parent"}
            height={"fill-parent"}
            fontSize={14}
            fontWeight={400}
            horizontalAlignText={"center"}
            verticalAlignText={"center"}
            fill={isSelected ? "#FFFFFF" : "#F9F9F9"}
            value={value}
            inputBehavior={"truncate"}
            textCase={"upper"}
            truncate={true}
            effect={
              isSelected
                ? [
                    {
                      type: "drop-shadow",
                      color: "#FFFFFFCC",
                      offset: {
                        x: 0,
                        y: 0,
                      },
                      blur: 0.3,
                      spread: 0.3,
                    },
                  ]
                : undefined
            }
            onTextEditEnd={({ characters }) => {
              if (characters.length > 0) onChange && onChange(characters[0]);
            }}
          />
        </KeyContainer>
      );
      break;
    default:
      return (
        <KeyContainer width={width} isSelected={isSelected} onClick={onClick}>
          {additionalLine && (
            <Text
              width={"fill-parent"}
              fontSize={additionalLine?.size}
              lineHeight={additionalLine?.size}
              fontWeight={400}
              horizontalAlignText={additionalLine?.align}
              fill={isSelected ? "#FFFFFF" : "#F9F9F9"}
              effect={
                isSelected
                  ? [
                      {
                        type: "drop-shadow",
                        color: "#FFFFFFCC",
                        offset: {
                          x: 0,
                          y: 0,
                        },
                        blur: 0.3,
                        spread: 0.3,
                      },
                    ]
                  : undefined
              }
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
            fill={isSelected ? "#FFFFFF" : "#F9F9F9"}
            effect={
              isSelected
                ? [
                    {
                      type: "drop-shadow",
                      color: "#FFFFFFCC",
                      offset: {
                        x: 0,
                        y: 0,
                      },
                      blur: 0.3,
                      spread: 0.3,
                    },
                  ]
                : undefined
            }
          >
            {mainLine?.value}
          </Text>
        </KeyContainer>
      );
  }
}

import { getKey, getSecondLetter, numberKeys } from "../../data/keysParams";

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

type KeyContainerProps = {
  children: FigmaDeclarativeNode;
  width: number;
  isSelected?: boolean;
  onClick: (event: WidgetClickEvent) => void;
};

type KeyProps = {
  keyType: string;
  value?: string | null;
  isSelected?: boolean;
  disabled?: boolean;
  onClick: (event: WidgetClickEvent) => void;
  onChange?: (characters: string) => void;
  onInputClick?: () => void;
};

function KeyContainer({
  children,
  width = 38,
  isSelected,
  onClick,
}: KeyContainerProps) {
  const keyEffects: WidgetJSX.Effect[] = [
    {
      type: "drop-shadow",
      color: isSelected ? "#FFFFFF99" : "#00000099",
      offset: {
        x: 0,
        y: 0,
      },
      blur: 0.1,
      spread: 0.1,
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
      color: isSelected ? "#FFFFFF66" : "#9D9D9D25",
      offset: {
        x: 0,
        y: 0,
      },
      blur: isSelected ? 0.5 : 1,
      spread: isSelected ? 0.5 : 1,
    },
  ];

  if (isSelected) {
    keyEffects.push({
      type: "inner-shadow",
      color: "#FFFFFF66",
      offset: {
        x: 0,
        y: 0,
      },
      blur: 0.5,
      spread: 0.5,
    });
  }

  return (
    <AutoLayout
      name="Key"
      width={width}
      height={38}
      verticalAlignItems={"center"}
      horizontalAlignItems={"center"}
      direction={"vertical"}
      spacing={"auto"}
      padding={5}
      cornerRadius={4}
      fill={"#28292D"}
      stroke={isSelected ? "#FFFFFF" : "#121212"}
      strokeWidth={0.5}
      strokeAlign={"outside"}
      effect={keyEffects}
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
  disabled,
  onChange,
  onClick,
  onInputClick,
}: KeyProps) {
  const { width = 38, mainLine, additionalLine } = getKey(keyType);

  const secondLetter = value && getSecondLetter(value);

  switch (keyType) {
    case "default":
      if (numberKeys.includes(value || "")) {
        return (
          <KeyContainer width={width} isSelected={isSelected} onClick={onClick}>
            {secondLetter && (
              <Text
                width={"fill-parent"}
                height={"hug-contents"}
                fontSize={9}
                lineHeight={9}
                fontWeight={400}
                letterSpacing={-0.25}
                horizontalAlignText={"center"}
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
                        },
                      ]
                    : undefined
                }
              >
                {secondLetter}
              </Text>
            )}
            <Input
              width={"fill-parent"}
              height={"hug-contents"}
              fontSize={14}
              fontWeight={400}
              horizontalAlignText={"center"}
              verticalAlignText={"center"}
              fill={isSelected ? "#FFFFFF" : "#F9F9F9"}
              value={value}
              inputBehavior={"truncate"}
              textCase={"upper"}
              truncate={true}
              onClick={onInputClick}
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
      } else {
        return (
          <KeyContainer width={width} isSelected={isSelected} onClick={onClick}>
            {secondLetter && (
              <Text
                width={"fill-parent"}
                height={"hug-contents"}
                fontSize={11.5}
                lineHeight={11.5}
                fontWeight={400}
                letterSpacing={-0.25}
                horizontalAlignText={"center"}
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
                        },
                      ]
                    : undefined
                }
              >
                {secondLetter}
              </Text>
            )}
            <Input
              width={"fill-parent"}
              height={"hug-contents"}
              fontSize={secondLetter ? 11.5 : 14}
              fontWeight={400}
              horizontalAlignText={"center"}
              verticalAlignText={"center"}
              fill={isSelected ? "#FFFFFF" : "#F9F9F9"}
              value={value}
              inputBehavior={"truncate"}
              textCase={"upper"}
              truncate={true}
              onClick={disabled ? () => {} : onInputClick}
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
      }
    default:
      return (
        <KeyContainer width={width} isSelected={isSelected} onClick={onClick}>
          {additionalLine && (
            <Text
              width={"fill-parent"}
              height={"hug-contents"}
              fontSize={additionalLine?.size}
              lineHeight={additionalLine?.size}
              fontWeight={400}
              letterSpacing={-0.25}
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
            height={"hug-contents"}
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

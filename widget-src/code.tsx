// This is a counter widget with buttons to increment and decrement the number.

import Key from "./components/Key/Key";
import Keyboard from "./components/Keyboard/Keyboard";
import { getKeys } from "./data/keysParams";

const { widget } = figma;
const { useSyncedState, usePropertyMenu, useStickable } = widget;

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

function Layout() {
  const [modifyKeys, setModifyKeys] = useSyncedState("modifyKeys", ["command"]);
  const [mainKey, setmainKey] = useSyncedState("mainKey", {
    keyType: "letter",
    value: "Q",
  });
  const [isKeySelected, setIsKeySelected] = useSyncedState<number | null>(
    "isKeySelected",
    null
  );
  const modifyKeyVariants = [
    { option: "command", label: "Command" },
    { option: "option", label: "Option" },
    { option: "control", label: "Control" },
  ];

  const mainKeyVariants = [{ option: "letter", label: "Letter" }];

  useStickable();

  const allKeys = getKeys();

  function changeModifyKeys({ propertyName }: WidgetPropertyEvent) {
    const filteredKeys = allKeys.filter((item) => !modifyKeys.includes(item));
    const qt = modifyKeys.length;
    if (propertyName === "+" && qt < 4) {
      modifyKeys.push(filteredKeys[0] || "command");
      setModifyKeys(modifyKeys);
    } else if (propertyName === "-" && qt > 0) {
      modifyKeys.pop();
      setModifyKeys(modifyKeys);
    }
  }

  function changeModifyKey({
    propertyName,
    propertyValue = "command",
  }: WidgetPropertyEvent) {
    const modifyKeyIndex = Number(propertyName.split("_")[1]);
    modifyKeys[modifyKeyIndex] = propertyValue;
    setModifyKeys(modifyKeys);
  }

  function changeLetterKey(value: string) {
    setmainKey({ ...mainKey, value });
  }

  switch (isKeySelected) {
    case 0:
    case 1:
    case 2:
    case 3:
      usePropertyMenu(
        [
          {
            itemType: "dropdown",
            propertyName: "modifyKey_" + isKeySelected,
            tooltip: "Modify key change",
            selectedOption: modifyKeys[isKeySelected],
            options: modifyKeyVariants,
          },
        ],
        changeModifyKey
      );
      break;
    case 9:
      usePropertyMenu(
        [
          {
            itemType: "dropdown",
            propertyName: "mainKey",
            tooltip: "Main key change",
            selectedOption: mainKey.keyType,
            options: mainKeyVariants,
          },
        ],
        (e) => console.log(e)
      );
      break;
    default:
      usePropertyMenu(MAIN_PROPERTY_CONTROLS, changeModifyKeys);
  }

  return (
    <Keyboard>
      {modifyKeys.map((key, i) => (
        <Key
          key={key}
          keyType={key}
          isSelected={isKeySelected === i}
          onClick={() => setIsKeySelected(isKeySelected != i ? i : null)}
        ></Key>
      ))}
      <Key
        key={mainKey.keyType}
        keyType={mainKey.keyType}
        value={mainKey.value}
        isSelected={isKeySelected === 9}
        onClick={() => setIsKeySelected(isKeySelected != 9 ? 9 : null)}
        onChange={changeLetterKey}
      />
    </Keyboard>
  );
}

widget.register(Layout);

// This is a counter widget with buttons to increment and decrement the number.

import Key from "./components/Key/Key";
import Keyboard from "./components/Keyboard/Keyboard";
import { getKeys, getKeysOptions } from "./data/keysParams";

const { widget } = figma;
const { useEffect, useSyncedState, usePropertyMenu, useStickable } = widget;

type mainKeyProps = {
  keyType: string;
  value: string | null;
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

const defaultMainKey = {
  keyType: "letter",
  value: "Q",
};

function Layout() {
  const [modifyKeys, setModifyKeys] = useSyncedState("modifyKeys", ["command"]);
  const [mainKey, setMainKey] = useSyncedState<mainKeyProps>(
    "mainKey",
    defaultMainKey
  );
  const [isKeySelected, setIsKeySelected] = useSyncedState<number | null>(
    "isKeySelected",
    null
  );
  const modifyKeyVariants = getKeysOptions("modify");

  const mainKeyVariants = getKeysOptions(
    modifyKeys.length === 0 ? "all" : "main"
  );

  useStickable();

  function changeModifyKeys({ propertyName }: WidgetPropertyEvent) {
    const modifyKeysNames = getKeys("modify");
    const filteredKeys = modifyKeysNames.filter(
      (item) => !modifyKeys.includes(item)
    );
    const qt = modifyKeys.length;

    if (modifyKeysNames.includes(mainKey.keyType)) {
      setMainKey(defaultMainKey);
    }

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
    if (propertyName === "back") {
      setIsKeySelected(null);
    } else {
      const modifyKeyIndex = Number(propertyName.split("_")[1]);
      modifyKeys[modifyKeyIndex] = propertyValue;
      setModifyKeys(modifyKeys);
    }
  }

  function changeLetterKey(value: string) {
    useEffect(() => {
      setMainKey({ ...mainKey, value });
    });
  }

  switch (isKeySelected) {
    case 0:
    case 1:
    case 2:
    case 3:
      usePropertyMenu(
        [
          {
            itemType: "action",
            tooltip: "←",
            propertyName: "back",
          },
          {
            itemType: "separator",
          },
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
            itemType: "action",
            tooltip: "←",
            propertyName: "back",
          },
          {
            itemType: "separator",
          },
          {
            itemType: "dropdown",
            propertyName: "mainKey",
            tooltip: "Main key change",
            selectedOption: mainKey.keyType,
            options: mainKeyVariants,
          },
        ],
        ({ propertyName, propertyValue = "letter" }: WidgetPropertyEvent) => {
          if (propertyName === "back") {
            setIsKeySelected(null);
          } else if (propertyValue !== mainKey.keyType) {
            setMainKey({
              keyType: propertyValue,
              value: propertyValue === "letter" ? "Q" : null,
            });
          }
        }
      );
      break;
    default:
      usePropertyMenu(MAIN_PROPERTY_CONTROLS, changeModifyKeys);
  }

  console.log(mainKey, modifyKeys, isKeySelected);

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

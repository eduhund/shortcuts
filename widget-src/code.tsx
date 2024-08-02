// This is a counter widget with buttons to increment and decrement the number.

import Key from "./components/Key/Key";
import Keyboard from "./components/Keyboard/Keyboard";
import { getKeys } from "./data/keysParams";

const { widget } = figma;
const { useSyncedState, usePropertyMenu } = widget;

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

  const allKeys = getKeys();

  function changeModifyKeys({ propertyName }: { propertyName: string }) {
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

  function changeLetterKey(value: string) {
    setmainKey({ ...mainKey, value });
  }

  usePropertyMenu(MAIN_PROPERTY_CONTROLS, changeModifyKeys);

  return (
    <Keyboard>
      {modifyKeys.map((key) => (
        <Key keyType={key}></Key>
      ))}
      <Key
        keyType={mainKey.keyType}
        value={mainKey.value}
        onChange={changeLetterKey}
      />
    </Keyboard>
  );
}

widget.register(Layout);

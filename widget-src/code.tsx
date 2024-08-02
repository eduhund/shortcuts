// This is a counter widget with buttons to increment and decrement the number.

import Key from "./components/Key/Key";
import Keyboard from "./components/Keyboard/Keyboard";

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

function mainPropertyController(
  keysQt: string[],
  setKeysQt: (arg0: string[]) => void,
  propertyName: string
) {
  const qt = keysQt.length;
  if (propertyName === "+" && qt < 4) {
    keysQt.push("command");
    setKeysQt(keysQt);
  } else if (propertyName === "-" && qt > 0) {
    keysQt.pop();
    setKeysQt(keysQt);
  }
}

function Layout() {
  const [modifyKeys, setModifyKeys] = useSyncedState("modifyKeys", ["command"]);
  const [mainKey, setmainKey] = useSyncedState("mainKey", {
    keyType: "letter",
    value: "Q",
  });

  function changeLetterKey(value: string) {
    setmainKey({ ...mainKey, value });
  }

  usePropertyMenu(MAIN_PROPERTY_CONTROLS, ({ propertyName }) =>
    mainPropertyController(modifyKeys, setModifyKeys, propertyName)
  );

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

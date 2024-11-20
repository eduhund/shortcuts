// This is a counter widget with buttons to increment and decrement the number.

import Key from "./components/Key/Key";
import Keyboard from "./components/Keyboard/Keyboard";
import { getKeys, getKeysOptions } from "./data/keysParams";

const { widget } = figma;
const {
  useSyncedState,
  usePropertyMenu,
  useStickable,
  useEffect,
  useWidgetId,
} = widget;

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
  keyType: "default",
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
  const [isLimitReached, setIsLimitReached] = useSyncedState<boolean>(
    "isLimitReached",
    false
  );

  useEffect(() => {
    const allWidgets = figma.currentPage.findWidgetNodesByWidgetId(
      figma.widgetId || ""
    );

    if (!isLimitReached && allWidgets.length >= 25) {
      setIsLimitReached(true);
      allWidgets.forEach((widget) => {
        widget.setWidgetSyncedState({ isLimitReached: true });
      });
    }
  });

  const modifyKeyVariants = getKeysOptions("modify");

  const mainKeyVariants = getKeysOptions(
    modifyKeys.length === 0 ? "all" : "main"
  );

  useStickable();

  const { addClickHandler, removeClickHandler } = (() => {
    const widgetId = useWidgetId();
    let listen = true;

    async function addClickHandler() {
      if (listen) {
        const widgetNode = (await figma.getNodeByIdAsync(
          widgetId
        )) as WidgetNode;
        figma.currentPage.selection = [widgetNode];
      }
    }

    function removeClickHandler() {
      listen = false;
    }

    return { addClickHandler, removeClickHandler };
  })();

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
    setMainKey({ ...mainKey, value });
  }

  if (isLimitReached) {
    usePropertyMenu(
      [
        {
          itemType: "action",
          tooltip: "You reached the limit of 25 widgets per page.",
          propertyName: "back",
        },
        {
          itemType: "separator",
        },
        {
          itemType: "link",
          tooltip: "Get more Shortcuts",
          propertyName: "goToSite",
          href: "https://eduhund.gumroad.com/l/shortcuts",
        },
      ],
      () => {}
    );
  } else {
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
              options: modifyKeyVariants.filter(
                ({ option }) =>
                  option === modifyKeys[isKeySelected] ||
                  !modifyKeys.includes(option)
              ),
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
          ({
            propertyName,
            propertyValue = "default",
          }: WidgetPropertyEvent) => {
            if (propertyName === "back") {
              setIsKeySelected(null);
            } else if (propertyValue !== mainKey.keyType) {
              setMainKey({
                keyType: propertyValue,
                value: propertyValue === "default" ? "Q" : null,
              });
            }
          }
        );
        break;
      default:
        usePropertyMenu(MAIN_PROPERTY_CONTROLS, changeModifyKeys);
    }
  }

  return (
    <Keyboard onClick={isLimitReached ? () => {} : addClickHandler}>
      {modifyKeys.map((key, i) => (
        <Key
          key={key}
          keyType={key}
          isSelected={isKeySelected === i}
          onClick={
            isLimitReached
              ? () => {}
              : () => isKeySelected != i && setIsKeySelected(i)
          }
        ></Key>
      ))}
      <Key
        keyType={mainKey.keyType}
        value={mainKey.value}
        isSelected={isKeySelected === 9}
        disabled={isLimitReached}
        onClick={
          isLimitReached
            ? () => {}
            : () => isKeySelected != 9 && setIsKeySelected(9)
        }
        onInputClick={removeClickHandler}
        onChange={changeLetterKey}
      />
    </Keyboard>
  );
}

widget.register(Layout);

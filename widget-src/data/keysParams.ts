type LineParamsProps = {
  value: string;
  size: number;
  align: "left" | "right" | "center" | "justified";
};

export type KeysParamsProps = {
  [key: string]: {
    name: string;
    width?: number;
    vAlign?: WidgetJSX.AlignItems;
    mainLine?: LineParamsProps;
    additionalLine?: LineParamsProps;
  };
};

export const KEYS: KeysParamsProps & object = {
  letter: {
    name: "Letter",
  },
  number: {
    name: "Number",
  },
  space: {
    name: "Space",
    width: 80,
    mainLine: {
      value: "space",
      size: 8,
      align: "center",
    },
  },
  enter: {
    name: "Enter",
    width: 48,
    mainLine: {
      value: "⏎",
      size: 12,
      align: "left",
    },
    additionalLine: {
      value: "",
      size: 8,
      align: "center",
    },
  },
  backspace: {
    name: "Backspace",
    width: 48,
    mainLine: {
      value: "⌫",
      size: 12,
      align: "right",
    },
    additionalLine: {
      value: "",
      size: 8,
      align: "center",
    },
  },
  tab: {
    name: "Tab",
    width: 48,
    mainLine: {
      value: "⇥",
      size: 12,
      align: "left",
    },
    additionalLine: {
      value: "",
      size: 8,
      align: "left",
    },
  },
  escape: {
    name: "Escape",
    mainLine: {
      value: "esc",
      size: 8,
      align: "left",
    },
    additionalLine: {
      value: "",
      size: 8,
      align: "center",
    },
  },
  arrowUp: {
    name: "Arrow Up",
    mainLine: {
      value: "↑",
      size: 12,
      align: "center",
    },
  },
  arrowDown: {
    name: "Arrow Down",
    mainLine: {
      value: "↓",
      size: 12,
      align: "center",
    },
  },
  arrowLeft: {
    name: "Arrow Left",
    mainLine: {
      value: "←",
      size: 12,
      align: "center",
    },
  },
  arrowRight: {
    name: "Arrow Right",
    mainLine: {
      value: "→",
      size: 12,
      align: "center",
    },
  },
  command: {
    name: "Command",
    width: 48,
    mainLine: {
      value: "command",
      size: 8,
      align: "right",
    },
    additionalLine: {
      value: "⌘",
      size: 12,
      align: "right",
    },
  },
  option: {
    name: "Option",
    mainLine: {
      value: "option",
      size: 8,
      align: "right",
    },
    additionalLine: {
      value: "⌥",
      size: 12,
      align: "right",
    },
  },
  control: {
    name: "Control",
    mainLine: {
      value: "control",
      size: 8,
      align: "right",
    },
    additionalLine: {
      value: "⌃",
      size: 12,
      align: "right",
    },
  },
  shift: {
    name: "Shift",
    width: 48,
    mainLine: {
      value: "⇧",
      size: 12,
      align: "left",
    },
    additionalLine: {
      value: "",
      size: 8,
      align: "center",
    },
  },
  capsLock: {
    name: "Caps Lock",
    width: 48,
    mainLine: {
      value: "⇪",
      size: 12,
      align: "left",
    },
    additionalLine: {
      value: "•",
      size: 8,
      align: "left",
    },
  },
  fn: {
    name: "Fn",
    mainLine: {
      value: "🌐",
      size: 12,
      align: "left",
    },
    additionalLine: {
      value: "fn",
      size: 8,
      align: "right",
    },
  },
};

const mainKeysList = [
  "letter",
  "number",
  "space",
  "enter",
  "backspace",
  "tab",
  "escape",
  "arrowUp",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
];

const modifyKeysList = ["command", "option", "control", "shift", "fn"];

export function getKeys(type: "modify" | "main" | "all" = "all") {
  switch (type) {
    case "modify":
      return modifyKeysList;
    case "main":
      return mainKeysList;
    case "all":
    default:
      return Object.keys(KEYS);
  }
}

export function getKey(key: string) {
  return KEYS[key] || {};
}

export function getKeysOptions(type: "modify" | "main" | "all" = "all") {
  const keys = getKeys(type);
  return keys.map((key) => {
    return {
      option: key,
      label: KEYS[key]?.name || "Unknown",
    };
  });
}

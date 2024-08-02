type LineParamsProps = {
  value: string;
  size: number;
  align: "left" | "right" | "center" | "justified";
};

export type KeysParamsProps = {
  [key: string]: {
    width?: number;
    mainLine: LineParamsProps;
    additionalLine?: LineParamsProps;
  };
};

export const MODIFY_KEYS: KeysParamsProps = {
  command: {
    width: 46,
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
    width: 35,
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
    width: 35,
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
    width: 46,
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
};

export function getKeys() {
  return Object.keys(MODIFY_KEYS);
}

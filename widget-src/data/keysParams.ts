export type KeysParamsProps = {
  [key: string]: {
    width?: number;
    verticalAlign?: WidgetJSX.AlignItems | undefined;
    horizontalAlign?: string;
    mainLine?: string;
    mainLineHeight?: number;
    supLine?: string;
    supLineHeight?: number;
  };
};

export const MODIFY_KEYS: KeysParamsProps = {
  letter: {},
  command: {
    width: 46,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "command",
    mainLineHeight: 8,
    supLine: "⌘",
    supLineHeight: 12,
  },
  option: {
    width: 35,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "option",
    mainLineHeight: 8,
    supLine: "⌥",
    supLineHeight: 12,
  },
  control: {
    width: 35,
    verticalAlign: "end",
    horizontalAlign: "end",
    mainLine: "control",
    mainLineHeight: 8,
    supLine: "⌃",
    supLineHeight: 12,
  },
};

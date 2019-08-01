export type ReturnType<T extends (...args: any[]) => any> = 
  T extends (...args: any[]) => infer R ? R : never;

// https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

export enum PalleteNames {
  columnBackground = 'Column BG',
  menuBackgroundHover = 'Menu BG Hover',
  activeItem = 'Active Item',
  activeTextItem = 'Active Item Text',
  hoverItem = 'Hover Item',
  textColor = 'Text Color',
  activePresence = 'Active Presence',
  mentionBadge = 'Mention Badge',
}

export type SlackPalette = {
  columnBackground: string;
  menuBackgroundHover: string;
  activeItem: string;
  activeTextItem: string;
  hoverItem: string;
  textColor: string;
  activePresence: string;
  mentionBadge: string;
};
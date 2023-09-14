export type Screens = 'Blast List' | 'none';

export enum ScreenEnum {
  Inbox = 'Inbox' as any,
  Friends = 'Friends' as any,
  Status = 'Status' as any,
  Contacts = 'Contacts' as any,
  Posts = 'Posts' as any,
}

export namespace ScreenEnum {
  export const valueToKey = (value: String): ScreenEnum =>
    ScreenEnum[value as keyof typeof ScreenEnum] as ScreenEnum;

  export const getString = (value: ScreenEnum): string => {
    return ScreenEnum[value];
  };
}

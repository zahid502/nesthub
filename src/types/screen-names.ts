export enum ScreenEnum {
  Inbox = 'Inbox' as any,
  Friends = 'Friends' as any,
  Status = 'Status' as any,
  Contacts = 'Contacts' as any,
  Posts = 'Posts' as any,
  CreatePost = 'CreatePost' as any,
  FriendRequest = 'FriendRequest' as any,
  YourFriends = 'YourFriends' as any,
  Search = 'Search' as any,
  Chat = 'Chat' as any,
}

export namespace ScreenEnum {
  export const valueToKey = (value: String): ScreenEnum =>
    ScreenEnum[value as keyof typeof ScreenEnum] as ScreenEnum;

  export const getString = (value: ScreenEnum): string => {
    return ScreenEnum[value];
  };
}

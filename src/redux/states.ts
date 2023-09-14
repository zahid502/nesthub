export type BaseState<T> = {
    message: string;
    error: boolean;
    loading: boolean;
    data?: T;
  };
//----------------------------------------------------------------
export type RouteBottomState = BaseState<any> & {
    mainRoute?: string;
    routeParams?: string;
  };
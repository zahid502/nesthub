export class SearchUtil {
  private static _instance: SearchUtil;

  private constructor() {}

  public static getInstance = () => {
    if (!SearchUtil._instance) {
      SearchUtil._instance = new SearchUtil();
    }

    return SearchUtil._instance;
  };

  public searchItem = (search: string, data: { name: string }[]): { name: string }[] | undefined => {
    if (search?.trim() === '') return undefined; // Added type for return value

    const searchTerm = search.toLowerCase();
    const searchedData = data?.filter(item => item?.name?.toLowerCase()?.includes(searchTerm));

    return searchedData;
  };
}

export class NumberUtil {
  private static _instance: NumberUtil;
  private constructor() {}

  public static getInstance = () => {
    if (!NumberUtil._instance) {
      NumberUtil._instance = new NumberUtil();
    }

    return NumberUtil._instance;
  };

  public formatNumber = (num: number): string =>{
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  
}
// 宣告支出分類的 enum，只有食、衣、住、行
export enum ExpenseCategory {
  Food = "食",
  Clothing = "衣",
  Housing = "住",
  Transportation = "行",
}

// 定義一筆支出資料的格式，包含標題、金額、日期與時間、分類，其中 id 是可選的，每一個屬性都加註 jsDoc 註解
export interface IExpenseEntry {
  /**
   *  這筆支出的唯一識別碼
   * */
  id?: string;
  /**
   *  這筆支出的標題
   * */
  title: string;
  /**
   *  這筆支出的金額
   * */
  value: number;
  /**
   *  這筆支出的日期與時間
   * */
  dateTime: string;
  /**
   *  這筆支出的分類
   * */
  category: ExpenseCategory;
}

export interface IExpenseApiResponse {
  entries: IExpenseEntry[];
}

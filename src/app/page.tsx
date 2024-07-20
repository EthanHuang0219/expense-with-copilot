// src/app/page.tsx
import { use } from "react";
import { IExpenseApiResponse } from "@/lib/type";
import EditableEntryRow from "./clientComponent/EditableEntryRow";
import NewEntryRow from "./clientComponent/NewEntryRow";

async function fetchData() {
  const response = await fetch("http://localhost:3000/api/data", {
    cache: "no-store", // 確保每次請求都會獲取最新數據
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

const HomePage = () => {
  const data = use(fetchData()) as IExpenseApiResponse;
  const expenses = data.entries;

  return (
    <>
      <div>
        {/* 頁面標題：支出總表，置中 */}
        <h1 className="text-center">支出總表</h1>
        {/* 以表格方式呈現 expenses */}
        {/* 表頭是 支出總表 四個字，置中 */}
        {/* 每一個 expense entry 自己一個 row ，由左至右分別為項次、標題、金額、日期時間（yyyy/mm/dd hh:mm)、分類，所有項目標題都置中*/}
        {/* 金額右對齊，日期時間與分類置中 */}
        {/* 每一個 row 之間的間隔是 8px */}
        {/* 最右邊再加一操控欄位，裡面有一個編輯、刪除按鈕 */}
        {/* 採用 bootstrap 的表格、按鈕 style */}
        {/* 每一個 row 的 key 是 entry.id */}
        {/* 項次、分類、操作固定寬度為 1 單位，而標題、金額、日期時間固定為 2 單位*/}
        {/* 最下方再加一個 AddEntryForm */}
        <table className="table">
          {/* 文字都置中 */}
          <thead>
            <tr className="text-center">
              <th className="col-1">項次</th>
              <th className="col-2">標題</th>
              <th className="col-1">金額</th>
              <th className="col-2">日期時間</th>
              <th className="col-1">分類</th>
              <th className="col-1">操作</th>
            </tr>
          </thead>
          <tbody>
            {/* 根據 entry.dateTime 由舊到新排序 */}
            {expenses
              .sort((a, b) => a.dateTime.localeCompare(b.dateTime))
              .map((entry, index) => (
                <EditableEntryRow key={entry.id} entry={entry} index={index} />
              ))}
          </tbody>
        </table>
      </div>
      <NewEntryRow />
    </>
  );
};

export default HomePage;

"use client";

import { ExpenseCategory, IExpenseEntry } from "@/lib/type";
import { useState } from "react";
import EntryForm from "./EntryForm";

const NewEntryRow = () => {
  const DEFAULT_ENTRY_INPUT: IExpenseEntry = {
    title: "",
    value: 0,
    dateTime: new Date().toISOString(),
    category: ExpenseCategory.Food,
  };

  // 用一個 state 來表示 entry 的輸入狀態
  const [entry, setEntry] = useState(DEFAULT_ENTRY_INPUT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 若 title 為空字串或 value 為 0，則不新增 entry
    if (entry.title === "" || entry.value === 0) {
      alert("標題與金額為必填欄位");
      return;
    }

    const res = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      alert("新增成功");
      setEntry(DEFAULT_ENTRY_INPUT);
      window.location.reload();
    } else {
      alert(`新增失敗, 原因: ${res}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="table table-secondary">
        <tbody>
          <tr>
            <td className="col-1"></td>
            <EntryForm entry={entry} setEntry={setEntry} />
            <td className="col-1 text-center">
              <button type="submit" className="btn btn-success">
                新增
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default NewEntryRow;

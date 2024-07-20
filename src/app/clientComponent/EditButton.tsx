"use client";

import { IExpenseEntry } from "@/lib/type";

// 一個編輯按鈕，傳入 mode 和一筆 entry
// 當 mode = view 時，切換為 edit 模式
// 當 mode = edit 時，先觸發編輯指定 id 的 entry，使用 /api/data method PUT，再切換為 view 模式

export const EditButton = ({
  mode,
  entry,
  setMode,
}: {
  mode: "view" | "edit";
  entry: IExpenseEntry;
  setMode: (mode: "view" | "edit") => void;
}) => {
  const onClickEdit = async () => {
    if (mode === "view") {
      setMode("edit");
    } else {
      // 觸發編輯指定 id 的 entry，使用 /api/data method PUT
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...entry }),
      });
      if (res.ok) {
        alert("更新成功");
        window.location.reload();
      } else {
        alert(`更新失敗, 原因: ${res}`);
      }
      setMode("view");
    }
  };

  return (
    <button className="btn btn-primary me-2" onClick={onClickEdit}>
      {mode === "view" ? "編輯" : "確認"}
    </button>
  );
};

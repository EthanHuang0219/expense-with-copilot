// 將 page.tsx 的 EntryRow 改為 EditableEntryRow，並將其移至 src/app/clientComponent/EditableEntryRow.tsx

"use client";

import { useState } from "react";
import { IExpenseEntry } from "../../lib/type";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import EntryForm from "./EntryForm";

const EditableEntryRow = ({
  entry,
  index,
}: {
  entry: IExpenseEntry;
  index: number;
}) => {
  // 用 mode 切換 view, edit 模式
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [editedEntry, setEditedEntry] = useState(entry);

  return (
    <tr key={entry.id}>
      <td className="text-center">{index + 1}</td>
      {mode === "view" ? (
        <>
          <td className="text-center">{entry.title}</td>
          {/* 金額右對齊 */}
          <td className="text-end">{entry.value.toLocaleString()}</td>
          {/* 日期時間由 ISO string 轉換為 yyyy-mm-dd hh:mm */}
          <td className="text-center">
            {new Date(entry.dateTime).toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Taipei",
            })}
          </td>
          {/* 分類置中 */}
          <td className="text-center">{entry.category}</td>
        </>
      ) : (
        <EntryForm entry={editedEntry} setEntry={setEditedEntry} />
      )}
      {/* 兩顆按鈕要左右間隔 4px */}
      <td className="text-center">
        {/* 觸發 onClickEdit 的編輯按鈕 */}
        <EditButton mode={mode} entry={editedEntry} setMode={setMode} />
        {/* 觸發 onClickDelete 的刪除按鈕 */}
        <DeleteButton id={entry.id ?? ""} />
      </td>
    </tr>
  );
};

export default EditableEntryRow;

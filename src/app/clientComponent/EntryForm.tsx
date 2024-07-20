"use client";

import { ExpenseCategory, IExpenseEntry } from "@/lib/type";
import { getDateString, getTimeString } from "@/util/time.helper";
import { Dispatch, SetStateAction } from "react";

const EntryForm = ({
  entry,
  setEntry,
}: {
  entry: IExpenseEntry;
  setEntry: Dispatch<SetStateAction<IExpenseEntry>>;
}) => {
  const dateString = getDateString(entry.dateTime);
  const timeString = getTimeString(entry.dateTime);

  return (
    <>
      <td className="col-2">
        <input
          type="text"
          value={entry.title}
          onChange={(e) =>
            setEntry((prev) => ({ ...prev, title: e.target.value }))
          }
          className="form-control"
        />
      </td>
      <td className="col-1">
        <input
          type="number"
          value={entry.value}
          // 金額數字不能小於 0 ，所以加上 min="0"
          min="0"
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              value: Number(e.target.value),
            }))
          }
          className="form-control text-end"
        />
      </td>
      <td className="col-2">
        {/* 並排呈現 限制大小不能超過 td 寬度*/}
        <div className="d-flex flex-wrap">
          {/* 選擇日期 */}
          <div className="text-center flex-grow-1">
            <input
              type="date"
              // 日期限制不能早於今日 1 年以前
              min={getDateString(
                new Date(
                  new Date().setFullYear(new Date().getFullYear() - 1)
                ).toISOString()
              )}
              value={dateString}
              onChange={(e) =>
                setEntry((prev) => ({
                  ...prev,
                  dateTime: new Date(
                    `${e.target.value}T${timeString}`
                  ).toISOString(),
                }))
              }
              className="form-control text-center flex-grow-1"
            />
          </div>
          {/* 選擇幾點幾分 */}
          <div className="text-center flex-grow-1">
            <input
              type="time"
              value={timeString}
              onChange={(e) =>
                setEntry((prev) => ({
                  ...prev,
                  dateTime: new Date(
                    `${dateString}T${e.target.value}`
                  ).toISOString(),
                }))
              }
              className="form-control text-center flex-grow-1"
            />
          </div>
        </div>
      </td>
      <td className="col-1">
        <select
          value={entry.category}
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              category: e.target.value as ExpenseCategory,
            }))
          }
          className="form-control"
        >
          <option value={ExpenseCategory.Food}>食</option>
          <option value={ExpenseCategory.Clothing}>衣</option>
          <option value={ExpenseCategory.Housing}>住</option>
          <option value={ExpenseCategory.Transportation}>行</option>
        </select>
      </td>
    </>
  );
};

export default EntryForm;

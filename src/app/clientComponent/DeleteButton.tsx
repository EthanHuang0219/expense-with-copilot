"use client";

// 一個刪除按鈕，按下後會刪除指定 id 的 entry
// onClickDelete 觸發時，刪除指定 id 的 entry，使用 /api/data method DELETE

export const DeleteButton = ({ id }: { id: string }) => {
  const onClickDelete = async () => {
    if (!id) {
      alert("支出 id 不存在");
      return;
    }

    const res = await fetch("/api/data", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("刪除成功");
      window.location.reload();
    } else {
      alert(`刪除失敗, 原因: ${res}`);
    }
  };

  return (
    <button className="btn btn-danger" onClick={onClickDelete}>
      刪除
    </button>
  );
};

// src/app/api/data/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 } from "uuid";
import { IExpenseEntry } from "@/lib/type";

const dataFilePath = path.join(process.cwd(), "src", "app", "data.json");

// 針對一筆支出資料，提供 CRUD 四支 RESTFUL 風格的 API
// GET 分為讀取全部與讀取單筆

export async function GET() {
  try {
    // 读取 JSON 文件内容
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, value, dateTime, category } =
      (await req.json()) as IExpenseEntry;

    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    // 用 uuid v10.0.0 生成新的 ID
    const id = v4();

    const newEntry: IExpenseEntry = {
      id,
      title,
      value,
      dateTime,
      category,
    };
    data.entries.push(newEntry);

    // 将数据写回文件
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Entry added successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add entry", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, value, dateTime, category } =
      (await req.json()) as IExpenseEntry;
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    const entryIndex = data.entries.findIndex(
      (entry: IExpenseEntry) => entry.id === id
    );
    if (entryIndex === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    } else {
      data.entries[entryIndex] = { id, title, value, dateTime, category };
    }

    // 将数据写回文件
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Entry updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    const entryIndex = data.entries.findIndex(
      (entry: IExpenseEntry) => entry.id === id
    );
    if (entryIndex === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    } else {
      data.entries.splice(entryIndex, 1);
    }

    // 将数据写回文件
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     // 读取 JSON 文件内容
//     const fileContent = await fs.readFile(dataFilePath, "utf-8");
//     const data = JSON.parse(fileContent);

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { title, value, date } = await req.json();

//     const fileContent = await fs.readFile(dataFilePath, "utf-8");
//     const data = JSON.parse(fileContent);

//     const newEntry = { title, value, date };
//     data.entries.push(newEntry);

//     // 将数据写回文件
//     await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

//     return NextResponse.json({ message: "Entry added successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
//   }
// }

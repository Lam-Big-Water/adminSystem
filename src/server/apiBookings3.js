// import { PAGE_SIZE } from "../utils/constants";
// import supabase from "./supabase";

// export async function getBookings({filter, page, search}) {
//   let query = supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
//       { count: "exact" }
//     );
//     console.log(query)

//   // Filter
//   if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

//   // Search (修正：对数字字段使用精确匹配)
//   if (search) {
//     // 方法1: 使用 or 过滤器配合嵌套字段路径
//     query = query.or(`guests.fullName.ilike.%${search}%`);

//     // 或者方法2: 如果只搜索 fullName
//     // query = query.or(`guests.fullName.ilike.%${search}%`);
//   }
//   // Page
//   if (page) {
//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE - 1;
//     query = query.range(from, to);
//   }

//   const { data, error, count } = await query;
//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not be loaded");
//   }
//   return { data, count };
// }

import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBookings({ filter, page, search }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  console.log(query);

  // Filter
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // Search - 对于嵌套关系的搜索，需要先查询 guests 表
  if (search) {
    // 先查询匹配的 guests
    const { data: matchingGuests, error: guestsError } = await supabase
      .from("guests")
      .select("id")
      .or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);

    if (guestsError) {
      console.error(guestsError);
      throw new Error("Guests could not be loaded");
    }

    // 如果找到匹配的 guests，过滤 bookings
    if (matchingGuests && matchingGuests.length > 0) {
      const guestIds = matchingGuests.map((g) => g.id);
      // 注意：这里需要替换为你的实际外键字段名，可能是 "guestId" 或 "guest_id"
      query = query.in("guestId", guestIds);
    } else {
      // 如果没有匹配的 guests，返回空结果
      query = query.eq("guestId", -1); // 使用一个不存在的 ID
    }
  }

  // Page
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

/*
# Supabase 嵌套关系字段搜索问题与解决方案

## 问题背景
在使用 Supabase 查询关联数据时，发现无法直接在 `bookings` 表中对嵌套的 `guests` 关系字段（如 `guests.fullName`）使用 `ilike` 进行搜索过滤。

## 问题原因
**Supabase/PostgREST 不支持在嵌套关系字段上直接使用 `ilike` 操作符**。当使用 `select()` 包含嵌套关系（如 `guests(fullName, email)`）时，无法直接在 `or()` 方法中引用这些嵌套字段进行模糊搜索。

## 解决方案
改用两步查询法：
1. **先查询 guests 表**：获取匹配搜索关键词的客人ID列表
2. **再用结果过滤 bookings 表**：使用 `in()` 方法根据客人ID过滤预订记录

## 修正后的代码实现

```javascript
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBookings({ filter, page, search }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // Filter - 原有状态过滤
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // Search - 对于嵌套关系的搜索，需要先查询 guests 表
  if (search) {
    // 先查询匹配的 guests
    const { data: matchingGuests, error: guestsError } = await supabase
      .from("guests")
      .select("id")
      .or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);

    if (guestsError) {
      console.error(guestsError);
      throw new Error("Guests could not be loaded");
    }

    // 如果找到匹配的 guests，过滤 bookings
    if (matchingGuests && matchingGuests.length > 0) {
      const guestIds = matchingGuests.map(g => g.id);
      // 注意：这里需要替换为你的实际外键字段名
      query = query.in("guestId", guestIds);
    } else {
      // 如果没有匹配的 guests，返回空结果
      query = query.eq("guestId", -1); // 使用一个不存在的 ID
    }
  }

  // Page - 分页逻辑
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  
  return { data, count };
}
```

## 重要提示

### 关键修改点
需要将代码中的 `"guestId"` 替换为 `bookings` 表中实际关联 `guests` 表的外键字段名。

### 常见的外键字段名
- `guestId`
- `guest_id` 
- `guestId`

### 如何找到正确的字段名
1. 在 **Supabase 仪表板**查看 `bookings` 表结构
2. 查看外键关系定义
3. 查看数据库 schema 文件
4. 运行测试，错误信息会提示正确的字段名

### 注意事项
- 如果没有匹配的客人，代码会返回空结果（通过 `eq("guestId", -1)` 实现）
- 此解决方案适用于其他类似的嵌套关系搜索场景
- 确保搜索字段名与数据库实际列名一致

*/

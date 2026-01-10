import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import {X} from "lucide-react"

function BookingsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);

  // 创建更新 URL 的函数
  const updateSearchParams = (value) => {
    // 为什么需要使用 new URLSearchParams(searchParams)？
    // searchParams 是 React Router 提供的 不可变（immutable） 对象
    /*
    创建副本：创建 searchParams 的一个新副本

    保持不可变性：修改副本而不影响原始对象

    确保重新渲染：传给 setSearchParams 新对象，React 才能检测到变化
    */
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // 防抖版本的更新函数
  const debouncedUpdateSearch = useDebounce(updateSearchParams, 700);

  // 处理输入变化
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value); // 立即更新 UI
    debouncedUpdateSearch(value); // 防抖更新 URL
  };

  // 清除搜索
  const handleClear = () => {
    setSearchInput("");
    updateSearchParams(""); // 清除时立即执行
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        className="flex min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs 
      transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground 
      file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium 
      file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none 
      disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 
      focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
      aria-invalid:border-destructive aria-invalid:ring-destructive/20 
      dark:aria-invalid:ring-destructive/40 h-9 w-40 lg:w-[250px]"
        type="text"
        placeholder="Name&Email..."
        value={searchInput}
        onChange={handleInputChange}
      />

      {searchInput && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted-foreground"
          onClick={handleClear}
        >
          <X size={16}/>
        </button>
      )}
    </div>
  );
}

export default BookingsTable;


/*
`?page=1&Status=all`: 当你使用 URLSearchParams 时，它会自动处理这个格式：

graph TD
    A[用户输入] --> B[onChange 事件]
    B --> C[setSearchInput<br/>立即更新输入框]
    B --> D[debouncedUpdateSearch<br/>启动防抖定时器]
    D -->|700ms无新输入| E[updateSearchParams]
    E --> F[new URLSearchParams<br/>创建不可变副本]
    F --> G[设置/删除search参数]
    G --> H[设置page=1参数]
    H --> I[setSearchParams<br/>更新URL]
    I --> J[组件重新渲染]
    J --> K[urlSearch获取新值<br/>但searchInput保持不变]
*/ 
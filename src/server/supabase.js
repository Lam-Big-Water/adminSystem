import { createClient } from "@supabase/supabase-js";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const mobileStorage = {
  getItem: (key) => {
    try {
      // 优先使用 sessionStorage（移动端更可靠）
      if (typeof sessionStorage !== "undefined") {
        const value = sessionStorage.getItem(key);
        if (value) return value;
      }
      // 后备到 localStorage
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn("移动端存储读取失败:", error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      // 双重存储确保数据安全
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem(key, value);
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn("移动端存储写入失败:", error);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem(key);
      }
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn("移动端存储删除失败:", error);
    }
  },
};

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supbaseRoleKey = import.meta.env.VITE_SUPABASE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: "pkce", // 必须使用 PKCE
    autoRefreshToken: false, // 移动端关闭自动刷新
    persistSession: true,
    detectSessionInUrl: true,
    storage: mobileStorage,
    // 移动端特定配置
    ...(isMobile && {
      autoRefreshToken: false,
      persistSession: true,
    }),
  },
});

export const supabaseAdmin = createClient(
  supabaseUrl,
  supbaseRoleKey,

  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabase;

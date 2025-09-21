import React, {useState, useEffect} from 'react'
import { FaRegFileLines, FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

import { formatDate } from './utils/formatDate';

const ImgExpand = ({created_at, onCloseModal, fileName, image}) => {


  const [isCopied, setIsCopied] = useState(false);



  // 安全复制函数（兼容所有现代浏览器）
  const copyToClipboard = async (text) => {
    try {
      // 方案1: 首选 Clipboard API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // 方案2: 兼容 Safari 和旧版浏览器
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';  // 防止滚动
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        // 使用更现代的 Selection API 替代 execCommand
        const selection = document.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textarea);
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        return success;
      } finally {
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error('复制失败:', err);
      return false;
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(image);
    setIsCopied(success);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
        <div>
          <h2 id="modal-title" className="sr-only">Image Preview</h2>
          <button 
            onClick={() => onCloseModal?.()} 
            className='absolute top-4 right-4 text-2xl text-amber-50 cursor-pointer hover:bg-gray-700 rounded-sm'
            aria-label="Close image preview"
          >
            <IoMdClose aria-hidden="true"/>
          </button>
            <img 
              className='w-[400px] h-[200px] object-cover border-[1.4px] border-[var(--border)]' 
              src={image} 
              alt={`Preview of ${fileName}`} 
            />
            <h3 className='text-lg text-gray-100 py-5'>{fileName}</h3>

            <p className='text-sm text-gray-300'>Added on</p>
            {/* 2025-03-16T12:47:44.498Z */}
            <p className='text-base text-gray-100 pb-5'>{formatDate(created_at)}</p>

            {/* <button className='flex items-center gap-2 py-0.5 px-2 border-[1.4px] border-[var(--border)] text-sm font-medium rounded-md cursor-pointer hover:bg-gray-500/20'><FaRegFileLines />Get URL</button> */}

            <div className="copy-container">
            <button
              className='flex items-center gap-2 py-0.5 px-2 border-[1.4px] border-[var(--border)] text-sm font-medium rounded-md cursor-pointer hover:bg-gray-500/20'
              onClick={handleCopy}
              aria-label="Copy image URL"
            >
              {isCopied ? (
                <>
                  <FaCheck className="icon" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <IoCopyOutline className="font-bold w-4 h-4" />
                  <span>GET URL</span>
                </>
              )}
            </button>
            
            {/* 无障碍提示 */}
            {isCopied && (
              <div className='sr-only' role="alert">
                The Image URL is Copied!
              </div>
            )}
          </div>
        </div>
    </>
  )
}

export default ImgExpand
import React, { useState, useRef, useEffect } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

const ShadcnPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });
  
  const popoverRef = useRef(null);
  
  // 计算已选中的数量
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  
  // 处理复选框变化
  const handleCheckboxChange = (key) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // 重置所有复选框
  const handleReset = () => {
    const resetItems = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setCheckedItems(resetItems);
  };
  
  // 点击外部关闭 Popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // 复选框选项配置
  const checkboxOptions = [
    { id: 'option1', label: '个人资料设置' },
    { id: 'option2', label: '通知偏好' },
    { id: 'option3', label: '隐私选项' },
    { id: 'option4', label: '账户安全' },
    { id: 'option5', label: '数据同步' },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative" ref={popoverRef}>
        {/* Popover 触发按钮 - Shadcn UI 风格 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-12 px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-gray-900 text-sm font-medium shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-gray-500" />
            选择设置项
          </span>
          
          {/* 计数徽章和重置按钮容器 */}
          <div className="flex items-center gap-1">
            {/* 计数徽章 */}
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center min-w-6 h-6 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {checkedCount}
              </span>
            </div>
            
            {/* 重置按钮 */}
            {checkedCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="ml-1 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                title="重置所有选择"
                aria-label="重置所有选择"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </button>
        
        {/* Popover 内容 - Shadcn UI 风格 */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg border border-gray-200 shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
            {/* 标题和关闭按钮 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">选择设置项</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* 复选框列表 */}
            <div className="p-4 space-y-3">
              {checkboxOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 cursor-pointer select-none"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={checkedItems[option.id]}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="peer h-4 w-4 shrink-0 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {/* <div className="absolute inset-0 h-4 w-4 rounded border-2 border-transparent peer-checked:border-gray-900 pointer-events-none"></div> */}
                    {/* <Check className="absolute h-3 w-3 text-gray-900 opacity-0 peer-checked:opacity-100 pointer-events-none" /> */}
                  </div>
                  <span className="text-sm text-gray-700 leading-none">{option.label}</span>
                </label>
              ))}
            </div>
            
            {/* 底部操作栏 */}
            <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
              <div className="text-sm text-gray-600">
                已选择 <span className="font-semibold text-gray-900">{checkedCount}</span> 项
              </div>
              
              <div className="flex items-center gap-2">
                {/* 独立的重置按钮 */}
                <button
                  onClick={handleReset}
                  disabled={checkedCount === 0}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  重置
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-3 py-1.5 h-8 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors"
                >
                  完成
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 使用说明 */}
      {/* <div className="mt-12 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">组件功能说明</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check className="h-3 w-3 text-gray-600" />
            </div>
            <span>点击按钮打开/关闭 Popover，采用 Shadcn UI 设计风格</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check className="h-3 w-3 text-gray-600" />
            </div>
            <span>按钮右侧显示当前选中的复选框数量</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check className="h-3 w-3 text-gray-600" />
            </div>
            <span>当有选中项时，计数徽章旁显示重置按钮，点击可重置所有选择</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check className="h-3 w-3 text-gray-600" />
            </div>
            <span>Popover 底部也有独立的重置按钮和完成按钮</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check className="h-3 w-3 text-gray-600" />
            </div>
            <span>当前选中: <span className="font-medium text-gray-900">{checkedCount}</span> 个选项</span>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default ShadcnPopover;
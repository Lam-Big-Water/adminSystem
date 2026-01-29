import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, 
  ChevronDown, 
  Building,
  Users,
  Calendar,
  DollarSign,
  Tag,
  BarChart
} from 'lucide-react';

const FilterPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 筛选选项配置
  const filterOptions = [
    { 
      id: 'company', 
      label: '公司名称', 
      value: 'company_name',
      icon: <Building className="h-4 w-4" />,
      description: '按公司名称筛选',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'department', 
      label: '部门', 
      value: 'department',
      icon: <Users className="h-4 w-4" />,
      description: '按部门筛选',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 'date', 
      label: '日期范围', 
      value: 'date_range',
      icon: <Calendar className="h-4 w-4" />,
      description: '按日期范围筛选',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      id: 'budget', 
      label: '预算范围', 
      value: 'budget_range',
      icon: <DollarSign className="h-4 w-4" />,
      description: '按预算范围筛选',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    { 
      id: 'category', 
      label: '类别', 
      value: 'category',
      icon: <Tag className="h-4 w-4" />,
      description: '按类别筛选',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      id: 'status', 
      label: '状态', 
      value: 'status',
      icon: <BarChart className="h-4 w-4" />,
      description: '按状态筛选',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
  ];

  // 设置默认选择为第一栏
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  
  const popoverRef = useRef(null);

  // 处理选项选择
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">数据筛选器</h1>
        <p className="text-gray-600 mb-8">使用 Popover 组件进行筛选，默认选中第一个选项</p> */}
        
        <div className="relative" ref={popoverRef}>
          {/* 筛选按钮 - 显示选中值 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-between w-full max-w-md px-4 py-3 h-12 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm font-medium shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-md ${selectedOption.bgColor}`}>
                <span className={selectedOption.color}>
                  {selectedOption.icon}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-900">{selectedOption.label}</span>
                <span className="text-xs text-gray-500">{selectedOption.description}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          {/* Popover 内容 */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-xl z-50 animate-in fade-in-0 zoom-in-95">
              {/* 选项列表 */}
              <div className="max-h-80 overflow-y-auto">
                <div className="p-2">
                  {filterOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedOption.id === option.id ? 'bg-gray-50 border border-gray-200' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${option.bgColor}`}>
                          <span className={option.color}>
                            {option.icon}
                          </span>
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-gray-900">{option.label}</span>
                          <span className="text-xs text-gray-500">{option.description}</span>
                        </div>
                      </div>
                      
                      {/* 选中标记 */}
                      {selectedOption.id === option.id && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 选中的值显示区域 */}
        {/* <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">当前筛选条件</h3>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`p-3 rounded-lg ${selectedOption.bgColor}`}>
              <span className={selectedOption.color}>
                {selectedOption.icon}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xl font-bold text-gray-900">{selectedOption.label}</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  已应用
                </span>
              </div>
              <p className="text-gray-600 mb-4">{selectedOption.description}</p> */}
              
              {/* 模拟筛选值输入 */}
              {/* <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    筛选值
                  </label>
                  <input
                    type="text"
                    placeholder={`输入${selectedOption.label.toLowerCase()}...`}
                    className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* 使用说明 */}
        {/* <div className="mt-12 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">组件功能说明</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">默认选择</h4>
                <p className="text-sm text-gray-600">组件初始化时默认选择第一栏选项，按钮上显示默认选项</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">选中状态标记</h4>
                <p className="text-sm text-gray-600">重新打开 Popover 时，已选中的条件会显示打勾图标标记</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">选择切换</h4>
                <p className="text-sm text-gray-600">点击其他选项会立即切换选择，按钮和底部区域会同步更新</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FilterPopover;
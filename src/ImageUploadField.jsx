import React from 'react'
import { FiUpload } from 'react-icons/fi';


const ImageUploadField = ({
    label,
    id,
    register,
    errors,
    previewImage,
    currentImage,
    handleImageChange,
    isEditSession = false,
    required = true,
}) => {
    const errorMessage = errors?.[id]?.message;
    const isError = !!errorMessage;

  return (
    <div>
        {isEditSession ? (
            <div className='relative'>
                <label htmlFor="current photo" className='mb-2 block text-sm font-medium'>
                    Current photo
                </label>
                <img className='w-full max-w-[300px] max-h-[300px] object-fill rounded-sm' src={previewImage || currentImage} alt="" />

                <div>
                    <label 
                    htmlFor={id}
                    className='p-2 text-black bg-white absolute top-2 right-1 block text-sm font-medium cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-sm'
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            document.getElementById(id).click();
                        }
                    }}
                    >
                        <span className='hidden sm:inline'>Update photo</span>
                        <FiUpload className='sm:hidden w-4 h-4'/>
                    </label>

                    <input 
                    {...register(id, {
                        required: required ? "This field is required" : false,
                    })}
                    type="file"
                    accept="image/*"
                    id={id}
                    className='hiddenFileInput'
                    onChange={handleImageChange}
                    />
                </div>
            </div>
        ) : (
            <>
                <label
                    htmlFor={id}
                    className={`mb-2 block text-sm font-medium ${isError ? "text-red-400 " : "text-white"}`}
                >
                    {label}
                    {isError && (
                        <span className='text-[0.75rem]'>{` - ${errorMessage}`}</span>
                    )}
                </label>

                <input
                {...register(id, {
                    required: required ? "This field is required" : false,
                })}
                type="file"
                accept='image/*'
                id={id}
                className='relative w-full bg-[var(--hoverBackground)] rounded-sm border-[1.4px] border-[var(--border)] focus:outline-1 focus:outline-gray-300 p-2 text-white'
                />
            </>
        )}
    </div>
  )
}

export default ImageUploadField
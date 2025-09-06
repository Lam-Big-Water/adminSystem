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
    <div className='text-[var(--text-primary)]'>
        {isEditSession ? (
            <div className='relative'>
                <label htmlFor="current photo" className='text-[var(--text-primary)] mb-2 block text-sm font-medium'>
                    Current photo
                </label>
                <img className='w-full max-w-[300px] max-h-[300px] object-fill rounded-sm' src={previewImage || currentImage} alt="" />

                <div>
                    <label 
                    htmlFor={id}
                    className='p-2 text-[var(--text-primary)] bg-[var(--color-block)] absolute top-2 right-1 block text-sm font-medium cursor-pointer rounded-sm'
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
                    className={`mb-2 block text-sm font-medium ${isError ? "text-red-400 " : "text-[var(--text-primary)]"}`}
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
                className='relative w-full bg-[var(--color-block)] rounded-sm border-[1.8px] border-[var(--color-border)] text-[var(--text-primary)] p-2 cursor-pointer hover:bg-[var(--filed-bg)]'
                />
            </>
        )}
    </div>
  )
}

export default ImageUploadField
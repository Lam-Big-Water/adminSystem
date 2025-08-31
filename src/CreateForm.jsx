import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreate } from "./query/cabins/useCreate";
import { useEdit } from "./query/cabins/useEdit";

import FormField from "./FormField";
import ImageUploadField from "./ImageUploadField";

const CreateForm = ({ cabinToEdit = {}, onCloseModal }) => {
  const { id: editId, image: currentImage, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { editData, isEditing } = useEdit();
  const { createNew, isCreating } = useCreate();
  const [previewImage, setPreviewImage] = useState(null);
  const isWorking = isEditing || isCreating;

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors } = formState;

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editData(
        { newData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.()
          },
        }
      );
    } else {
      createNew(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.()
          },
        }
      );
    }
  }

  return (
    <>
    
      <h2 id="modal-title" className="text-xl font-bold mb-4">
        {isEditSession ? "Edit Cabin" : "Add New Cabin"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4">
          <div className="grid gap-2 md:grid-cols-2 items-end">
            <FormField
              label="Name"
              id="name"
              register={register}
              errors={errors}
              validationRules={{ required: "This field is required!" }}
            />

            <FormField
              label="Maximum capacity"
              id="maxCapacity"
              type="number"
              register={register}
              errors={errors}
              validationRules={{
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1",
                },
              }}
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2 items-end">
            <FormField
              label="Regular price"
              id="regularPrice"
              type="number"
              register={register}
              errors={errors}
              validationRules={{
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Price should be at least 1",
                },
              }}
            />

            <FormField
              label="Discount"
              id="discount"
              type="number"
              defaultValue={0}
              register={register}
              errors={errors}
              validationRules={{
                required: "Discount cannot be negative",
              }}
            />
          </div>

          <FormField
            label="Description for website"
            id="description"
            type="textarea"
            register={register}
            errors={errors}
            validationRules={{
              required: "This field is required",
            }}
          />

          <ImageUploadField
            label="Upload photo"
            id="image"
            register={register}
            errors={errors}
            previewImage={previewImage}
            currentImage={currentImage}
            handleImageChange={handleImageChange}
            isEditSession={isEditSession}
            required={!isEditSession}
          />

          <div className="flex justify-between">
            <button
              onClick={() => onCloseModal?.()}
              type="reset"
              // disabled={isCreating}
              className="px-6 py-2 border-[1.4px] border-[var(--border)] focus:outline-2 focus:outline-blue-500 cursor-pointer hover:bg-gray-500/20 rounded-sm"
            >
              Cancel
            </button>
            <button
              disabled={isWorking}
              className={`bg-white text-black px-6 py-2 outline-0 focus:outline-2 focus:outline-blue-500 hover:bg-white/90 rounded-sm ${isWorking ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isEditSession ? "Edit" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateForm;

{
  /* <label
                htmlFor="regularPrice"
                className={`mb-2 block text-sm font-medium ${errors.regularPrice?.message ? 'text-red-400' : 'text-white'}`}
              >
                Regular price
                {errors.regularPrice?.message && <span className=" text-[0.75rem]">{` - ${errors.regularPrice?.message}`}</span>}

              </label>
              <input
                autoComplete="off"
                {...register("regularPrice", {
                  required: "This filed is required",
                  min: {
                    value: 1,
                    message: "Price should be at least 1",
                  },
                })}
                type="number"
                id="regularPrice"
                className="relative w-full rounded-sm border-[1.4px] border-[var(--border)] focus:outline-1 focus:outline-gray-300  p-2 text-white"
              /> */
}

{
  /* {isEditSession ? (
            <div>
              <div className="relative">
                <label
                  htmlFor="current photo"
                  className="mb-2 block text-sm font-medium"
                >
                  Current photo
                </label>
                <img className="w-full rounded-sm" src={previewImage || currentImage} alt="" />

                <div>
                <label
                  htmlFor="image"
                  className="p-2 text-black bg-white absolute top-2 right-1 block text-sm font-medium cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-sm"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      document.getElementById("image").click();
                    }
                  }}
                >
                  <span className="hidden sm:inline">Update photo</span>
                  <FiUpload className="sm:hidden w-4 h-4" />
                </label>

                <input
                  {...register("image", {
                    required: "This field is required",
                  })}
                  onChange={handleImageChange}
                  accept="image/*"
                  type="file"
                  id="image"
                  className="hiddenFileInput"
                />
              </div>
              </div>

            </div>
          ) : (
            <div>
              <label
                htmlFor="image"
                className={`mb-2 block text-sm font-medium ${errors.image?.message ? 'text-red-400' : 'text-white'}`}
                >
                Upload photo
                {errors.image?.message && <span className=" text-[0.75rem]">{` - ${errors.image?.message}`}</span>}

              </label>

              <input
                {...register("image", {
                  required: isEditSession ? false : "This field is required",
                })}
                accept="image/*"
                type="file"
                id="image"
                className="relative w-full border-[1.4px] border-[var(--border)] focus:outline-1 focus:outline-gray-300  p-2 text-white"
              />
            </div>
          )} */
}

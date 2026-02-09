import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreate } from "./query/cabins/useCreate";
import { useEdit } from "./query/cabins/useEdit";

import FormField from "./FormField";
import ImageUploadField from "./ImageUploadField";
// import Button from "./Button";

import FocusLock from "react-focus-lock";
import { Button } from "./components/ui/Button";

import { X } from "lucide-react";

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
    console.log(data.image);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editData(
        { newData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createNew(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <FocusLock>
      <div className=" overflow-y-auto max-h-150 fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg flex flex-col gap-4 text-slate-950 dark:text-slate-200
 bg-stone-50 dark:bg-stone-950 
 font-medium rounded-2xl shadow-lg max-sm:w-full">
        <div className="w-full sticky top-0 flex flex-col gap-2 text-start px-6 pt-6 bg-stone-50 dark:bg-stone-950 
">
          <h2 className="text-lg leading-none font-semibold">
            {isEditSession ? "Edit Cabin" : "Add New Cabin"}
          </h2>
          <p className="text-sm text-zinc-400">
            Create new user here. Click save when you're done.
          </p>
          <button
            onClick={() => onCloseModal?.()}
            className="flex items-center justify-center cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 p-1 rounded-md active:outline-2 active:outline-zinc-400"
          >
            <X size={16} />
          </button>
        </div>

        <form className="px-6 pb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2 items-end">
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

            <div className="grid gap-4 md:grid-cols-2 items-end">
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
                  min: {
                    value: 1,
                    message: "Price should be at least 1",
                  },
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

            <div className="flex justify-end gap-4">
               <Button
                size="md"
                variant="secondary"
                onClick={() => onCloseModal?.()}
                type="button"
              >
                Cancel
              </Button>

              <Button
                size="md"
                variant="primary"
                disabled={isWorking}
                
              >
                {isEditSession ? "Edit" : "Create"}
              </Button>

            </div>
          </div>
        </form>
      </div>
    </FocusLock>
  );
};

export default CreateForm;

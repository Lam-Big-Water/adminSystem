import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreate } from "./query/cabins/useCreate";
import { useEdit } from "./query/cabins/useEdit";

import FormField from "./FormField";
import ImageUploadField from "./ImageUploadField";
import Button from "./Button";

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
              size="small"
              onClick={() => onCloseModal?.()}
              type="reset"
              variation="secondary"

            >
              Cancel
            </Button>
            <Button
              size="small"
              disabled={isWorking}
            >
              {isEditSession ? "Edit" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateForm;

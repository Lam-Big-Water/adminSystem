import supabase, { supabaseUrl } from "./supabase";
import {PAGE_SIZE} from '../utils/constants';

export async function getAll() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getDataByPage ({page}) {
  let query = supabase
    .from("cabins")
    .select("*", {count: "exact"})

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const {data, error, count} = await query;


    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }

    return {data, count, error};
}

export async function getDataWithFilters ({filter, page}) {
  const safeFilter = filter?.value ? filter : { value: "all" };

  try {
    let query = supabase
      .from("cabins")
      .select("*", {count: "exact"})
      .order("created_at", {ascending: false});

      const filterMap = {
        "no-discount": (q) => q.eq("discount", 0),
        "with-discount": (q) => q.neq("discount", 0),
        "all": (q) => q,
      };

      query = filterMap[safeFilter.value]?.(query) || query;

      if (page && Number.isInteger(page)) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
      }

      const {data, error, count} = await query;

      if (error) throw error;

      return {data, count};

  } catch (error) {
    console.error("Database query failed", error);
    throw new Error("Failed to load cabin data. Please try again later.");
  }
}

export async function createCombineEdit(newData, id) {

  const hasImagePath = newData.image?.startsWith?.(supabaseUrl);

  // if the user update the image
  let oldImagePath = null;
  if (id && !hasImagePath) {
    const {data: existingData} = await supabase
      .from("cabins")
      .select("image")
      .eq("id", id)
      .single();

      if (existingData?.image) {
        oldImagePath = existingData.image;
      }
  }
  // 检查 newData.image 是否存在
  const imageName = newData.image
    ? `${Math.random()}-${newData.image.name}`.replaceAll("/", "")
    : null;

    console.log(imageName);

    const imagePath = hasImagePath
      ? newData.image
      : imageName
      ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
      : oldImagePath; // 如果用户没有更新图片，保留原来的图片路径
  


    let query = supabase.from("cabins");

    if (!id) query = query.insert([{...newData, image: imagePath}]);

    if (id) query = query.update({...newData, image: imagePath}).eq("id", id);

    const {data, error} = await query.select().single();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    if (hasImagePath) return data;

    if (imageName) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newData.image);
  
      if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
          "Cabin image could not be uploaded and the cabin was not created"
        );
      }
    }

    // https://uhovqnjvlmtxdpxmetpp.supabase.co/storage/v1/object/public/cabin-images/0.07829560803079239-shopping-cart-can-opener.jpg
    if (oldImagePath && !oldImagePath.includes("default")) {
      try {
        const oldImageName = oldImagePath.split("/cabin-images/")[1];
        await supabase.storage
          .from("cabin-images")
          .remove([oldImageName]);
      } catch (err) {
        console.error("Failed to delete old image:", err);
      }
    }
    return data;
}


/*

const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('some_column', 'someValue')

*/ 

// export async function removeRow (id, imagePath) {
//   console.log(imagePath)
// // https://uhovqnjvlmtxdpxmetpp.supabase.co/storage/v1/object/public/cabin-images/0.7842910674252873-shopping-cart-backpack.jpg
//   const {error: imgDeleteFail} = await supabase.storage
//   .from('cabin-images')
//   .remove([imagePath])

//   if (imgDeleteFail) {
//     console.error(imgDeleteFail)
//     throw new Error('Image delete fail')
//   }

//   const {data, error} = await supabase
//     .from('cabins')
//     .delete()
//     .eq('id', id)

//     if (error) {
//       console.error(error)
//       throw new Error('Delete fail')
//     }
//     // https://uhovqnjvlmtxdpxmetpp.supabase.co/storage/v1/object/public/cabin-images//0.09589026634917197-wallpaper.jpg


//     return data
// }

export async function removeRow (id, imagePath) {
  try {
    // 1. delete row from db
    const {error: dbError} = await supabase
      .from('cabins')
      .delete()
      .eq('id', id);

    if (dbError) throw new Error(dbError.message);

    // Delete the image only after successful database deletion.
    const {error: imgError} = await supabase.storage
      .from('cabin-images')
      .remove([imagePath]);

    if (imgError) {
      console.warn("Warning: The image could not be deleted (database record was removed)", imgError);
    }
  } catch (err) {
    console.error("Deletion failed");
    throw err;
  }
}

/*
export async function removeRow(id, imagePath) {
  try {
    // 1. 先删除数据库记录
    const { error: dbError } = await supabase
      .from('cabins')
      .delete()
      .eq('id', id);

    if (dbError) throw new Error(dbError.message);

    // 2. 只有数据库删除成功后才删除图片
    const { error: imgError } = await supabase.storage
      .from('cabin-images')
      .remove([imagePath]);

    if (imgError) {
      console.warn("图片删除失败，但数据库记录已删除", imgError);
      // 可在此处尝试重新插入数据库记录补偿
    }
  } catch (err) {
    console.error("删除失败:", err);
    throw err;
  }
}
*/

// export async function getFileMetadata (filePath) {
//   const {data, error} = await supabase.storage
//   .from('cabin-images')
//   .getPublicUrl(filePath)

//     if (error) {
//       console.error(`Error fetching metadata`, error)
//       return null
//     }

//     console.log('Upload time:', data.created_at)
//     return data.created_at
// }

export async function getFileMetadata(filePath) {
  console.log(filePath)
  const { data, error } = await supabase
    .storage
    .from('cabin-images')
    .list('', {
      search: filePath,
      limit: 1
    });
    
    console.log(data)

  if (error) {
    console.error('Error listing files:', error);
    return null;
  }

  if (data.length === 0) {
    console.error('File not found');
    return null;
  }

  console.log('Upload time:', data[0].created_at);
  return data[0].created_at;
}


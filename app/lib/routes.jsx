"use client";
import API from './api';


// get latest blog post
export async function getLatestBlogPost() {
    try {
        const res = await API.get('/blogs/latest');
        if (res?.status === 200 || res?.data?.sucess) {
            return res.data.data;
        }
        return res.data;
    } catch (err) {
        // console.error("Error fetching latest blog post:", err);
        return err.message;
    }
};

// get all blog post
export async function getAllBlogs( page, limit ) {
  try {
    const res = await API.get(`/blogs/?limit=${limit}&page=${page}`);
    if (res.status === 200 || res.data.success) {
      return res.data;
    }
    return res?.data || res
  } catch (err) {
    // console.error("Error fetching latest blog post:", err);
    return err.message;
  }
}

// get single blog post
export async function getSingleBlogPost(id) {
    try {
        const res = await API.get(`/blogs/${id}`);
        if (res.status === 200 || res.data.success) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest blog post:", err);
        return err.message;
    }
};


// get latest publication post
export async function getLatestPublication() {
    try {
        const res = await API.get('/publications/latest');
        if (res?.status === 200 || res?.data?.sucess) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest post:", err);
        return err.message;
    }
};

// get all publication post
export async function getAllPublication( page, limit ) {
  try {
    const res = await API.get(`/publications/?limit=${limit}&page=${page}`);
    if (res.status === 200 || res.data.success) {
        return res.data;
    }
    return res?.data || res
  } catch (err) {
    // console.error("Error fetching latest post:", err);
    return err.message;
  }
}


// get single publication
export async function getSinglePublicationPost(id) {
  try {
    const res = await API.get(`/publications/${id}`);
    if (res.status === 200 || res.data.success) {
        return res.data.data;
    }
    return res?.data || res;
  } catch (err) {
    // console.error("Error fetching latest post:", err);
    return err.message;
  }
};

// get latest multimedia post
export async function getLatestMultimedia() {
    try {
        const res = await API.get('/multimedias/latest');
        if (res?.status === 200 || res?.data?.sucess) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest post:", err);
        return err.message;
    }
};

// get all multimedia post
export async function getAllMultimedias( page, limit ) {
    try {
        const res = await API.get(`/multimedias/?limit=${limit}&page=${page}`);
        if (res.status === 200 || res.data.success) {
            return res.data;
        }
        return res?.data || res
    } catch (err) {
        // console.error("Error fetching latest post:", err);
        return err.message;
    }
}

// get single multimedia
export async function getSingleMultimediaPost(id) {
    try {
        const res = await API.get(`/multimedias/${id}`);
        if (res.status === 200 || res.data.success) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest multimedia post:", err);
        return err.message;
    }
};


// get latest training post
export async function getLatestTraining() {
    try {
        const res = await API.get('/trainings/latest');
        if (res?.status === 200 || res?.data?.sucess) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest training post:", err);
        return err.message;
    }
};

// get all training post
export async function getAllTrainings( page, limit ) {
    try {
        const res = await API.get(`/trainings/?limit=${limit}&page=${page}`);
        if (res.status === 200 || res.data.success) {
            return res.data;
        }
        return res?.data || res
    } catch (err) {
        // console.error("Error fetching latest training post:", err);
        return err.message;
    }
}

// get single training
export async function getSingleTrainingPost(id) {
    try {
        const res = await API.get(`/trainings/${id}`);
        if (res.status === 200 || res.data.success) {
            return res.data.data;
        }
        return res?.data || res;
    } catch (err) {
        // console.error("Error fetching latest training post:", err);
        return err.message;
    }
};


// === GET ALL ===
export async function getAllData(entity, page=1, limit=10 ) {
    try {
        const res = await API.get(`/${entity}/?limit=${limit}&page=${page}`);
            return res?.data || res;
    } catch (err) {
        // console.error(`Error fetching ${entity}:`, err);
        return err.message;
    }
}


// === GET LATEST ===
export async function getLatestData(entity ) {
    try {
        const res = await API.get(`/${entity}/latest`);
        return res?.data || res;
    } catch (err) {
        // console.error(`Error fetching latest ${entity}:`, err);
        return err.message;
    }
}



// === GET DATA BY ID ===
export async function getDataById(entity, id) {
    try {
        const res = await API.get(`/${entity}/${id}`);
        return res?.data || res;
    } catch (err) {
        // console.error(`Error fetching latest ${entity}:`, err);
        return err.message;
    }
}
  
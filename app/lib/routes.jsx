"use client";
import API from './api';


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
  
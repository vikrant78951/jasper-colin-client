"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/authSlice/authSlice";
import { API } from "@lib/data";
import { axiosInstance } from "@/lib/axiosInstance";

export function useSession() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {data} = await axiosInstance.get(API.session);
 
        if (data.success) {
          dispatch(setUser(data.user));
        }
      } catch (error) {
         console.log('error',(error as Error).message)
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { loading };
}

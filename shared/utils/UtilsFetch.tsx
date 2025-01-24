/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Fetch Utils
 * @author     Hersvin Fred De La Cruz Labastida
 */

import axios from "axios";

export const UtilsFetch = {
  connect: async (
    method: string,
    type: string,
    url: string,
    data?: FormData | unknown,
    cookie?: string
  ) => {
    return await axios({
      method: method,
      url: url,
      headers: {
        "Content-Type": type,
        Cookie: cookie ? cookie : undefined,
      },
      timeout: 10000,
      data: data ? data : undefined,
    });
  },
};

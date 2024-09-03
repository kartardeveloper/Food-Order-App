import { useEffect, useState } from "react";

function useFetch(url, requestMethod = "GET", defaultValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(defaultValue);
  const [requestError, setRequestError] = useState("");

  async function fetchData() {
    setIsFetching(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch.");
      }
      const responseData = await response.json();
      setFetchedData(responseData);
    } catch (error) {
      setRequestError(error);
    }
    setIsFetching(false);
  }

  async function setData(data) {
    try {
      const response = await fetch(url, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setFetchedData(responseData);
    } catch (error) {
      throw new Error("Something went wrong...");
    }
  }

  function clearData() {
    setFetchedData(undefined);
  }

  useEffect(() => {
    if (requestMethod === "GET") {
      fetchData();
    }
  }, []);

  return { isFetching, fetchedData, requestError, setData, clearData };
}

export default useFetch;

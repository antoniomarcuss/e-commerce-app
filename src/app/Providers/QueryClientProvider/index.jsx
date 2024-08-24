"use client";
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

const QueryClientProvider = ({ children }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
  );
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;

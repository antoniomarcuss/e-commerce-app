"use client";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const currentPage =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("page") || 1
      : 1;
  return (
    <Link href={`/?page=${currentPage}`}>
      <IoMdArrowBack className="text-2xl hover:text-blue-500 text-primary" />
    </Link>
  );
};

export default BackButton;

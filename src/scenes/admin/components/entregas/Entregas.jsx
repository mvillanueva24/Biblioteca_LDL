import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
//import { USERS } from "../data";
import { useState } from "react";
import DebouncedInput from "../DebouncedInput";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const domain_url = import.meta.env.VITE_DOMAIN_DB;

const Entregas = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Entregas;

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
import { Outlet } from "react-router-dom";

const Entregas = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Entregas;

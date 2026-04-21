import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { Link } from "wouter";
import socios from "../socios.json";

export default function Socios() {
  return (
    <div className="overflow-x-auto w-[90%] m-auto mt-2">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nombre</TableHeadCell>
            <TableHeadCell>Apellido</TableHeadCell>
            <TableHeadCell>Plan</TableHeadCell>
            <TableHeadCell>Detalle</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {socios.map((s) => (
            <TableRow
              key={s.id}
              className={`bg-white dark:border-gray-700 ${
                s.estado == "BAJ"
                  ? "dark:bg-gray-900 opacity-70"
                  : "dark:bg-gray-800"
              }`}
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {s.nombre}
              </TableCell>
              <TableCell>{s.apellido}</TableCell>
              <TableCell>{s.plan}</TableCell>
              <TableCell>
                <Link
                  href={`/socios/${s.id}`}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-center"
                >
                  <HiEye />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

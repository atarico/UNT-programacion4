import { useParams } from "wouter";
import socios from "../socios.json";
import Page404 from "./page404";

export default function SocioDetail() {
  const { id } = useParams();
  const socio = socios.find((s) => s.id == Number(id));
  if (socio == null) return <Page404 />;
  return <div>{socio.nombre}</div>;
}

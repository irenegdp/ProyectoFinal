import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "./Nav32-basic";
// import Resultsearch from "./Resultsearch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";

const Searchfor = () => {
  const [criteria, setCriteria] = React.useState({
    type_search: "",
    nom: "",
  });
  //   const [submit, setSubmit] = React.useState({submit:false})
  let [info, setInfo] = useState({ data: [], loading: true });
  const [message_info, setMessage] = useState({
    message_info: "",
  });


  const handle_change = (event) => {
    setCriteria({ ...criteria, [event.target.id]: event.target.value });
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    console.log("boton");
    // setSubmit({submit:true})
    console.log(criteria)
    try {
      let token = localStorage.getItem("token");

      let response = await axios.post(
        "http://localhost:5000/api/admin/searchfor",
        criteria,
        {
          headers: { token: token },
        }
      );
      let datas = response.data.info
      setInfo({ data: datas, loading: false });
      setMessage({ message_info: response.data.message });
      console.log("response", response.data.info)
      // console.log("info", info)
      console.log(datas)
    } catch (error) {
      window.localStorage.message = "Error del servidor";
    }

  };

  return (
    //   <h1>principal</h1>
    <div>
      {/* {console.log(submit, criteria)} */}
      <Nav />
      <Box
        component="main"
        sx={{
          py: 2,
          px: 2,

        }}
      >
        {/* <h1>Buscar trabajo por</h1> */}
        <form onSubmit={handle_submit} >
          <select id="type_search" onChange={handle_change}>
            <option selected="true" disabled="disabled">
              Seleccione criterio de busqueda
            </option>
            <option name="trabajador" value="trabajador">
              Trabajador
            </option>
            <option name="empresa" value="empresa">
              Empresa
            </option>
            <option value="finca">Finca</option>
            <option value="maquinaria">Maquinaria</option>
            <option value="deposito">Depósito</option>
            <option value="tarea">Tarea</option>
            <option value="producto">Producto</option>
            <option value="campaña">Campaña</option>
          </select>
          <Box sx={{ py: 1 }} />
          <input id="nom" onChange={handle_change}></input>
          <Box sx={{ py: 1 }} />
          <button>Buscar</button>
        </form>
        {/* <h1>Tabla</h1> */}
        {/* {submit.submit === false ? (
        <p>hola</p>
      ) : (
        <Resultsearch info_search={criteria} />
      )} */}
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">De</TableCell>
              <TableCell align="center">A</TableCell>
              <TableCell align="center">Horas</TableCell>
              <TableCell align="center">Trabajador</TableCell>
              <TableCell align="center">Empresa</TableCell>
              <TableCell align="center">Finca</TableCell>
              <TableCell align="center">Tarea</TableCell>
              {/* <TableCell align="center">Subtarea</TableCell> */}
              <TableCell align="center">Maquinaria</TableCell>
              <TableCell align="center">Deposito</TableCell>
              <TableCell align="center">Litros</TableCell>
              <TableCell align="center">Productos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {info.data.map((work) => {
              console.log(work)
              let dateINI = new Date(work.dateINI);
              let fecha = new Intl.DateTimeFormat("es", {
                day: "2-digit",
                year: "numeric",
                month: "2-digit",
              }).format(dateINI);
              let horaINI = new Intl.DateTimeFormat("es", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(dateINI);
              let dateFIN = new Date(work.dateFIN);
              let horaFIN = new Intl.DateTimeFormat("es", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(dateFIN);
              let horas = (Math.abs(dateFIN - dateINI) / 3600000).toFixed(
                2
              );
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{fecha}</TableCell>
                  <TableCell align="right">{horaINI}</TableCell>
                  <TableCell align="right">{horaFIN}</TableCell>
                  <TableCell align="right">{horas}</TableCell>
                  <TableCell align="right">
                    {work.worker.nameUser}
                  </TableCell>
                  <TableCell align="right">
                    {work.company.map((empresa) => {

                      return (
                        <TableRow align="right">
                          {empresa.nameCompany}
                        </TableRow>
                      );
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {work.farm.map((finca) => {

                      return (
                        <TableRow align="right">{finca.nameFarm}</TableRow>
                      );
                    })}
                  </TableCell>
                  <TableCell align="right">{work.task.nameTask}</TableCell>
                  <TableCell align="right">
                    {work.machinery.map((machine) => (
                      <TableRow align="right">
                        {machine.nameMachinery}
                      </TableRow>
                    ))}
                  </TableCell>
                  <TableCell align="right">{work.tank.nameTank}</TableCell>
                  <TableCell align="right">{work.litres_tank}</TableCell>
                  <TableCell align="right">
                    {work.products.map((producto) => {

                      return (
                        <TableRow align="right">
                          <TableCell align="right">
                            {producto.name_pr}
                          </TableCell>
                          <TableCell align="right">
                            {producto.litres}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default Searchfor;

const HistorialPagos = () => {
  return (
    // <div className="p-6">
    //   <div className="flex justify-between mb-4">
    //     <h1 className="text-2xl font-bold">Historial de Pagos</h1>
    //     <div className="flex items-center gap-4">
    //       <div className="flex flex-col">
    //         <label className="font-bold">Filtrar por Estado</label>
    //         <select
    //           onChange={(e) => setStatusFilter(e.target.value)}
    //           className="border rounded p-2"
    //         >
    //           <option value="">Todos</option>
    //           <option value="pendiente">Pendiente</option>
    //           <option value="aprobado">Aprobado</option>
    //           <option value="rechazado">Rechazado</option>
    //         </select>
    //       </div>
    //       <div className="flex flex-col">
    //         <label className="font-bold">Filtrar por Tipo</label>
    //         <select onChange={(e) => setTipoFilter(e.target.value)} className="border rounded p-2">
    //           <option value="">Todos</option>
    //           <option value="retiro">Retiro</option>
    //           <option value="deposito">Depósito</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="overflow-x-auto">
    //     <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="border p-3">ID</th>
    //           <th className="border p-3">Usuario ID</th>
    //           <th className="border p-3">Nombre</th>
    //           <th className="border p-3">Apellido</th>
    //           <th className="border p-3">DNI</th>
    //           <th className="border p-3">Monto</th>
    //           <th className="border p-3">Fecha</th>
    //           <th className="border p-3">Estado</th>
    //           <th className="border p-3">Tipo</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {pagosFiltrados.length > 0 ? (
    //           pagosFiltrados.map((pago) => (
    //             <tr key={pago.id} className="hover:bg-gray-50">
    //               <td className="border p-3 text-center">{pago.id}</td>
    //               <td className="border p-3 text-center">{pago.userId}</td>
    //               <td className="border p-3">{pago.name}</td>
    //               <td className="border p-3">{pago.lastName}</td>
    //               <td className="border p-3 text-center">{pago.dni}</td>
    //               <td className="border p-3 text-right">${pago.monto}</td>
    //               <td className="border p-3 text-center">{pago.fecha}</td>
    //               <td
    //                 className={`border p-3 text-center font-semibold ${
    //                   pago.status === 'aprobado'
    //                     ? 'text-green-600'
    //                     : pago.status === 'pendiente'
    //                     ? 'text-yellow-600'
    //                     : 'text-red-600'
    //                 }`}
    //               >
    //                 {pago.status}
    //               </td>
    //               <td className="border p-3 text-center capitalize">{pago.tipo}</td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan={9} className="border p-3 text-center">
    //               No hay pagos registrados
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div>Proximamente</div>
  );
};

export default HistorialPagos;

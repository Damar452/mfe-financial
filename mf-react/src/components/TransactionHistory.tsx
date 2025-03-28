import React, { useState } from "react";
import { Table, Select, Card, Modal, Button } from "antd";

const { Option } = Select;

const transactions = [
  {
    key: "1",
    account: "Cuenta A",
    amount: "$500",
    date: "2025-03-28 10:00 AM",
    type: "Ingreso",
    details: "Pago recibido de Cliente X",
  },
  {
    key: "2",
    account: "Cuenta B",
    amount: "$200",
    date: "2025-03-27 03:30 PM",
    type: "Gasto",
    details: "Pago de servicio de hosting",
  },
];

export default function TransactionHistory() {
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

  const handleTypeFilter = (value: string) => {
    setFilteredType(value);
  };

  const filteredTransactions = transactions.filter(
    (t) => !filteredType || t.type === filteredType
  );

  const columns = [
    { title: "Cuenta", dataIndex: "account", key: "account" },
    { title: "Monto", dataIndex: "amount", key: "amount" },
    { title: "Fecha y Hora", dataIndex: "date", key: "date" },
    { title: "Tipo", dataIndex: "type", key: "type" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        <Button onClick={() => setSelectedTransaction(record)}>Ver Detalles</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Historial de Transacciones</h2>
      <Select
        placeholder="Filtrar por tipo"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleTypeFilter}
        allowClear
      >
        <Option value="Ingreso">Ingreso</Option>
        <Option value="Gasto">Gasto</Option>
      </Select>
      <Table columns={columns} dataSource={filteredTransactions} />

      <Modal
        title="Detalles de la Transacción"
        open={!!selectedTransaction}
        onCancel={() => setSelectedTransaction(null)}
        footer={null}
      >
        {selectedTransaction && (
          <Card>
            <p><strong>Cuenta:</strong> {selectedTransaction.account}</p>
            <p><strong>Monto:</strong> {selectedTransaction.amount}</p>
            <p><strong>Fecha y Hora:</strong> {selectedTransaction.date}</p>
            <p><strong>Tipo:</strong> {selectedTransaction.type}</p>
            <p><strong>Detalles:</strong> {selectedTransaction.details}</p>
          </Card>
        )}
      </Modal>
    </div>
  );
}
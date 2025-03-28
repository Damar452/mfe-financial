import React, { useEffect, useState } from "react";
import { Table, Select, Card, Modal, Button, Spin } from "antd";
import { fetchTransaction } from "../core/services/bussiness/transactionService";

const { Option } = Select;

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

  useEffect(() => {
    async function loadTransaction() {
      setLoading(true);
      const transaction = await fetchTransaction(1); // Se obtiene la transacción con ID 1
      console.log(transaction);
      if (transaction) {
        setTransactions([transaction]); // Lo guardamos en un array
      }
      setLoading(false);
    }

    loadTransaction();
  }, []);

  const handleTypeFilter = (value: string) => {
    setFilteredType(value);
  };

  const filteredTransactions = transactions.filter(
    (t) => !filteredType || t.type === filteredType
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Cuenta Origen", dataIndex: "sourceAccountId", key: "sourceAccountId" },
    { title: "Cuenta Destino", dataIndex: "destinationAccountId", key: "destinationAccountId" },
    { title: "Monto", dataIndex: "amount", key: "amount" },
    { title: "Fecha y Hora", dataIndex: "timestamp", key: "timestamp" },
    { title: "Tipo", dataIndex: "type", key: "type" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => setSelectedTransaction(record)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Historial de Transacciones</h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Select
            placeholder="Filtrar por tipo"
            style={{ width: 200, marginBottom: 16 }}
            onChange={handleTypeFilter}
            allowClear
          >
            <Option value="TRANSFER">Transferencia</Option>
          </Select>

          <Table columns={columns} dataSource={filteredTransactions} rowKey="id" />
        </>
      )}

      <Modal
        title="Detalles de la Transacción"
        open={!!selectedTransaction}
        onCancel={() => setSelectedTransaction(null)}
        footer={null}
      >
        {selectedTransaction && (
          <Card>
            <p><strong>ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Cuenta Origen:</strong> {selectedTransaction.sourceAccountId}</p>
            <p><strong>Cuenta Destino:</strong> {selectedTransaction.destinationAccountId}</p>
            <p><strong>Monto:</strong> ${selectedTransaction.amount}</p>
            <p><strong>Fecha y Hora:</strong> {selectedTransaction.timestamp}</p>
            <p><strong>Tipo:</strong> {selectedTransaction.type}</p>
            <p><strong>Descripción:</strong> {selectedTransaction.description}</p>
          </Card>
        )}
      </Modal>
    </div>
  );
}

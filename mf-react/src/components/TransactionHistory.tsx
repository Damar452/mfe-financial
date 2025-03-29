import React, { useEffect, useState } from "react";
import { Table, Select, Card, Modal, Button, Spin, Form } from "antd";
import { fetchTransaction } from "../core/services/bussiness/transactionService";
import TransferForm from "./TransferForm";

const { Option } = Select;

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isTransferModalOpen, setTransferModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("USER_DATA")!);
    if (!userData) {
      console.error("No hay usuario autenticado");
      setLoading(false);
      return;
    }

    setUser(userData);
    loadTransactions(userData.id);
  }, []);

  async function loadTransactions(userId: number) {
    setLoading(true);
    const transaction = await fetchTransaction(userId);

    if (transaction) {
      const transactionArray = Array.isArray(transaction) ? transaction : [transaction];

      const labeledTransactions = transactionArray.map((t: any) => ({
        ...t,
        category: t.destinationAccountId === userId ? "Ingreso" : "Gasto",
      }));

      setTransactions(labeledTransactions);
    }
    setLoading(false);
  }

  const handleTypeFilter = (value: string) => {
    setFilteredType(value);
  };

  const filteredTransactions = transactions.filter(
    (t) => !filteredType || t.category === filteredType
  );

  const openDetailModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDetailModalOpen(true);
  };

  const columns = [
    { title: "Cuenta Origen", dataIndex: "sourceAccountId", key: "sourceAccountId" },
    { title: "Cuenta Destino", dataIndex: "destinationAccountId", key: "destinationAccountId" },
    { title: "Monto", dataIndex: "amount", key: "amount" },
    { title: "Fecha y Hora", dataIndex: "timestamp", key: "timestamp" },
    { title: "Tipo", dataIndex: "category", key: "category" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        <Button type="default" onClick={() => openDetailModal(record)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Select
              placeholder="Filtrar por tipo"
              style={{ width: 200, marginBottom: 16 }}
              onChange={handleTypeFilter}
              allowClear
            >
              <Option value="Ingreso">Ingreso</Option>
              <Option value="Gasto">Gasto</Option>
            </Select>
            <Button type="primary" onClick={() => setTransferModalOpen(true)} style={{ marginBottom: 16 }}>
            Nueva Transferencia
          </Button>
          </div>
          <Table columns={columns} dataSource={filteredTransactions} rowKey="id" />
        </>
      )}

      <Modal
        title="Nueva Transferencia"
        open={isTransferModalOpen}
        onCancel={() => {
          form.resetFields();
          setTransferModalOpen(false);
        }}
        footer={null}
      >
        <TransferForm
          form={form}
          onSuccess={() => {
            form.resetFields();
            setTransferModalOpen(false);
            loadTransactions(user?.id);
          }}
        />
      </Modal>

      <Modal
        title="Detalles de la Transferencia"
        open={isDetailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
      >
        {selectedTransaction && (
          <Card>
            <p><strong>ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Cuenta Origen:</strong> {selectedTransaction.sourceAccountId}</p>
            <p><strong>Cuenta Destino:</strong> {selectedTransaction.destinationAccountId}</p>
            <p><strong>Monto:</strong> {selectedTransaction.amount}</p>
            <p><strong>Fecha y Hora:</strong> {selectedTransaction.timestamp}</p>
            <p><strong>Tipo:</strong> {selectedTransaction.category}</p>
          </Card>
        )}
      </Modal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, message } from "antd";
import { getAccountByUser, getAccountByNumber, updateAccountById } from "../core/services/bussiness/accountService";
import { createTransaction } from "../core/services/bussiness/transactionService";

const { Option } = Select;

export default function TransferForm({
    form,
    onSuccess,
}: { 
    form: any;
    onSuccess: () => void;
}) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
  const [sourceBalance, setSourceBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAccounts() {
      const userData = JSON.parse(window.localStorage.getItem("USER_DATA")!);
      if (!userData) return;

      const userAccounts = await getAccountByUser(userData.id);
      setAccounts(userAccounts || []);
    }

    fetchAccounts();
  }, []);

  const validateDestinationAccount = async (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const destinationAccount = await getAccountByNumber(value);
    if (!destinationAccount || destinationAccount.length === 0) {
      return Promise.reject("La cuenta destino no existe");
    }

    const destinationId = destinationAccount[0].id;
    if (destinationId === selectedSourceId) {
      return Promise.reject("No puedes transferir a la misma cuenta");
    }

    return Promise.resolve();
  };

  const validateAmount = (_: any, value: number) => {
    if (value === undefined || value <= 0) {
      return Promise.reject("Ingrese un monto válido");
    }
    if (sourceBalance !== null && value > sourceBalance) {
      return Promise.reject("El monto excede el saldo disponible");
    }
    return Promise.resolve();
  };

  const handleSourceAccountChange = (value: number) => {
    setSelectedSourceId(value);
    const selectedAccount = accounts.find((acc) => acc.id === value);
    setSourceBalance(selectedAccount?.balance || 0);
  };

  const handleSubmit = async (values: any) => {
    const userData = JSON.parse(window.localStorage.getItem("USER_DATA")!);
    if (!userData) return;
  
    const destinationAccount = await getAccountByNumber(values.destinationAccountId);
    if (!destinationAccount || destinationAccount.length === 0) {
      message.error("La cuenta destino no existe");
      return;
    }
  
    const transactionPayload = {
      ...values,
      userId: userData.id,
      destinationAccountId: destinationAccount[0].id,
      type: "TRANSFER",
      timestamp: new Date().toISOString(),
    };
  
    try {
      setLoading(true);
      await createTransaction(transactionPayload);
      
      const newBalance = sourceBalance! - values.amount;
      await updateAccountById(values.sourceAccountId, { balance: newBalance });
  
      message.success("Transferencia creada exitosamente");
      onSuccess();
      form.resetFields();
      setSourceBalance(newBalance);
    } catch (error) {
      message.error("Error al procesar la transferencia");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">

      <Form.Item
        name="sourceAccountId"
        label="Cuenta Origen"
        rules={[{ required: true, message: "Seleccione una cuenta de origen" }]}
      >
        <Select placeholder="Seleccione una cuenta" onChange={handleSourceAccountChange}>
          {accounts.map((acc) => (
            <Option key={acc.id} value={acc.id}>
              {acc.accountNumber}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="destinationAccountId"
        label="Cuenta Destino"
        rules={[
          { required: true, message: "Ingrese la cuenta destino" },
          { validator: validateDestinationAccount },
        ]}
      >
        <Input placeholder="Ingrese el número de cuenta destino" />
      </Form.Item>

      <Form.Item
        name="amount"
        label="Monto"
        rules={[
          { required: true, message: "Ingrese un monto" },
          { validator: validateAmount },
        ]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Concepto"
        rules={[{ required: true, message: "Ingrese un concepto" }]}
      >
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Confirmar Transferencia
        </Button>
      </Form.Item>
    </Form>
  );
}
